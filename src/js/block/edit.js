/**
 * Block Editor Component
 *
 * @package Nightly
 */

import { __ } from '@wordpress/i18n';
import { 
    useBlockProps,
    InspectorControls,
    BlockControls,
    AlignmentToolbar
} from '@wordpress/block-editor';
import {
    PanelBody,
    TextControl,
    ToggleControl,
    Button
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';

/**
 * Block Edit Component
 */
export default function Edit({ attributes, setAttributes }) {
    const { buttonText, showIcon, alignment, customClassName } = attributes;
    const [isToggled, setIsToggled] = useState(false);

    const blockProps = useBlockProps({
        className: `nightly-toggle-block align-${alignment} ${customClassName}`.trim(),
    });

    // Simulate toggle functionality in editor
    const handleEditorToggle = () => {
        setIsToggled(!isToggled);
    };

    // Update alignment
    const onChangeAlignment = (newAlignment) => {
        setAttributes({ alignment: newAlignment });
    };

    // Update button text
    const onChangeButtonText = (newText) => {
        setAttributes({ buttonText: newText });
    };

    // Update icon visibility
    const onChangeShowIcon = (newShowIcon) => {
        setAttributes({ showIcon: newShowIcon });
    };

    return (
        <>
            <BlockControls>
                <AlignmentToolbar
                    value={alignment}
                    onChange={onChangeAlignment}
                />
            </BlockControls>

            <InspectorControls>
                <PanelBody title={__('Toggle Settings', 'nightly')} initialOpen={true}>
                    <TextControl
                        label={__('Button Text', 'nightly')}
                        value={buttonText}
                        onChange={onChangeButtonText}
                        help={__('Text displayed on the toggle button', 'nightly')}
                    />
                    <ToggleControl
                        label={__('Show Icon', 'nightly')}
                        checked={showIcon}
                        onChange={onChangeShowIcon}
                        help={__('Display an icon alongside the button text', 'nightly')}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <Button
                    className={`nightly-toggle-button ${isToggled ? 'is-toggled' : ''}`}
                    onClick={handleEditorToggle}
                    role="switch"
                    aria-pressed={isToggled}
                    aria-label={__('Toggle dark mode preview (currently %s mode)', 'nightly').replace('%s', isToggled ? 'dark' : 'light')}
                    aria-keyshortcuts="Enter Space"
                    tabIndex="0"
                >
                    {showIcon && (
                        <span className="nightly-toggle-icon" aria-hidden="true">
                            {isToggled ? '🌙' : '☀️'}
                        </span>
                    )}
                    <span className="nightly-toggle-text">
                        {buttonText}
                    </span>
                    <span className="screen-reader-text">
                        {__('Editor preview - actual functionality available on frontend', 'nightly')}
                    </span>
                </Button>
                <div className="nightly-editor-notice" role="note" aria-live="polite">
                    <small>{__('Preview only - actual toggle will work on frontend', 'nightly')}</small>
                </div>
            </div>
        </>
    );
}