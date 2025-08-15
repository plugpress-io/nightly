<?php

/**
 * REST API Endpoints Class
 *
 * Simplified and clean API implementation following "code is poetry" principles.
 * Handles settings management with clear, focused methods.
 *
 * @package Nightly
 */

namespace Nightly;

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Handles REST API endpoints for settings management
 * 
 * This class provides a clean, simple interface for managing plugin settings
 * through WordPress REST API. Each method has a single responsibility.
 */
class API
{

    /**
     * API namespace
     *
     * @var string
     */
    private $namespace = 'nightly/v1';

    /**
     * Settings option name
     *
     * @var string
     */
    private $option_name = 'nightly_settings';

    /**
     * Initialize API functionality
     * 
     * Simple initialization - just register routes when REST API is ready.
     */
    public function init()
    {
        add_action('rest_api_init', array($this, 'register_routes'));
    }

    /**
     * Register REST API routes
     * 
     * Simple route registration - just GET and POST.
     */
    public function register_routes()
    {
        // Main settings endpoint - handles both GET and POST
        register_rest_route($this->namespace, '/settings', array(
            array(
                'methods' => \WP_REST_Server::READABLE,
                'callback' => array($this, 'get_settings'),
                'permission_callback' => array($this, 'can_manage_settings'),
            ),
            array(
                'methods' => \WP_REST_Server::EDITABLE,
                'callback' => array($this, 'update_settings'),
                'permission_callback' => array($this, 'can_manage_settings'),
            ),
        ));
    }

    /**
     * Check if current user can manage plugin settings
     * 
     * Simple permission check.
     */
    public function can_manage_settings($request)
    {
        return current_user_can('manage_options');
    }

    /**
     * Get plugin settings
     */
    public function get_settings($request)
    {
        $defaults = $this->get_default_settings();
        $saved = get_option($this->option_name, array());
        $settings = array_merge($defaults, $saved);

        return array('settings' => $settings);
    }

    /**
     * Update plugin settings
     */
    public function update_settings($request)
    {
        $new_settings = $request->get_json_params();

        // Simple validation
        $validated = $this->validate_settings($new_settings);

        // Merge with current settings
        $current = get_option($this->option_name, $this->get_default_settings());
        $updated = array_merge($current, $validated);

        // Save the settings
        update_option($this->option_name, $updated);

        return array('settings' => $updated);
    }

    /**
     * Get default settings
     *
     * @return array Default settings array.
     */
    private function get_default_settings()
    {
        return array(
            // General settings
            'auto_inject' => false,
            'floating_position' => 'bottom-right',
            'floating_bg_color' => '#333333',
            'respect_system_preference' => true,
            'mode' => 'manual',
            'transition_duration' => 200,
            'ignore_selectors' => '',

            // Auto mode settings (formerly reader mode)
            'auto_intensity' => 0.05,
            'auto_contrast' => 1.15,
            'auto_brightness' => 0.98,
            'auto_sepia' => 0.15,

            // Legacy filter settings (no longer used for dark mode)
            'intensity' => 0.88,
            'contrast' => 1.05,
            'brightness' => 0.85,
            'sepia' => 0.05,
        );
    }

    /**
     * Simple validation
     */
    private function validate_settings($settings)
    {
        $validated = array();

        // Validate general settings
        if (isset($settings['auto_inject'])) {
            $validated['auto_inject'] = (bool) $settings['auto_inject'];
        }

        if (isset($settings['floating_position'])) {
            $valid_positions = array('bottom-right', 'bottom-left', 'top-right', 'top-left');
            $validated['floating_position'] = in_array($settings['floating_position'], $valid_positions)
                ? $settings['floating_position'] : 'bottom-right';
        }

        if (isset($settings['floating_bg_color'])) {
            // Simple hex color validation
            $color = sanitize_text_field($settings['floating_bg_color']);
            $validated['floating_bg_color'] = preg_match('/^#[a-fA-F0-9]{6}$/', $color)
                ? $color : '#333333';
        }

        if (isset($settings['respect_system_preference'])) {
            $validated['respect_system_preference'] = (bool) $settings['respect_system_preference'];
        }

        if (isset($settings['mode'])) {
            $valid_modes = array('auto', 'manual');
            $validated['mode'] = in_array($settings['mode'], $valid_modes)
                ? $settings['mode'] : 'manual';
        }

        if (isset($settings['transition_duration'])) {
            $validated['transition_duration'] = max(0, min(2000, intval($settings['transition_duration'])));
        }

        if (isset($settings['ignore_selectors'])) {
            $validated['ignore_selectors'] = sanitize_textarea_field($settings['ignore_selectors']);
        }

        // Auto mode settings (formerly reader mode)
        if (isset($settings['auto_intensity'])) {
            $validated['auto_intensity'] = max(0, min(0.5, floatval($settings['auto_intensity'])));
        }

        if (isset($settings['auto_contrast'])) {
            $validated['auto_contrast'] = max(1.0, min(2.0, floatval($settings['auto_contrast'])));
        }

        if (isset($settings['auto_brightness'])) {
            $validated['auto_brightness'] = max(0.8, min(1.2, floatval($settings['auto_brightness'])));
        }

        if (isset($settings['auto_sepia'])) {
            $validated['auto_sepia'] = max(0, min(0.5, floatval($settings['auto_sepia'])));
        }

        // Legacy filter settings (kept for backward compatibility)
        if (isset($settings['intensity'])) {
            $validated['intensity'] = max(0, min(1, floatval($settings['intensity'])));
        }

        if (isset($settings['contrast'])) {
            $validated['contrast'] = max(0.5, min(2, floatval($settings['contrast'])));
        }

        if (isset($settings['brightness'])) {
            $validated['brightness'] = max(0.3, min(1.5, floatval($settings['brightness'])));
        }

        if (isset($settings['sepia'])) {
            $validated['sepia'] = max(0, min(1, floatval($settings['sepia'])));
        }

        return $validated;
    }
}
