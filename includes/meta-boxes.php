<?php

namespace Nightly;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Meta_Boxes {
	public function register() : void {
		add_action( 'add_meta_boxes', array( $this, 'register_meta_box' ) );
		add_action( 'save_post', array( $this, 'save_meta_box' ) );
		add_action( 'init', array( $this, 'register_post_meta' ) );
	}

	public function register_meta_box() : void {
		$post_types = apply_filters( 'nightly_post_types', array( 'post', 'page' ) );

		add_meta_box(
			'nightly_dark_mode_control',
			__( 'Dark Mode Settings', TEXT_DOMAIN ),
			array( $this, 'render_meta_box' ),
			$post_types,
			'side',
			'default'
		);
	}

	public function register_post_meta() : void {
		$post_types = apply_filters( 'nightly_post_types', array( 'post', 'page' ) );

		foreach ( $post_types as $post_type ) {
			register_post_meta(
				$post_type,
				'_nightly_disable_dark_mode',
				array(
					'type'              => 'boolean',
					'single'            => true,
					'default'           => false,
					'show_in_rest'      => true,
					'auth_callback'     => function() {
						return current_user_can( 'edit_posts' );
					},
					'sanitize_callback' => function( $value ) {
						return (bool) $value;
					},
				)
			);
		}
	}

	public function render_meta_box( $post ) : void {
		wp_nonce_field( 'nightly_meta_box', 'nightly_meta_nonce' );

		$disabled = get_post_meta( $post->ID, '_nightly_disable_dark_mode', true );
		?>
		<div style="padding: 10px 0;">
			<label style="display: flex; align-items: flex-start; gap: 8px;">
				<input
					type="checkbox"
					name="nightly_disable_dark_mode"
					value="1"
					<?php checked( $disabled, '1' ); ?>
					style="margin-top: 2px;"
				/>
				<span>
					<?php esc_html_e( 'Disable dark mode for this content', TEXT_DOMAIN ); ?>
				</span>
			</label>
			<p class="description" style="margin: 8px 0 0 26px;">
				<?php esc_html_e( 'When enabled, dark mode will not be applied to this post/page.', TEXT_DOMAIN ); ?>
			</p>
		</div>
		<?php
	}

	public function save_meta_box( $post_id ) : void {
		// Verify nonce
		if ( ! isset( $_POST['nightly_meta_nonce'] ) ||
			! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['nightly_meta_nonce'] ) ), 'nightly_meta_box' ) ) {
			return;
		}

		// Check autosave
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return;
		}

		// Check permissions
		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return;
		}

		// Save meta value
		$disabled = isset( $_POST['nightly_disable_dark_mode'] ) ? '1' : '';
		update_post_meta( $post_id, '_nightly_disable_dark_mode', $disabled );
	}
}
