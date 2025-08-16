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
class Block
{

    /**
     * Initialize block functionality
     */
    public function init()
    {
        add_action('init', array($this, 'register_block'));
        add_action('enqueue_block_editor_assets', array($this, 'enqueue_block_editor_assets'));
        add_action('enqueue_block_editor_assets', array($this, 'add_navigation_support'));
    }

    /**
     * Register the Nightly block
     */
    public function register_block()
    {
        // Register the block type using the block.json file
        register_block_type(NIGHTLY_PLUGIN_DIR . 'build/js/block/block.json');
    }

    /**
     * Enqueue block editor assets
     */
    public function enqueue_block_editor_assets()
    {
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
     * Add navigation support for the Nightly block
     */
    public function add_navigation_support()
    {
        wp_add_inline_script('wp-blocks', "
            (function({ addFilter }) {
                addFilter(
                    'blocks.registerBlockType',
                    'nightly/extend-nav-children',
                    (settings, name) => {
                        if (name !== 'core/navigation') return settings;

                        const extra = 'nightly/toggle';
                        const current = settings.allowedBlocks || [];
                        if (current.includes(extra)) return settings;

                        return { ...settings, allowedBlocks: [...current, extra] };
                    }
                );
            })(window.wp.hooks);
        ");
    }
}
