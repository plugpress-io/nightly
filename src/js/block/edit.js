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
                        <div className={`nightly-toggle-switch ${isToggled ? 'is-checked' : ''}`} aria-hidden="true">
                            <div className="nightly-toggle-track">
                                <div className="nightly-toggle-thumb">
                                    <svg className="nightly-icon nightly-icon-sun" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
                                        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 6.34L4.93 4.93M19.07 19.07l-1.41-1.41" stroke="currentColor" strokeWidth="2"/>
                                    </svg>
                                    <svg className="nightly-icon nightly-icon-moon" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" fill="currentColor"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
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