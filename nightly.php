<?php

/**
 * Plugin Name: Nightly Dark Mode
 * Plugin URI: https://plugpress.io/nightly
 * Description: An elegant dark mode plugin with smart scheduling, 6 color themes, smooth transitions, and advanced customization. Reduces eye strain and enhances user experience.
 * Version: 1.0.3
 * Author: Fahim Reza
 * Author URI: https://plugpress.io
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: nightly
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
