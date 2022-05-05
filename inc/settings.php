<?php
namespace WPNightly;

/**
 * Class Settings
 */
class Settings {

    /**
     * The main instance var.
     */
    private static $instance;

    /**
     * Initialize the class
     */
    public function init() {
        add_action( 'init', array( $this, 'register_settings' ), 99 );
    }

    /**
     * Register Settings
     */
    public function register_settings() {
        $prefix = 'wp_nightly_settings';

        // General
        register_setting(
            'wp_nightly_settings',
            'wp_nightly_settings_enabled',
            [
                'type'         => 'boolean',
                'show_in_rest' => true,
                'default'      => true,
            ]
        );

        register_setting(
            'wp_nightly_settings',
            'wp_nightly_settings_os_aware',
            [
                'type'         => 'boolean',
                'show_in_rest' => true,
                'default'      => false,
            ]
        );

        register_setting(
            'wp_nightly_settings',
            'wp_nightly_settings_schedule',
            [
                'type'         => 'boolean',
                'show_in_rest' => true,
                'default'      => false,
            ]
        );

        register_setting(
            'wp_nightly_settings',
            'wp_nightly_settings_schedule_type',
            [
                'type'         => 'string',
                'show_in_rest' => true,
                'default'      => 'sun',
            ]
        );

        register_setting(
            'wp_nightly_settings',
            'wp_nightly_settings_schedule_time',
            [
                'type'         => 'string',
                'show_in_rest' => true,
                'default'      => '',
            ]
        );

        register_setting(
            'wp_nightly_settings',
            'wp_nightly_settings_schedule_time_start',
            [
                'type'         => 'string',
                'show_in_rest' => true,
                'default'      => '22:30',
            ]
        );

        register_setting(
            'wp_nightly_settings',
            'wp_nightly_settings_schedule_time_end',
            [
                'type'         => 'string',
                'show_in_rest' => true,
                'default'      => '06:30',
            ]
        );

        // Floating Switch
        register_setting(
            'wp_nightly_settings',
            'wp_nightly_settings_switch',
            [
                'type'         => 'boolean',
                'show_in_rest' => true,
                'default'      => true,
            ]
        );

        register_setting(
            'wp_nightly_settings',
            'wp_nightly_settings_switch_style',
            [
                'type'         => 'string',
                'show_in_rest' => true,
                'default'      => 'style1',
            ]
        );

        register_setting(
            'wp_nightly_settings',
            'wp_nightly_settings_switch_horizontal',
            [
                'type'         => 'string',
                'show_in_rest' => true,
                'default'      => 'right',
            ]
        );

        register_setting(
            'wp_nightly_settings',
            'wp_nightly_settings_switch_vertical',
            [
                'type'         => 'string',
                'show_in_rest' => true,
                'default'      => 'right',
            ]
        );

        register_setting(
            'wp_nightly_settings',
            'wp_nightly_settings_switch_animation',
            [
                'type'         => 'string',
                'show_in_rest' => true,
                'default'      => 'bounch',
            ]
        );

        // Color Scheme
        register_setting(
            'wp_nightly_settings',
            'wp_nightly_settings_color_scheme',
            [
                'type'         => 'string',
                'show_in_rest' => true,
                'default'      => 'black',
            ]
        );

        register_setting(
            'wp_nightly_settings',
            'wp_nightly_settings_colors',
            [
                'type'         => 'string',
                'show_in_rest' => true,
                'default'      => 'black',
            ]
        );

        // Admin: Dashboard
        register_setting(
            'wp_nightly_settings',
            'wp_nightly_settings_admin_dashboard',
            [
                'type'         => 'boolean',
                'show_in_rest' => true,
                'default'      => true,
            ]
        );

        // Admin: Block Editor
        register_setting(
            'wp_nightly_settings',
            'wp_nightly_settings_block_editor',
            [
                'type'         => 'boolean',
                'show_in_rest' => true,
                'default'      => true,
            ]
        );

        // Additional
        register_setting(
            'wp_nightly_settings',
            'wp_nightly_settings_keyboard_shortcut',
            [
                'type'         => 'boolean',
                'show_in_rest' => true,
                'default'      => false,
            ]
        );

        register_setting(
            'wp_nightly_settings',
            'wp_nightly_settings_url_params',
            [
                'type'         => 'boolean',
                'show_in_rest' => true,
                'default'      => false,
            ]
        );

    }

    /*
     * his is the static method that controls the access to the singleton instance.
     */
    public static function instance() {
        if ( !isset( self::$instance ) && !( self::$instance instanceof Settings ) ) {
            self::$instance = new Settings;
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

Settings::instance();