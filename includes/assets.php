<?php

namespace Nightly;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Assets {
	public function register() : void {
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_assets' ) );
	}

	public function enqueue_admin_assets( string $hook ) : void {
		$screen = get_current_screen();
		if ( ! $screen || 'settings_page_' . PLUGIN_SLUG !== $screen->id ) {
			return;
		}

		$asset_file = plugin_dir() . 'build/index.asset.php';
		$script_file = plugin_dir() . 'build/index.js';
		$style_file = plugin_dir() . 'build/index.css';

		if ( file_exists( $asset_file ) ) {
			$asset_data = include $asset_file;
		} else {
			$asset_data = array(
				'dependencies' => array(),
				'version' => filemtime( $script_file ),
			);
		}

		if ( file_exists( $script_file ) ) {
			wp_enqueue_script(
				'nightly-admin',
				plugin_url() . 'build/index.js',
				$asset_data['dependencies'],
				$asset_data['version'],
				true
			);
		}

		if ( file_exists( $style_file ) ) {
			wp_enqueue_style(
				'nightly-admin',
				plugin_url() . 'build/index.css',
				array(),
				filemtime( $style_file )
			);
		}

		$settings = array(
			'restUrlBase' => esc_url_raw( rest_url( REST_NAMESPACE ) ) . '/',
			'nonce' => wp_create_nonce( 'wp_rest' ),
		);

		wp_add_inline_script(
			'nightly-admin',
			'window.NIGHTLY = ' . wp_json_encode( $settings ) . ';',
			'before'
		);
	}
}
