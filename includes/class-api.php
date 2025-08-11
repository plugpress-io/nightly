<?php
/**
 * REST API Endpoints Class
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
 */
class API {
    
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
     */
    public function init() {
        add_action('rest_api_init', array($this, 'register_routes'));
    }
    
    /**
     * Register REST API routes
     */
    public function register_routes() {
        // Settings endpoint
        register_rest_route($this->namespace, '/settings', array(
            array(
                'methods' => \WP_REST_Server::READABLE,
                'callback' => array($this, 'get_settings'),
                'permission_callback' => array($this, 'check_permissions'),
                'args' => array(),
            ),
            array(
                'methods' => \WP_REST_Server::EDITABLE,
                'callback' => array($this, 'update_settings'),
                'permission_callback' => array($this, 'check_permissions'),
                'args' => $this->get_settings_schema(),
            ),
        ));
        
        // Settings schema endpoint
        register_rest_route($this->namespace, '/settings/schema', array(
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_settings_schema'),
            'permission_callback' => array($this, 'check_permissions'),
        ));
    }
    
    /**
     * Check permissions for API access
     *
     * @param \WP_REST_Request $request Request object.
     * @return bool|WP_Error True if user has permission, WP_Error otherwise.
     */
    public function check_permissions($request) {
        // Check if user is logged in
        if (!is_user_logged_in()) {
            return new \WP_Error(
                'rest_not_logged_in',
                __('You are not currently logged in.', 'nightly'),
                array('status' => 401)
            );
        }
        
        // Check if user can manage options (admin capability)
        if (!current_user_can('manage_options')) {
            return new \WP_Error(
                'rest_forbidden',
                __('Sorry, you are not allowed to manage plugin settings.', 'nightly'),
                array('status' => 403)
            );
        }
        
        // Verify nonce for additional security
        $nonce = $request->get_header('X-WP-Nonce');
        if (!wp_verify_nonce($nonce, 'wp_rest')) {
            return new \WP_Error(
                'rest_cookie_invalid_nonce',
                __('Cookie nonce is invalid.', 'nightly'),
                array('status' => 403)
            );
        }
        
        return true;
    }
    
    /**
     * Get plugin settings
     *
     * @param \WP_REST_Request $request Request object.
     * @return \WP_REST_Response|WP_Error Response object or WP_Error on failure.
     */
    public function get_settings($request) {
        try {
            $settings = $this->get_default_settings();
            $saved_settings = get_option($this->option_name, array());
            
            // Merge with saved settings
            $settings = array_merge($settings, $saved_settings);
            
            // Add additional context
            $response_data = array(
                'settings' => $settings,
                'is_block_theme' => wp_is_block_theme(),
                'plugin_version' => NIGHTLY_VERSION,
            );
            
            return new \WP_REST_Response($response_data, 200);
            
        } catch (Exception $e) {
            return new \WP_Error(
                'settings_retrieval_failed',
                __('Failed to retrieve settings.', 'nightly'),
                array('status' => 500)
            );
        }
    }
    
    /**
     * Update plugin settings
     *
     * @param \WP_REST_Request $request Request object.
     * @return \WP_REST_Response|WP_Error Response object or WP_Error on failure.
     */
    public function update_settings($request) {
        try {
            $new_settings = $request->get_json_params();
            
            // Validate and sanitize settings
            $validated_settings = $this->validate_settings($new_settings);
            
            if (is_wp_error($validated_settings)) {
                return $validated_settings;
            }
            
            // Get current settings
            $current_settings = get_option($this->option_name, $this->get_default_settings());
            
            // Merge with new settings
            $updated_settings = array_merge($current_settings, $validated_settings);
            
            // Update the option
            $update_result = update_option($this->option_name, $updated_settings);
            
            if ($update_result === false) {
                return new \WP_Error(
                    'settings_update_failed',
                    __('Failed to update settings.', 'nightly'),
                    array('status' => 500)
                );
            }
            
            // Return updated settings
            $response_data = array(
                'settings' => $updated_settings,
                'message' => __('Settings updated successfully.', 'nightly'),
                'updated_at' => current_time('mysql'),
            );
            
            return new \WP_REST_Response($response_data, 200);
            
        } catch (Exception $e) {
            return new \WP_Error(
                'settings_update_error',
                __('An error occurred while updating settings.', 'nightly'),
                array('status' => 500)
            );
        }
    }
    
    /**
     * Get default settings
     *
     * @return array Default settings array.
     */
    private function get_default_settings() {
        return array(
            'auto_inject' => false,
            'floating_position' => 'bottom-right',
            'respect_system_preference' => true,
            'transition_duration' => 200,
        );
    }
    
    /**
     * Validate and sanitize settings
     *
     * @param array $settings Settings to validate.
     * @return array|WP_Error Validated settings or WP_Error on failure.
     */
    private function validate_settings($settings) {
        if (!is_array($settings)) {
            return new \WP_Error(
                'invalid_settings_format',
                __('Settings must be provided as an object.', 'nightly'),
                array('status' => 400)
            );
        }
        
        $validated = array();
        $errors = array();
        
        // Validate auto_inject
        if (isset($settings['auto_inject'])) {
            if (!is_bool($settings['auto_inject'])) {
                $errors[] = __('auto_inject must be a boolean value.', 'nightly');
            } else {
                $validated['auto_inject'] = $settings['auto_inject'];
            }
        }
        
        // Validate floating_position
        if (isset($settings['floating_position'])) {
            $valid_positions = array('bottom-right', 'bottom-left', 'top-right', 'top-left');
            if (!in_array($settings['floating_position'], $valid_positions, true)) {
                $errors[] = sprintf(
                    __('floating_position must be one of: %s', 'nightly'),
                    implode(', ', $valid_positions)
                );
            } else {
                $validated['floating_position'] = sanitize_text_field($settings['floating_position']);
            }
        }
        
        // Validate respect_system_preference
        if (isset($settings['respect_system_preference'])) {
            if (!is_bool($settings['respect_system_preference'])) {
                $errors[] = __('respect_system_preference must be a boolean value.', 'nightly');
            } else {
                $validated['respect_system_preference'] = $settings['respect_system_preference'];
            }
        }
        
        // Validate transition_duration
        if (isset($settings['transition_duration'])) {
            $duration = intval($settings['transition_duration']);
            if ($duration < 0 || $duration > 2000) {
                $errors[] = __('transition_duration must be between 0 and 2000 milliseconds.', 'nightly');
            } else {
                $validated['transition_duration'] = $duration;
            }
        }
        
        // Return errors if any
        if (!empty($errors)) {
            return new \WP_Error(
                'validation_failed',
                __('Settings validation failed.', 'nightly'),
                array(
                    'status' => 400,
                    'errors' => $errors,
                )
            );
        }
        
        return $validated;
    }
    
    /**
     * Get settings schema for validation
     *
     * @return array Settings schema.
     */
    public function get_settings_schema() {
        return array(
            'auto_inject' => array(
                'description' => __('Enable automatic injection of floating toggle for classic themes.', 'nightly'),
                'type' => 'boolean',
                'default' => false,
                'sanitize_callback' => 'rest_sanitize_boolean',
                'validate_callback' => 'rest_validate_request_arg',
            ),
            'floating_position' => array(
                'description' => __('Position of the floating toggle button.', 'nightly'),
                'type' => 'string',
                'default' => 'bottom-right',
                'enum' => array('bottom-right', 'bottom-left', 'top-right', 'top-left'),
                'sanitize_callback' => 'sanitize_text_field',
                'validate_callback' => function($param, $request, $key) {
                    $valid_positions = array('bottom-right', 'bottom-left', 'top-right', 'top-left');
                    return in_array($param, $valid_positions, true);
                },
            ),
            'respect_system_preference' => array(
                'description' => __('Respect user\'s system color scheme preference.', 'nightly'),
                'type' => 'boolean',
                'default' => true,
                'sanitize_callback' => 'rest_sanitize_boolean',
                'validate_callback' => 'rest_validate_request_arg',
            ),
            'transition_duration' => array(
                'description' => __('Duration of theme transition animation in milliseconds.', 'nightly'),
                'type' => 'integer',
                'default' => 200,
                'minimum' => 0,
                'maximum' => 2000,
                'sanitize_callback' => 'absint',
                'validate_callback' => function($param, $request, $key) {
                    return is_numeric($param) && $param >= 0 && $param <= 2000;
                },
            ),
        );
    }
}