<?php
/**
 * Plugin Name: WP Nightly
 * Plugin URI: https://www.wppaw.com/wp-nightly
 * Description: Protect your visitor's eyes enable dark mode on your website!
 * Author: WPPAW
 * Author URI: https://www.wppaw.com
 * Version: 1.0.0
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
    define( 'WP_NIGHTLY_VERSION', '1.0.0' );
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

if ( !defined( 'WP_NIGHTLY_PLUGIN_BUILD' ) ) {
    define( 'WP_NIGHTLY_PLUGIN_BUILD', WP_NIGHTLY_PLUGIN_URL . 'build' );
}

$vendor_file = WP_NIGHTLY_PLUGIN_DIR . '/vendor/autoload.php';

if ( is_readable( $vendor_file ) ) {
    require_once $vendor_file;
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

            require_once WP_NIGHTLY_PLUGIN_DIR . 'freemius.php';

            if ( is_admin() ) {
                require_once WP_NIGHTLY_PLUGIN_DIR . 'src/class-dashboard.php';
            }
            require_once WP_NIGHTLY_PLUGIN_DIR . 'src/class-settings.php';
            require_once WP_NIGHTLY_PLUGIN_DIR . 'src/class-main.php';
            require_once WP_NIGHTLY_PLUGIN_DIR . 'src/functions.php';
        }

        /**
         * Throw error on object clone
         *
         * The whole idea of the singleton design pattern is that there is a single
         * object therefore, we don't want the object to be cloned.
         *
         * @access  public
         * @since   1.0.0
         *
         * @return void
         */
        public function __clone() {
            // Cloning instances of the class is forbidden.
            _doing_it_wrong( __FUNCTION__, 'Cheatin&#8217; huh?', '1.0.0' );
        }

        /**
         * Disable unserializing of the class
         *
         * @access  public
         * @since   1.0.0
         *
         * @return void
         */
        public function __wakeup() {
            // Unserializing instances of the class is forbidden.
            _doing_it_wrong( __FUNCTION__, 'Cheatin&#8217; huh?', '1.0.0' );
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