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
 * Nightly is a modern dark mode toggle plugin that follows WordPress best practices.
 * It provides both a Gutenberg block for content editors and an automatic floating
 * toggle for classic themes. The plugin uses CSS custom properties for smooth theme
 * transitions and respects user system preferences.
 *
 * Key Features:
 * - Gutenberg block for flexible placement
 * - Automatic floating toggle for classic themes
 * - System preference detection
 * - Smooth CSS transitions
 * - Full accessibility support
 * - Performance optimized
 * - Clean, maintainable code
 *
 * @package Nightly
 * @since 1.0.0
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
function nightly_init()
{
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
function nightly_activate()
{
    // Check WordPress version compatibility
    if (version_compare(get_bloginfo('version'), '5.0', '<')) {
        deactivate_plugins(plugin_basename(__FILE__));
        wp_die(__('Nightly requires WordPress 5.0 or higher.', 'nightly'));
    }

    // Check PHP version compatibility
    if (version_compare(PHP_VERSION, '7.4', '<')) {
        deactivate_plugins(plugin_basename(__FILE__));
        wp_die(__('Nightly requires PHP 7.4 or higher.', 'nightly'));
    }

    // Set default options only if they don't exist
    $default_settings = array(
        'auto_inject' => false,
        'floating_position' => 'bottom-right',
        'respect_system_preference' => true,
        // DarkReader-inspired settings
        'intensity' => 0.8,
        'contrast' => 1.0,
        'brightness' => 0.9,
        'sepia' => 0.1
    );

    add_option('nightly_settings', $default_settings);

    // Set activation timestamp for analytics
    add_option('nightly_activated_at', current_time('mysql'));

    // Set plugin version for future migrations
    add_option('nightly_version', NIGHTLY_VERSION);

    // Clear any cached data
    if (function_exists('wp_cache_flush')) {
        wp_cache_flush();
    }

    // Flush rewrite rules
    flush_rewrite_rules();
}

// Deactivation hook
register_deactivation_hook(__FILE__, 'nightly_deactivate');
function nightly_deactivate()
{
    // Clear any cached data
    if (function_exists('wp_cache_flush')) {
        wp_cache_flush();
    }

    // Flush rewrite rules
    flush_rewrite_rules();

    // Note: We don't delete settings on deactivation
    // Users might want to reactivate and keep their settings
}
