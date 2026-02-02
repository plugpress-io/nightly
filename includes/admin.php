<?php

namespace Nightly;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Admin {
	public function register() : void {
		add_action( 'admin_menu', array( $this, 'register_menu' ) );
	}

	public function register_menu() : void {
		add_menu_page(
			__( 'Nightly', TEXT_DOMAIN ),
			__( 'Nightly', TEXT_DOMAIN ),
			'manage_options',
			PLUGIN_SLUG,
			array( $this, 'render_page' ),
			'dashicons-moon',
			58
		);
	}

	public function render_page() : void {
		printf( '<div id="nightly-admin-app"></div>' );
	}
}
