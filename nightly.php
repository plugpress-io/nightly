<?php

/**
 * Plugin Name: Nightly
 * Description: A plugin to enable dark mode on your website
 * Author: PlugPress
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: nightly
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

define('NIGHTLY_BASEFILE', __FILE__);
define('NIGHTLY_URL', plugins_url('/', __FILE__));
define('NIGHTLY_PATH', __DIR__);
define('NIGHTLY_VERSION', '1.0.0');

// Autoloader
if (file_exists(NIGHTLY_PATH . '/vendor/autoload.php')) {
    require_once NIGHTLY_PATH . '/vendor/autoload.php';
}

// Initialize the plugin
add_action('plugins_loaded', function () {
    if (class_exists('\\PlugPress\\Nightly\\Plugin')) {
        new \PlugPress\Nightly\Plugin();
    }
});
