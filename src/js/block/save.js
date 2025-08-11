/**
 * Block Save Component
 *
 * @package Nightly
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Block Save Component
 */
export default function Save({ attributes }) {
    const { buttonText, showIcon, alignment, customClassName } = attributes;

    const blockProps = useBlockProps.save({
        className: `nightly-toggle-block align-${alignment} ${customClassName}`.trim(),
    });

    return (
        <div {...blockProps}>
            <button
                className="nightly-toggle-button"
                type="button"
                role="switch"
                aria-pressed="false"
                aria-label={__('Toggle between light and dark mode (currently light mode)', 'nightly')}
                aria-keyshortcuts="Enter Space"
                tabIndex="0"
                data-nightly-toggle="true"
                data-light-text={__('Switch to dark mode', 'nightly')}
                data-dark-text={__('Switch to light mode', 'nightly')}
            >
                {showIcon && (
                    <span className="nightly-toggle-icon" aria-hidden="true">
                        <span className="nightly-icon-light">☀️</span>
                        <span className="nightly-icon-dark">🌙</span>
                    </span>
                )}
                <span className="nightly-toggle-text">
                    {buttonText}
                </span>
                <span className="screen-reader-text nightly-sr-state">
                    {__('Current theme: light', 'nightly')}
                </span>
                <span className="screen-reader-text nightly-toggle-description">
                    {__('Switches between light and dark color schemes for better readability', 'nightly')}
                </span>
            </button>
        </div>
    );
}