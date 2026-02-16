<?php

namespace Nightly;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Notices {
	public function register() : void {
		add_action( 'admin_notices', array( $this, 'review_notice' ) );
		add_action( 'admin_post_nightly_dismiss_review', array( $this, 'dismiss_review' ) );
	}

	public static function activate() : void {
		update_option( OPTION_REVIEW_VISIBLE, true, false );
	}

	public function review_notice() : void {
		if ( ! Permissions::can_manage() ) {
			return;
		}

		$screen = get_current_screen();
		if ( ! $screen ) {
			return;
		}

		$allowed_screens = array( 'dashboard', 'toplevel_page_' . PLUGIN_SLUG );
		if ( ! in_array( $screen->id, $allowed_screens, true ) ) {
			return;
		}

		if ( get_option( OPTION_REVIEW_DISMISSED, false ) ) {
			return;
		}

		if ( ! get_option( OPTION_REVIEW_VISIBLE, false ) ) {
			return;
		}

		$review_url = 'https://wordpress.org/support/plugin/nightly/reviews/#new-post';
		$dismiss_url = wp_nonce_url(
			admin_url( 'admin-post.php?action=nightly_dismiss_review' ),
			'nightly_dismiss_review'
		);

		echo '<div class="notice notice-info is-dismissible">';
		echo '<p>' . esc_html__( 'Enjoying Nightly? Please consider leaving a review.', 'nightly' ) . '</p>';
		echo '<p>';
		echo '<a class="button button-primary" href="' . esc_url( $review_url ) . '" target="_blank" rel="noopener noreferrer">' . esc_html__( 'Leave a review', 'nightly' ) . '</a> ';
		echo '<a class="button" href="' . esc_url( $dismiss_url ) . '">' . esc_html__( 'Dismiss', 'nightly' ) . '</a>';
		echo '</p>';
		echo '</div>';
	}

	public function dismiss_review() : void {
		if ( ! Permissions::can_manage() ) {
			wp_die( esc_html__( 'You do not have permission to do that.', 'nightly' ) );
		}

		check_admin_referer( 'nightly_dismiss_review' );

		update_option( OPTION_REVIEW_DISMISSED, true, false );
		update_option( OPTION_REVIEW_VISIBLE, false, false );

		wp_safe_redirect( admin_url( 'admin.php?page=' . PLUGIN_SLUG ) );
		exit;
	}
}
