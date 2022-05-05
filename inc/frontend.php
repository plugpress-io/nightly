<?php
namespace WPNightly;

/**
 * Class Settings
 */
class Frontend {

    /**
     * The Frontend instance var.
     */
    private static $instance;

    /**
     * Initialize the class
     */
    public function init() {
        add_action( 'wp_enqueue_scripts', [$this, 'enqueue_scripts'], 10 );
    }

    /**
     * Enqueue scripts
     */
    public function enqueue_scripts() {

        wp_enqueue_script(
            'wp-nightly-frontend',
            WP_NIGHTLY_PLUGIN_DIST . '/nightly.js',
            false,
            WP_NIGHTLY_VERSION,
            true
        );

        wp_enqueue_style(
            'wp-nightly-frontend-style',
            WP_NIGHTLY_PLUGIN_DIST . '/nightly.css',
            '',
            WP_NIGHTLY_VERSION
        );

        wp_localize_script(
            'wp-nightly-frontend',
            'wpnightly',
            [
                'admin_url'  => esc_url( admin_url() ),
                'ajax_url'   => admin_url( 'admin-ajax.php' ),
                'assetsPath' => WP_NIGHTLY_PLUGIN_ASSETS,
                'version'    => WP_NIGHTLY_VERSION,
                'options'    => wp_nightly_options(),
            ]
        );
    }

    /*
     * his is the static method that controls the access to the singleton instance.
     */
    public static function instance() {
        if ( !isset( self::$instance ) && !( self::$instance instanceof Frontend ) ) {
            self::$instance = new Frontend;
            self::$instance->init();
        }

        return self::$instance;
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

Frontend::instance();