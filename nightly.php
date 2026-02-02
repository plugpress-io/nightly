<?php
/**
 * Plugin Name: Nightly
 * Plugin URI: https://plugpress.io/
 * Description: A modern admin scaffold with REST-powered UI and Tailwind-based components.
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

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once __DIR__ . '/includes/boot.php';

register_activation_hook( __FILE__, array( 'Nightly\\Notices', 'activate' ) );

Nightly\boot();
