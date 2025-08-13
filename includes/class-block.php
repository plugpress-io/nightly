<?php
/**
 * Block Registration Class
 *
 * @package Nightly
 */

namespace Nightly;

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Handles Gutenberg block registration and functionality
 */
class Block {
    
    /**
     * Initialize block functionality
     */
    public function init() {
        add_action('init', array($this, 'register_block'));
        add_action('enqueue_block_editor_assets', array($this, 'enqueue_block_editor_assets'));
    }
    
    /**
     * Register the Nightly block
     */
    public function register_block() {
        // Register the block type
        register_block_type('nightly/toggle', array(
            'render_callback' => array($this, 'render_block'),
            'attributes' => array(
                'buttonText' => array(
                    'type' => 'string',
                    'default' => __('Toggle Dark Mode', 'nightly')
                ),
                'showIcon' => array(
                    'type' => 'boolean',
                    'default' => true
                ),
                'alignment' => array(
                    'type' => 'string',
                    'default' => 'left'
                ),
                'customClassName' => array(
                    'type' => 'string',
                    'default' => ''
                )
            )
        ));
    }
    
    /**
     * Enqueue block editor assets
     */
    public function enqueue_block_editor_assets() {
        // Get file modification time for cache busting
        $js_file = NIGHTLY_PLUGIN_DIR . 'build/block/index.js';
        $css_file = NIGHTLY_PLUGIN_DIR . 'build/block/index.css';
        
        $js_version = file_exists($js_file) ? filemtime($js_file) : NIGHTLY_VERSION;
        $css_version = file_exists($css_file) ? filemtime($css_file) : NIGHTLY_VERSION;
        
        // Enqueue block editor script
        wp_enqueue_script(
            'nightly-block-editor',
            NIGHTLY_PLUGIN_URL . 'build/block/index.js',
            array('wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n'),
            $js_version,
            true
        );
        
        // Enqueue block editor styles
        $css_file = NIGHTLY_PLUGIN_DIR . 'build/block/index.css';
        if (file_exists($css_file)) {
            wp_enqueue_style(
                'nightly-block-editor',
                NIGHTLY_PLUGIN_URL . 'build/block/index.css',
                array(),
                $css_version
            );
        }
    }

    /**
     * Render the block on the frontend
     *
     * @param array $attributes Block attributes
     * @param string $content Block content
     * @return string Rendered block HTML
     */
    public function render_block($attributes, $content) {
        // Extract attributes with defaults
        $button_text = isset($attributes['buttonText']) ? $attributes['buttonText'] : __('Toggle Dark Mode', 'nightly');
        $show_icon = isset($attributes['showIcon']) ? $attributes['showIcon'] : true;
        $alignment = isset($attributes['alignment']) ? $attributes['alignment'] : 'left';
        $custom_class = isset($attributes['customClassName']) ? $attributes['customClassName'] : '';

        // Build CSS classes
        $classes = array(
            'nightly-toggle-block',
            'align-' . esc_attr($alignment)
        );
        
        if (!empty($custom_class)) {
            $classes[] = esc_attr($custom_class);
        }

        // Build the HTML
        ob_start();
        ?>
        <div class="<?php echo esc_attr(implode(' ', $classes)); ?>">
            <button
                class="nightly-toggle-button"
                type="button"
                aria-pressed="false"
                aria-label="<?php esc_attr_e('Toggle between light and dark mode', 'nightly'); ?>"
                data-nightly-toggle="true"
            >
                <?php if ($show_icon) : ?>
                    <span class="nightly-toggle-switch" aria-hidden="true">
                        <span class="nightly-toggle-track">
                            <span class="nightly-toggle-thumb">
                                <svg class="nightly-icon nightly-icon-sun" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2"/>
                                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 6.34L4.93 4.93M19.07 19.07l-1.41-1.41" stroke="currentColor" stroke-width="2"/>
                                </svg>
                                <svg class="nightly-icon nightly-icon-moon" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" fill="currentColor"/>
                                </svg>
                            </span>
                        </span>
                    </span>
                <?php endif; ?>
                <span class="nightly-toggle-text">
                    <?php echo esc_html($button_text); ?>
                </span>
                <span class="screen-reader-text nightly-sr-state">
                    <?php esc_html_e('Current theme: light', 'nightly'); ?>
                </span>
            </button>
        </div>
        <?php
        return ob_get_clean();
    }
}