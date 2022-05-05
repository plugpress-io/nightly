<?php
/**
 * Plugin Name: Nightly
 * Plugin URI: https://www.wppaw.com/wp-nightly
 * Description: Protect your visitor's eyes and enable dark mode on your website
 * Author: WPPAW
 * Author URI: https://www.wppaw.com
 * Version: 0.0.1-beta.3
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: wp-nightly
 *
 *
 * WP Nightly is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * any later version.
 *
 *
 * WP Nightly is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 */

// Exit if accessed directly.
if ( !defined( 'ABSPATH' ) ) {
    exit;
}

if ( !defined( 'WP_NIGHTLY_VERSION' ) ) {
    define( 'WP_NIGHTLY_VERSION', '0.0.1-beta.3' );
}

if ( !defined( 'WP_NIGHTLY_PLUGIN_DIR' ) ) {
    define( 'WP_NIGHTLY_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
}

if ( !defined( 'WP_NIGHTLY_PLUGIN_URL' ) ) {
    define( 'WP_NIGHTLY_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
}

if ( !defined( 'WP_NIGHTLY_PLUGIN_FILE' ) ) {
    define( 'WP_NIGHTLY_PLUGIN_FILE', __FILE__ );
}

if ( !defined( 'WP_NIGHTLY_PLUGIN_ASSETS' ) ) {
    define( 'WP_NIGHTLY_PLUGIN_ASSETS', WP_NIGHTLY_PLUGIN_URL . 'assets' );
}

if ( !defined( 'WP_NIGHTLY_PLUGIN_DIST' ) ) {
    define( 'WP_NIGHTLY_PLUGIN_DIST', WP_NIGHTLY_PLUGIN_URL . 'dist' );
}

/**
 * WPNightly class.
 */
if ( !class_exists( 'WPNightly' ) ):
    final class WPNightly {

        /**
         * @var Instance.
         */
        private static $instance;

        /**
         * The instance method for the static class.
         */
        public static function instance() {
            if ( !isset( self::$instance ) && !( self::$instance instanceof WPNightly ) ) {
                self::$instance = new WPNightly;
                self::$instance->includes();
            }

            return self::$instance;
        }

        /**
         * All files
         */
        private function includes() {

            require_once WP_NIGHTLY_PLUGIN_DIR . 'inc/settings.php';
            require_once WP_NIGHTLY_PLUGIN_DIR . 'inc/functions.php';

            if ( is_admin() ) {
                require_once WP_NIGHTLY_PLUGIN_DIR . 'inc/dashboard.php';
            }

            require_once WP_NIGHTLY_PLUGIN_DIR . 'inc/frontend.php';
        }

        /**
         * Load text domain
         *
         * @return void
         */
        public function load_textdomain() {

            load_plugin_textdomain( 'wp-nightly', false, WP_NIGHTLY_PLUGIN_URL . '/languages/' );
        }

    }

endif;

/**
 * Initialize the plugin.
 */
if ( !function_exists( 'wpnightly' ) ) {
    function wpnightly() {
        return WPNightly::instance();
    }
}

/**
 * The start of the app.
 *
 * @since   1.0.0
 */
wpnightly();