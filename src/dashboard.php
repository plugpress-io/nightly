<?php
namespace WPNightly;

/**
 * Class Dashboard
 */
class Dashboard {

    private static $instance;

    /**
     * Class Constractor
     */
    public function init() {
        add_action( 'admin_menu', array( $this, 'add_menu' ) );
        add_filter( 'admin_body_class', array( $this, 'admin_body_class' ), 20 );
    }

    public function admin_body_class( $admin_body_class = '' ) {
        return $admin_body_class . ' wp-nightly-dashboard ';
    }

    /**
     * Add option page menu
     */
    public function add_menu() {
        add_menu_page( __( 'WP Nightly', 'wp-nightly' ), __( 'WP Nightly', 'wp-nightly' ), 'edit_pages', 'wp_nightly', null, wp_nightly_base64_icon() );
        $page = add_submenu_page( 'wp-nightly', __( 'WP Nightly', 'wp-nightly' ), __( 'Settings' ), 'edit_pages', 'wp_nightly', [$this, 'config_page'] );
        add_action( 'admin_print_styles-' . $page, [$this, 'scripts'] );
    }

    /**
     * Root Dashboard Page
     */
    public function config_page() {
        echo '<div id="wp-nightly"></div>';
    }

    /**
     * Scripts
     */
    public function scripts() {

        $asset_file = include WP_NIGHTLY_PLUGIN_DIR . '/build/dashboard/index.asset.php';

        wp_enqueue_style(
            'wp-nightly-styles',
            WP_NIGHTLY_PLUGIN_BUILD . '/dashboard/style-index.css',
            ['wp-components'],
            WP_NIGHTLY_VERSION
        );

        wp_enqueue_style(
            'wp-nightly-main',
            WP_NIGHTLY_PLUGIN_BUILD . '/dashboard/index.css',
            [],
            WP_NIGHTLY_VERSION
        );

        wp_enqueue_script(
            'wp-nightly-scripts',
            WP_NIGHTLY_PLUGIN_BUILD . '/dashboard/index.js',
            ['lodash', 'react', 'react-dom', 'wp-api', 'wp-api-fetch', 'wp-components', 'wp-data', 'wp-element', 'wp-i18n'],
            WP_NIGHTLY_VERSION,
            true
        );

        wp_localize_script(
            'wp-nightly-scripts',
            'wpnightly',
            [
                'admin_url'  => esc_url( admin_url() ),
                'ajax_url'   => admin_url( 'admin-ajax.php' ),
                'assetsPath' => WP_NIGHTLY_PLUGIN_ASSETS,
                'version'    => WP_NIGHTLY_VERSION,
                'options'    => wp_nightly_options( true ),
                'isPro'      => false,
            ]
        );
    }

    /**
     * Activation Redirect
     */
    public function activation_redirect() {
        if ( get_option( 'wp_nightly_redirect_on_activation', false ) ) {
            delete_option( 'wp_nightly_redirect_on_activation' );
            if ( !isset( $_GET['activate-multi'] ) ) {
                wp_safe_redirect( $this->settings_link() );
            }
        }
    }

    /**
     * Setting Link
     *
     * @return void
     */
    public function settings_link() {
        return apply_filters( 'wp-nightly-settings-url', admin_url( 'admin.php?page=wp_nightly' ) );
    }

    /**
     * Add plugin links
     */
    public function add_settings_link( $links ) {
        $settings_link = '<a href="' . esc_url( $this->settings_link() ) . '">' . __( 'Settings', 'wp-nightly' ) . '</a>';
        array_push( $links, $settings_link );
        return $links;
    }

    /*
     * his is the static method that controls the access to the singleton instance.
     */
    public static function instance() {
        if ( !isset( self::$instance ) && !( self::$instance instanceof Dashboard ) ) {
            self::$instance = new Dashboard;
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

Dashboard::instance();