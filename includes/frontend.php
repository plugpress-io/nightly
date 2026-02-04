<?php

namespace Nightly;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Frontend {
	private $settings = array();

	public function register() : void {
		$this->settings = Options::get();

		// Only activate if enabled
		if ( empty( $this->settings['enabled'] ) ) {
			return;
		}

		// Check if dark mode is disabled for current post/page
		if ( $this->is_dark_mode_disabled() ) {
			return;
		}

		// Priority 0: No-flash init script (must run FIRST)
		add_action( 'wp_head', array( $this, 'inject_no_flash_script' ), 0 );

		// Enqueue CSS
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_dark_mode_css' ) );

		// Output inline CSS
		add_action( 'wp_head', array( $this, 'output_exclude_selectors_css' ), 20 );
		add_action( 'wp_head', array( $this, 'output_transition_css' ), 20 );
		add_action( 'wp_head', array( $this, 'output_media_brightness_css' ), 20 );
		add_action( 'wp_head', array( $this, 'output_custom_theme_css' ), 20 );

		// Toggle button (if enabled)
		if ( ! empty( $this->settings['show_toggle'] ) ) {
			add_action( 'wp_footer', array( $this, 'render_toggle_button' ) );
			add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_toggle_script' ) );
		}
	}

	/**
	 * Inject minified inline script to prevent flash
	 * CRITICAL: Must run at priority 0 before any paint
	 */
	public function inject_no_flash_script() : void {
		$default_mode = $this->settings['default_mode'] ?? 'system';
		$theme        = $this->settings['theme'] ?? 'classic';
		?>
<script id="nightly-init">(function(){var k='nightly_mode',th='<?php echo esc_js( $theme ); ?>',d='<?php echo esc_js( $default_mode ); ?>',s=localStorage.getItem(k),m=s||(d==='system'?(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):d);if(m==='dark'){document.documentElement.classList.add('nightly-dark');document.documentElement.setAttribute('data-theme',th);document.documentElement.style.colorScheme='dark';}else{document.documentElement.style.colorScheme='light';}})();</script>
		<?php
	}

	public function enqueue_dark_mode_css() : void {
		wp_enqueue_style(
			'nightly-dark-mode',
			plugin_url() . 'assets/css/dark-mode.css',
			array(),
			VERSION
		);
	}

	/**
	 * Output user-provided exclude selectors as inline CSS
	 */
	public function output_exclude_selectors_css() : void {
		$exclude = trim( $this->settings['exclude_selectors'] ?? '' );

		if ( empty( $exclude ) ) {
			return;
		}

		$selectors = array_filter( array_map( 'trim', explode( ',', $exclude ) ) );

		if ( empty( $selectors ) ) {
			return;
		}

		$prefixed = array_map( function( $sel ) {
			return 'html.nightly-dark ' . $sel;
		}, $selectors );

		echo '<style id="nightly-exclude">';
		echo esc_html( implode( ', ', $prefixed ) );
		echo ' { filter: invert(1) hue-rotate(180deg) !important; }';
		echo '</style>' . "\n";

		// Output custom filter settings (relative values: -50 to +50 for brightness/contrast, 0-100 for sepia/grayscale)
		$brightness = $this->settings['brightness'] ?? 0;
		$contrast = $this->settings['contrast'] ?? 0;
		$sepia = $this->settings['sepia'] ?? 0;
		$grayscale = $this->settings['grayscale'] ?? 0;

		// Only output if any filter is active (non-zero)
		if ( $brightness !== 0 || $contrast !== 0 || $sepia !== 0 || $grayscale !== 0 ) {
			// Build filter string with base inversion
			$filter_parts = array( 'invert(1)', 'hue-rotate(180deg)' );

			// Add filters only if they're non-zero
			if ( $brightness !== 0 ) {
				$filter_parts[] = sprintf( 'brightness(%s%%)', 100 + $brightness );
			}
			if ( $contrast !== 0 ) {
				$filter_parts[] = sprintf( 'contrast(%s%%)', 100 + $contrast );
			}
			if ( $sepia !== 0 ) {
				$filter_parts[] = sprintf( 'sepia(%s%%)', $sepia );
			}
			if ( $grayscale !== 0 ) {
				$filter_parts[] = sprintf( 'grayscale(%s%%)', $grayscale );
			}

			$filters = implode( ' ', $filter_parts );

			echo '<style id="nightly-filters">';
			echo 'html.nightly-dark[data-theme] { filter: ' . esc_attr( $filters ) . ' !important; }';
			echo '</style>' . "\n";
		}
	}

	/**
	 * Output smooth transition CSS if enabled
	 */
	public function output_transition_css() : void {
		$transition_enabled = $this->settings['transition_enabled'] ?? true;

		if ( ! $transition_enabled ) {
			return;
		}

		$duration = $this->settings['transition_duration'] ?? 300;

		echo '<style id="nightly-transition">';
		echo 'html { transition: filter ' . absint( $duration ) . 'ms ease, background-color ' . absint( $duration ) . 'ms ease !important; }';
		echo '</style>' . "\n";
	}

	/**
	 * Output media-specific brightness filters
	 */
	public function output_media_brightness_css() : void {
		$image_brightness = $this->settings['image_brightness'] ?? 100;
		$video_brightness = $this->settings['video_brightness'] ?? 100;
		$bg_brightness = $this->settings['background_brightness'] ?? 100;

		// Only output if any value differs from default
		if ( $image_brightness === 100 && $video_brightness === 100 && $bg_brightness === 100 ) {
			return;
		}

		echo '<style id="nightly-media">';

		// Images and picture elements
		if ( $image_brightness !== 100 ) {
			echo 'html.nightly-dark img, html.nightly-dark picture { filter: invert(1) hue-rotate(180deg) brightness(' . absint( $image_brightness ) . '%) !important; } ';
		}

		// Video elements
		if ( $video_brightness !== 100 ) {
			echo 'html.nightly-dark video { filter: invert(1) hue-rotate(180deg) brightness(' . absint( $video_brightness ) . '%) !important; } ';
		}

		// Background images
		if ( $bg_brightness !== 100 ) {
			echo 'html.nightly-dark [style*="background-image"] { filter: invert(1) hue-rotate(180deg) brightness(' . absint( $bg_brightness ) . '%) !important; } ';
		}

		echo '</style>' . "\n";
	}

	/**
	 * Output custom theme CSS variables if theme is 'custom'
	 */
	public function output_custom_theme_css() : void {
		$theme = $this->settings['theme'] ?? 'classic';

		if ( $theme !== 'custom' ) {
			return;
		}

		$colors = $this->settings['custom_colors'] ?? array();

		echo '<style id="nightly-custom-theme">';
		echo 'html.nightly-dark[data-theme="custom"] {';
		echo ' --nightly-bg-primary: ' . esc_attr( $colors['bg_primary'] ?? '#000000' ) . ';';
		echo ' --nightly-bg-secondary: ' . esc_attr( $colors['bg_secondary'] ?? '#0a0a0a' ) . ';';
		echo ' --nightly-text-primary: ' . esc_attr( $colors['text_primary'] ?? '#ffffff' ) . ';';
		echo ' --nightly-text-secondary: ' . esc_attr( $colors['text_secondary'] ?? '#a0a0a0' ) . ';';
		echo ' --nightly-border: ' . esc_attr( $colors['border'] ?? '#1a1a1a' ) . ';';
		echo ' --nightly-accent: ' . esc_attr( $colors['accent'] ?? '#4a9eff' ) . ';';
		echo ' }';
		echo '</style>' . "\n";
	}

	public function enqueue_toggle_script() : void {
		wp_enqueue_script(
			'nightly-toggle',
			plugin_url() . 'assets/js/toggle-button.js',
			array(),
			VERSION,
			true
		);

		// Pass configuration to JavaScript
		wp_localize_script(
			'nightly-toggle',
			'nightlyConfig',
			array(
				'scheduleEnabled'   => (bool) ( $this->settings['schedule_enabled'] ?? false ),
				'scheduleStart'     => $this->settings['schedule_start'] ?? '20:00',
				'scheduleEnd'       => $this->settings['schedule_end'] ?? '06:00',
				'keyboardEnabled'   => (bool) ( $this->settings['keyboard_enabled'] ?? true ),
				'keyboardShortcut'  => $this->settings['keyboard_shortcut'] ?? 'Ctrl+Shift+D',
				'theme'             => $this->settings['theme'] ?? 'classic',
			)
		);
	}

	public function render_toggle_button() : void {
		$position = $this->settings['toggle_position'] ?? 'bottom-right';
		$style = $this->settings['toggle_style'] ?? 'classic';
		$size = $this->settings['toggle_size'] ?? 'm';
		?>
<button id="nightly-toggle" class="nightly-toggle nightly-toggle-<?php echo esc_attr( $position ); ?> nightly-style-<?php echo esc_attr( $style ); ?> nightly-size-<?php echo esc_attr( $size ); ?>" aria-label="<?php esc_attr_e( 'Toggle dark mode', TEXT_DOMAIN ); ?>" type="button">
	<?php if ( $style === 'classic' ) : ?>
		<svg class="nightly-icon-light" viewBox="0 0 20 20" fill="currentColor">
			<path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path>
		</svg>
		<svg class="nightly-icon-dark" viewBox="0 0 20 20" fill="currentColor">
			<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
		</svg>
	<?php elseif ( $style === 'pill' ) : ?>
		<span class="nightly-pill-thumb">
			<svg class="nightly-icon-light" viewBox="0 0 20 20" fill="currentColor">
				<path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path>
			</svg>
			<svg class="nightly-icon-dark" viewBox="0 0 20 20" fill="currentColor">
				<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
			</svg>
		</span>
	<?php elseif ( $style === 'minimal' ) : ?>
		<svg class="nightly-icon-light" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5">
			<circle cx="10" cy="10" r="3"></circle>
			<path d="M10 1v2M10 17v2M1 10h2M17 10h2M3.5 3.5l1.5 1.5M15 15l1.5 1.5M3.5 16.5l1.5-1.5M15 5l1.5-1.5" stroke-linecap="round"></path>
		</svg>
		<svg class="nightly-icon-dark" viewBox="0 0 20 20" fill="currentColor">
			<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
		</svg>
	<?php endif; ?>
</button>
		<?php
	}

	/**
	 * Check if dark mode is disabled for the current post/page
	 */
	private function is_dark_mode_disabled() : bool {
		// Only check on singular posts/pages
		if ( ! is_singular() ) {
			return false;
		}

		$post_id = get_the_ID();
		if ( ! $post_id ) {
			return false;
		}

		$disabled = get_post_meta( $post_id, '_nightly_disable_dark_mode', true );
		return (bool) $disabled;
	}
}
