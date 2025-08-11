/**
 * Block Editor Entry Point
 *
 * @package Nightly
 */

import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';


import '../../scss/block.scss';

/**
 * Register the Nightly block
 */
registerBlockType(metadata.name, {
    ...metadata,
    edit: Edit,
    save: Save,
});