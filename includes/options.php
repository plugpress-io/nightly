<?php

namespace Nightly;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Options {
	public static function defaults() : array {
		return array(
			'enabled' => true,
			'default_mode' => 'system',
			'show_toggle' => true,
			'toggle_position' => 'bottom-right',
			'toggle_style' => 'classic',
			'toggle_size' => 'm',
			'exclude_selectors' => '#wpadminbar',
			// Filter settings (relative values: -50 to +50, where 0 = no adjustment)
			'brightness' => 0,
			'contrast' => 0,
			'sepia' => 0,
			'grayscale' => 0,
			// Transition settings
			'transition_enabled' => true,
			'transition_duration' => 300,
			// Schedule settings
			'schedule_enabled' => false,
			'schedule_start' => '20:00',
			'schedule_end' => '06:00',
			// Keyboard shortcut settings
			'keyboard_enabled' => true,
			'keyboard_shortcut' => 'Ctrl+Shift+D',
			// Media brightness settings
			'image_brightness' => 100,
			'video_brightness' => 100,
			'background_brightness' => 100,
			// Theme settings
			'theme' => 'classic',
			'custom_colors' => array(
				'bg_primary' => '#000000',
				'bg_secondary' => '#0a0a0a',
				'text_primary' => '#ffffff',
				'text_secondary' => '#a0a0a0',
				'border' => '#1a1a1a',
				'accent' => '#4a9eff',
			),
		);
	}

	public static function get() : array {
		$options = get_option( OPTION_KEY, array() );
		return wp_parse_args( $options, self::defaults() );
	}

	public static function update( array $values ) : void {
		update_option( OPTION_KEY, $values, false );
	}
}
