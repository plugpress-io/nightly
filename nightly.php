<?php

/**
 * Plugin Name: Dark Mode for WordPress - Nightly
 * Plugin URI: https://plugpress.io/nightly
 * Description: The most powerful dark mode plugin for WordPress. Eye-friendly night mode with smart scheduling, 6 color themes, smooth transitions, and advanced customization. Perfect for reducing eye strain and enhancing user experience.
 * Version: 1.0.2
 * Author: Fahim Reza
 * Author URI: https://plugpress.io
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: nightly
 * Domain Path: /languages
 * Requires at least: 6.0
 * Requires PHP: 7.4
 *
 * @package Nightly
 */

if (! defined('ABSPATH')) {
	exit;
}

require_once __DIR__ . '/includes/boot.php';

register_activation_hook(__FILE__, array('Nightly\\Notices', 'activate'));

Nightly\boot();
