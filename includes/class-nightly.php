<?php
/**
 * Main Nightly Plugin Class
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
 */
class Nightly {
    
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
    public function __construct() {
        $this->version = NIGHTLY_VERSION;
    }
    
    /**
     * Initialize the plugin
     */
    public function init() {
        // Initialize components
        $this->init_components();
        
        // Setup hooks
        $this->setup_hooks();
        
        // Add theme support if needed
        $this->add_theme_support();
    }
    
    /**
     * Initialize plugin components
     */
    private function init_components() {
        // Initialize block functionality
        $this->block = new Block();
        $this->block->init();
        
        // Initialize admin interface (only in admin)
        if (is_admin()) {
            $this->admin = new Admin();
            $this->admin->init();
        }
        
        // Initialize API
        $this->api = new API();
        $this->api->init();
    }
    
    /**
     * Setup WordPress hooks
     */
    private function setup_hooks() {
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
    private function add_theme_support() {
        // Add support for custom CSS properties
        add_theme_support('custom-properties');
        
        // Add support for responsive embeds
        add_theme_support('responsive-embeds');
    }
    
    /**
     * Enqueue frontend assets with performance optimizations
     */
    public function enqueue_frontend_assets() {
        // Only load if we need frontend functionality
        if ($this->should_load_frontend_assets()) {
            // Get file modification time for cache busting
            $js_file = NIGHTLY_PLUGIN_DIR . 'build/frontend/index.js';
            $css_file = NIGHTLY_PLUGIN_DIR . 'build/frontend/index.css';
            
            $js_version = file_exists($js_file) ? filemtime($js_file) : $this->version;
            $css_version = file_exists($css_file) ? filemtime($css_file) : $this->version;
            
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
            add_action('wp_head', function() {
                echo '<link rel="preload" href="' . esc_url(NIGHTLY_PLUGIN_URL . 'build/frontend/index.css') . '" as="style" onload="this.onload=null;this.rel=\'stylesheet\'">';
            }, 1);
            
            // Localize script with minimal settings
            $settings = $this->get_optimized_frontend_settings();
            wp_localize_script('nightly-frontend', 'nightlySettings', $settings);
            
            // Add performance monitoring data
            if (defined('WP_DEBUG') && WP_DEBUG) {
                wp_localize_script('nightly-frontend', 'nightlyPerf', array(
                    'debug' => true,
                    'startTime' => microtime(true)
                ));
            }
        }
    }
    
    /**
     * Enqueue admin assets with performance optimizations
     */
    public function enqueue_admin_assets($hook) {
        // Only load on our admin page
        if ($hook === 'appearance_page_nightly') {
            // Get file modification time for cache busting
            $js_file = NIGHTLY_PLUGIN_DIR . 'build/admin/index.js';
            $css_file = NIGHTLY_PLUGIN_DIR . 'build/admin/index.css';
            
            $js_version = file_exists($js_file) ? filemtime($js_file) : $this->version;
            $css_version = file_exists($css_file) ? filemtime($css_file) : $this->version;
            
            // Enqueue admin JavaScript
            wp_enqueue_script(
                'nightly-admin',
                NIGHTLY_PLUGIN_URL . 'build/admin/index.js',
                array('wp-element', 'wp-api-fetch', 'wp-i18n'),
                $js_version,
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
    public function add_body_class($classes) {
        $classes[] = wp_is_block_theme() ? 'nightly-block-theme' : 'nightly-classic-theme';
        return $classes;
    }
    
    /**
     * Add HTML attributes for theme switching
     */
    public function add_html_attributes() {
        echo '<script>
            (function() {
                var savedTheme = localStorage.getItem("nightly-theme-preference");
                var systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
                var theme = savedTheme || systemPreference;
                document.documentElement.setAttribute("data-nightly-theme", theme);
            })();
        </script>';
    }
    
    /**
     * Check if frontend assets should be loaded
     */
    private function should_load_frontend_assets() {
        // Load if we have blocks on the page
        if (has_block('nightly/toggle')) {
            return true;
        }
        
        // Load if auto-inject is enabled for classic themes
        if (!wp_is_block_theme() && $this->get_setting('auto_inject', false)) {
            return true;
        }
        
        // Load if there are any toggle buttons in the content (shortcode, manual implementation)
        global $post;
        if ($post && (strpos($post->post_content, 'data-nightly-toggle') !== false || 
                      strpos($post->post_content, '[nightly-toggle]') !== false)) {
            return true;
        }
        
        return false;
    }
    
    /**
     * Get plugin setting
     */
    private function get_setting($key, $default = null) {
        $settings = get_option('nightly_settings', array());
        return isset($settings[$key]) ? $settings[$key] : $default;
    }
    
    /**
     * Maybe add floating toggle to footer
     */
    public function maybe_add_floating_toggle() {
        // Only add if auto-inject is enabled and we're on a classic theme
        if (!wp_is_block_theme() && $this->get_setting('auto_inject', false)) {
            // Check if there are already toggle buttons on the page
            global $post;
            if ($post && (has_block('nightly/toggle', $post) || 
                         strpos($post->post_content, 'data-nightly-toggle') !== false)) {
                // Don't add floating toggle if there are already toggles
                return;
            }
            
            // Add a placeholder that JavaScript will replace with the actual toggle
            echo '<div id="nightly-floating-toggle-placeholder" style="display: none;" data-auto-inject="true"></div>';
        }
    }
    
    /**
     * Get optimized frontend settings
     */
    private function get_optimized_frontend_settings() {
        static $cached_settings = null;
        
        if ($cached_settings === null) {
            $cached_settings = array(
                'respectSystemPreference' => $this->get_setting('respect_system_preference', true),
                'transitionDuration' => (int) $this->get_setting('transition_duration', 200),
                'autoInject' => (bool) $this->get_setting('auto_inject', false),
                'floatingPosition' => $this->get_setting('floating_position', 'bottom-right'),
                'isClassicTheme' => !wp_is_block_theme(),
                'version' => $this->version
            );
        }
        
        return $cached_settings;
    }
    
    /**
     * Add cache headers for admin assets
     */
    public function add_admin_cache_headers() {
        // Set cache headers for better performance
        if (!headers_sent()) {
            header('Cache-Control: public, max-age=31536000'); // 1 year
            header('Expires: ' . gmdate('D, d M Y H:i:s', time() + 31536000) . ' GMT');
        }
    }
    
    /**
     * Get plugin version
     */
    public function get_version() {
        return $this->version;
    }
}