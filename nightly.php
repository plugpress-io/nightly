<?php
/**
 * Plugin Name: Nightly — Dark Mode Toggle
 * Plugin URI: https://plugpress.io/
 * Description: A lightweight WordPress plugin that provides a minimal dark mode toggle functionality for websites. Includes a custom Gutenberg block and React-based admin interface.
 * Version: 1.0.0
 * Author: PlugPress
 * Author URI: https://plugpress.io/
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: nightly
 * Domain Path: /languages
 * Requires at least: 5.0
 * Tested up to: 6.4
 * Requires PHP: 7.4
 * Network: false
 *
 * @package Nightly
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('NIGHTLY_VERSION', '1.0.0');
define('NIGHTLY_PLUGIN_FILE', __FILE__);
define('NIGHTLY_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('NIGHTLY_PLUGIN_URL', plugin_dir_url(__FILE__));
define('NIGHTLY_PLUGIN_BASENAME', plugin_basename(__FILE__));

// Autoloader for plugin classes
spl_autoload_register(function ($class) {
    // Check if the class belongs to our plugin namespace
    if (strpos($class, 'Nightly\\') !== 0) {
        return;
    }
    
    // Remove namespace prefix and convert to file path
    $class_name = str_replace('Nightly\\', '', $class);
    $class_file = strtolower(str_replace('_', '-', $class_name));
    $file_path = NIGHTLY_PLUGIN_DIR . 'includes/class-' . $class_file . '.php';
    
    if (file_exists($file_path)) {
        require_once $file_path;
    }
});

// Initialize the plugin
function nightly_init() {
    // Load text domain for translations
    load_plugin_textdomain('nightly', false, dirname(NIGHTLY_PLUGIN_BASENAME) . '/languages');
    
    // Initialize main plugin class
    if (class_exists('Nightly\\Nightly')) {
        $nightly = new Nightly\Nightly();
        $nightly->init();
    }
}

// Hook into WordPress
add_action('plugins_loaded', 'nightly_init');

// Activation hook
register_activation_hook(__FILE__, 'nightly_activate');
function nightly_activate() {
    // Set default options
    $default_settings = array(
        'auto_inject' => false,
        'floating_position' => 'bottom-right',
        'respect_system_preference' => true,
        'transition_duration' => 200
    );
    
    add_option('nightly_settings', $default_settings);
    
    // Flush rewrite rules if needed
    flush_rewrite_rules();
}

// Deactivation hook
register_deactivation_hook(__FILE__, 'nightly_deactivate');
function nightly_deactivate() {
    // Flush rewrite rules
    flush_rewrite_rules();
}