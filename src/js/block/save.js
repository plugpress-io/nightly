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
                    <div className="nightly-toggle-switch" aria-hidden="true">
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