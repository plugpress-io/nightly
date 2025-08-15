<?php

/**
 * Main Nightly Plugin Class
 *
 * This is the core orchestrator class that initializes and manages all plugin components.
 * It follows the single responsibility principle by delegating specific functionality
 * to specialized classes (Block, Admin, API) while handling the overall plugin lifecycle.
 *
 * The class is designed to be lightweight and efficient, only loading components when
 * needed and optimizing asset loading based on context.
 *
 * @package Nightly
 * @since 1.0.0
 */

namespace Nightly;

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Main plugin class that orchestrates all plugin functionality
 * 
 * This class serves as the central hub for the plugin, managing:
 * - Component initialization (Block, Admin, API)
 * - Asset loading and optimization
 * - WordPress integration hooks
 * - Theme support and compatibility
 * 
 * Design principles:
 * - Single responsibility: Each method has one clear purpose
 * - Performance first: Assets load only when needed
 * - Clean code: Easy to read and maintain
 * - Extensible: Easy to add new features
 */
class Nightly
{

    /**
     * Plugin version
     *
     * @var string
     */
    private $version;

    /**
     * Block instance
     *
     * @var Block
     */
    private $block;

    /**
     * Admin instance
     *
     * @var Admin
     */
    private $admin;

    /**
     * API instance
     *
     * @var API
     */
    private $api;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->version = NIGHTLY_VERSION;
    }

    /**
     * Initialize the plugin
     */
    public function init()
    {
        // Initialize components
        $this->init_components();

        // Setup hooks
        $this->setup_hooks();

        // Add theme support if needed
        $this->add_theme_support();
    }

    /**
     * Initialize plugin components
     * 
     * Initializes components for both theme types:
     * - Block: Always initialized (works for both classic and FSE themes)
     * - Admin: Always initialized (FSE themes can use it for global floating toggle)
     * - API: Always initialized (needed for block and admin)
     */
    private function init_components()
    {
        // Initialize block functionality (always needed)
        $this->block = new Block();
        $this->block->init();

        // Initialize admin interface for both theme types
        // Classic themes: Full settings interface
        // FSE themes: Global floating toggle configuration
        if (is_admin()) {
            $this->admin = new Admin();
            $this->admin->init();
        }

        // Initialize API (needed for both block and admin functionality)
        $this->api = new API();
        $this->api->init();
    }

    /**
     * Setup WordPress hooks
     */
    private function setup_hooks()
    {
        // Enqueue frontend assets
        add_action('wp_enqueue_scripts', array($this, 'enqueue_frontend_assets'));

        // Enqueue admin assets
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_assets'));

        // Add body class for theme detection
        add_filter('body_class', array($this, 'add_body_class'));

        // Add HTML attributes
        add_action('wp_head', array($this, 'add_html_attributes'), 1);

        // Add floating toggle to footer if needed
        add_action('wp_footer', array($this, 'maybe_add_floating_toggle'));
    }

    /**
     * Add necessary theme support
     */
    private function add_theme_support()
    {
        // Add support for custom CSS properties
        add_theme_support('custom-properties');

        // Add support for responsive embeds
        add_theme_support('responsive-embeds');
    }

    /**
     * Enqueue frontend assets with performance optimizations
     * 
     * Implements conditional loading, cache busting, and performance hints
     * for optimal Core Web Vitals scores.
     */
    public function enqueue_frontend_assets()
    {
        // Only load if we need frontend functionality
        if (!$this->should_load_frontend_assets()) {
            return;
        }

        try {
            // Get file paths and verify they exist
            $js_file = NIGHTLY_PLUGIN_DIR . 'build/frontend/index.js';
            $css_file = NIGHTLY_PLUGIN_DIR . 'build/frontend/index.css';

            if (!file_exists($js_file) || !file_exists($css_file)) {
                $this->log_error('Frontend assets not found. Please run npm run build.');
                return;
            }

            // Use file modification time for cache busting
            $js_version = filemtime($js_file);
            $css_version = filemtime($css_file);

            // Enqueue JavaScript with optimized loading
            wp_enqueue_script(
                'nightly-frontend',
                NIGHTLY_PLUGIN_URL . 'build/frontend/index.js',
                array(),
                $js_version,
                array(
                    'in_footer' => true,
                    'strategy' => 'defer' // Use defer strategy for better performance
                )
            );

            // Add performance hints
            wp_script_add_data('nightly-frontend', 'async', false);
            wp_script_add_data('nightly-frontend', 'defer', true);

            // Enqueue CSS with media query optimization
            wp_enqueue_style(
                'nightly-frontend',
                NIGHTLY_PLUGIN_URL . 'build/frontend/index.css',
                array(),
                $css_version,
                'all'
            );

            // Add preload hint for critical CSS
            add_action('wp_head', function () {
                echo '<link rel="preload" href="' . esc_url(NIGHTLY_PLUGIN_URL . 'build/frontend/index.css') . '" as="style" onload="this.onload=null;this.rel=\'stylesheet\'">';
            }, 1);

            // Localize script with settings including reader and dark mode options
            $settings = array(
                'respectSystemPreference' => $this->get_setting('respect_system_preference', true),
                'autoInject' => (bool) $this->get_setting('auto_inject', false),
                'floatingPosition' => $this->get_setting('floating_position', 'bottom-right'),
                'floatingBgColor' => $this->get_setting('floating_bg_color', '#333333'),
                'version' => $this->version,
                'mode' => $this->get_setting('mode', 'manual'), // 'auto' or 'manual'
                'transitionDuration' => (int) $this->get_setting('transition_duration', 200),
                'ignoreSelectors' => $this->get_setting('ignore_selectors', ''),

                // Auto mode settings (filter-based dark mode)
                'autoIntensity' => (float) $this->get_setting('auto_intensity', 0.05),
                'autoContrast' => (float) $this->get_setting('auto_contrast', 1.15),
                'autoBrightness' => (float) $this->get_setting('auto_brightness', 0.98),
                'autoSepia' => (float) $this->get_setting('auto_sepia', 0.15),

                // Custom mode uses semantic color tokens (no filter settings needed)
            );
            wp_localize_script('nightly-frontend', 'nightlySettings', $settings);

            // Add performance monitoring data in debug mode
            if (defined('WP_DEBUG') && WP_DEBUG) {
                wp_localize_script('nightly-frontend', 'nightlyPerf', array(
                    'debug' => true,
                    'startTime' => microtime(true),
                    'version' => $this->version
                ));
            }
        } catch (Exception $e) {
            $this->log_error('Failed to enqueue frontend assets: ' . $e->getMessage());
        }
    }

    /**
     * Enqueue admin assets with performance optimizations
     * 
     * Loads admin assets for both classic and FSE themes on the Nightly admin page.
     * FSE themes can use the admin interface for global floating toggle configuration.
     */
    public function enqueue_admin_assets($hook)
    {
        // Only load on our admin page (both classic and FSE themes)
        if ($hook === 'appearance_page_nightly') {
            error_log("Nightly: Loading admin assets for hook: " . $hook);
            // Get file modification time for cache busting
            $js_file = NIGHTLY_PLUGIN_DIR . 'build/admin/index.js';
            $css_file = NIGHTLY_PLUGIN_DIR . 'build/admin/index.css';

            $js_version = file_exists($js_file) ? filemtime($js_file) : $this->version;
            $css_version = file_exists($css_file) ? filemtime($css_file) : $this->version;

            // Load asset dependencies from generated file
            $asset_file = NIGHTLY_PLUGIN_DIR . 'build/admin/index.asset.php';
            $asset = file_exists($asset_file) ? include $asset_file : array('dependencies' => array('wp-element', 'wp-api-fetch', 'wp-i18n', 'wp-components'), 'version' => $js_version);

            // Enqueue admin JavaScript with generated dependencies
            wp_enqueue_script(
                'nightly-admin',
                NIGHTLY_PLUGIN_URL . 'build/admin/index.js',
                $asset['dependencies'],
                $asset['version'],
                true
            );

            // Enqueue admin CSS
            wp_enqueue_style(
                'nightly-admin',
                NIGHTLY_PLUGIN_URL . 'build/admin/index.css',
                array(),
                $css_version
            );

            // Localize script with optimized settings
            wp_localize_script('nightly-admin', 'nightlyAdmin', array(
                'apiUrl' => rest_url('nightly/v1/'),
                'nonce' => wp_create_nonce('wp_rest'),
                'isBlockTheme' => wp_is_block_theme(),
                'version' => $this->version,
                'debug' => defined('WP_DEBUG') && WP_DEBUG
            ));

            // Add cache headers for admin assets
            add_action('wp_head', array($this, 'add_admin_cache_headers'));
        }
    }

    /**
     * Add body class for theme detection
     */
    public function add_body_class($classes)
    {
        $classes[] = wp_is_block_theme() ? 'nightly-block-theme' : 'nightly-classic-theme';
        return $classes;
    }

    /**
     * Add HTML attributes for theme switching with no-FOUC boot script
     */
    public function add_html_attributes()
    {
        // No-FOUC boot script - runs before CSS loads
        echo '<script>
            (function() {
                // Get theme preference
                var savedTheme = localStorage.getItem("nightly-theme-preference");
                var respectSystem = ' . json_encode($this->get_setting('respect_system_preference', true)) . ';
                var systemPreference = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
                var theme = savedTheme || (respectSystem ? systemPreference : "light");
                
                // Set both attributes immediately (before CSS loads)
                var html = document.documentElement;
                html.setAttribute("data-nightly-theme", theme);
                html.setAttribute("data-theme", theme);
                
                // Set color-scheme for native browser elements
                if (theme === "dark") {
                    html.style.colorScheme = "dark";
                } else {
                    html.style.colorScheme = "light";
                }
                
                // Debug logging
                if (' . (defined('WP_DEBUG') && WP_DEBUG ? 'true' : 'false') . ') {
                    console.log("Nightly Boot: Set theme to", theme, {
                        saved: savedTheme,
                        system: systemPreference,
                        respectSystem: respectSystem
                    });
                }
            })();
        </script>';
    }

    /**
     * Check if frontend assets should be loaded
     * 
     * Performance optimization: Only load assets when actually needed.
     * This reduces page load time and improves Core Web Vitals scores.
     */
    private function should_load_frontend_assets()
    {
        $auto_inject = $this->get_setting('auto_inject', false);

        // Debug logging
        if (defined('WP_DEBUG') && WP_DEBUG) {
            $this->log_info('Asset loading check', array(
                'auto_inject' => $auto_inject,
                'is_front_page' => is_front_page(),
                'is_home' => is_home(),
                'current_url' => $_SERVER['REQUEST_URI'] ?? 'unknown'
            ));
        }

        // Always load in debug mode for easier development
        if (defined('WP_DEBUG') && WP_DEBUG) {
            return true;
        }

        // Load if auto-inject is enabled for any theme type
        // This should work on ALL pages when enabled
        if ($auto_inject) {
            if (defined('WP_DEBUG') && WP_DEBUG) {
                $this->log_info('Loading assets due to auto-inject enabled');
            }
            return true;
        }

        // Load if we have Nightly blocks on the current page
        if (has_block('nightly/toggle')) {
            return true;
        }

        // Load if there are manual toggle implementations in the content
        global $post;
        if ($post && (
            strpos($post->post_content, 'data-nightly-toggle') !== false ||
            strpos($post->post_content, '[nightly-toggle]') !== false ||
            strpos($post->post_content, 'nightly-toggle-button') !== false
        )) {
            return true;
        }

        // Check if any widgets contain toggles (for classic themes)
        if (is_active_widget(false, false, 'nightly_toggle_widget')) {
            return true;
        }

        // Don't load assets if not needed
        return false;
    }

    /**
     * Get plugin setting
     */
    private function get_setting($key, $default = null)
    {
        $settings = get_option('nightly_settings', array());
        return isset($settings[$key]) ? $settings[$key] : $default;
    }

    /**
     * Maybe add floating toggle to footer
     * 
     * Now works for both classic and FSE themes when auto-inject is enabled.
     * Includes debugging to help identify issues on inner pages.
     */
    public function maybe_add_floating_toggle()
    {
        $auto_inject = $this->get_setting('auto_inject', false);

        // Debug logging
        if (defined('WP_DEBUG') && WP_DEBUG) {
            $this->log_info('Floating toggle check', array(
                'auto_inject' => $auto_inject,
                'is_front_page' => is_front_page(),
                'is_home' => is_home(),
                'current_url' => $_SERVER['REQUEST_URI'] ?? 'unknown'
            ));
        }

        // Add if auto-inject is enabled for any theme type
        if ($auto_inject) {
            // For floating toggle, we want it to appear on ALL pages when enabled
            // Only skip if there are actual Nightly blocks on the current page
            global $post;
            $has_nightly_blocks = false;

            if ($post) {
                $has_nightly_blocks = has_block('nightly/toggle', $post);

                // Debug logging
                if (defined('WP_DEBUG') && WP_DEBUG) {
                    $this->log_info('Toggle detection', array(
                        'post_id' => $post->ID ?? 'none',
                        'has_nightly_blocks' => $has_nightly_blocks,
                        'post_type' => $post->post_type ?? 'none'
                    ));
                }
            }

            // Only skip if there are actual Nightly blocks (not manual toggles)
            // This ensures floating toggle appears on pages without blocks
            if (!$has_nightly_blocks) {
                // Add a placeholder that JavaScript will replace with the actual toggle
                echo '<div id="nightly-floating-toggle-placeholder" style="display: none;" data-auto-inject="true"></div>';

                // Debug logging
                if (defined('WP_DEBUG') && WP_DEBUG) {
                    $this->log_info('Floating toggle placeholder added');
                }
            } else {
                // Debug logging
                if (defined('WP_DEBUG') && WP_DEBUG) {
                    $this->log_info('Floating toggle skipped - Nightly blocks found on page');
                }
            }
        }
    }

    /**
     * Get optimized frontend settings
     */
    private function get_optimized_frontend_settings()
    {
        static $cached_settings = null;

        if ($cached_settings === null) {
            $cached_settings = array(
                'respectSystemPreference' => $this->get_setting('respect_system_preference', true),
                'autoInject' => (bool) $this->get_setting('auto_inject', false),
                'floatingPosition' => $this->get_setting('floating_position', 'bottom-right'),
                'floatingBgColor' => $this->get_setting('floating_bg_color', '#333333'),
                'isClassicTheme' => !wp_is_block_theme(),
                'version' => $this->version
            );
        }

        return $cached_settings;
    }

    /**
     * Add cache headers for admin assets
     */
    public function add_admin_cache_headers()
    {
        // Set cache headers for better performance
        if (!headers_sent()) {
            header('Cache-Control: public, max-age=31536000'); // 1 year
            header('Expires: ' . gmdate('D, d M Y H:i:s', time() + 31536000) . ' GMT');
        }
    }

    /**
     * Get plugin version
     */
    public function get_version()
    {
        return $this->version;
    }

    /**
     * Log error messages for debugging
     * 
     * Only logs in debug mode to avoid cluttering production logs.
     * 
     * @param string $message Error message to log
     * @param array $context Additional context data
     */
    private function log_error($message, $context = array())
    {
        if (defined('WP_DEBUG') && WP_DEBUG && defined('WP_DEBUG_LOG') && WP_DEBUG_LOG) {
            $log_message = 'Nightly Plugin: ' . $message;
            if (!empty($context)) {
                $log_message .= ' Context: ' . wp_json_encode($context);
            }
            error_log($log_message);
        }
    }

    /**
     * Log info messages for debugging
     * 
     * @param string $message Info message to log
     * @param array $context Additional context data
     */
    private function log_info($message, $context = array())
    {
        if (defined('WP_DEBUG') && WP_DEBUG && defined('WP_DEBUG_LOG') && WP_DEBUG_LOG) {
            $log_message = 'Nightly Plugin Info: ' . $message;
            if (!empty($context)) {
                $log_message .= ' Context: ' . wp_json_encode($context);
            }
            error_log($log_message);
        }
    }
}
