<?php
/**
 * Init Freemius.
 */

// Exit if accessed directly.
if ( !defined( 'ABSPATH' ) ) {
    exit;
}

// Create a helper function for easy SDK access.
if ( !function_exists( 'wpn_fs' ) ) {
    function wpn_fs() {
        global $wpn_fs;

        if ( !isset( $wpn_fs ) ) {
            // Include Freemius SDK.
            require_once dirname( __FILE__ ) . '/freemius/start.php';

            $wpn_fs = fs_dynamic_init( array(
                'id'                  => '10065',
                'slug'                => 'wp-nightly',
                'type'                => 'plugin',
                'public_key'          => 'pk_09906b7bbb2c4adaff6e61f39ae6c',
                'is_premium'          => true,
                'has_premium_version' => true,
                'has_addons'          => false,
                'has_paid_plans'      => true,
                'navigation'          => 'tabs',
                'menu'                => array(
                    'slug'        => 'wp_nightly#/general',
                    'first-path'  => 'admin.php?page=wp_nightly#/general',
                    'account'     => true,
                    'pricing'     => true,
                    'contact'     => true,
                    'support'     => false,
                    'affiliation' => false,
                    'parent'      => array(
                        'slug' => 'admin.php',
                    ),
                ),
            ) );
        }

        return $wpn_fs;
    }

    // Init Freemius.
    wpn_fs();

    // Disable deactivation feedback form.
    wpn_fs()->add_filter( 'show_deactivation_feedback_form', '__return_false' );

    // Signal that SDK was initiated.
    do_action( 'wpn_fs_loaded' );

}