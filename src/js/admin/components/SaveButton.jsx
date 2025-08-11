/**
 * Save Button Component - Polaris Inspired
 *
 * @package Nightly
 */

import { __ } from '@wordpress/i18n';

const SaveButton = ({
    onClick,
    disabled = false,
    loading = false,
    variant = 'primary',
    className = ''
}) => {
    const handleClick = (event) => {
        if (!disabled && !loading && onClick) {
            onClick(event);
        }
    };

    const buttonClasses = [
        'nightly-button',
        `nightly-button--${variant}`,
        loading ? 'nightly-button--loading' : '',
        disabled ? 'nightly-button--disabled' : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <button
            type="button"
            className={buttonClasses}
            onClick={handleClick}
            disabled={disabled || loading}
            aria-label={loading ? __('Saving settings...', 'nightly') : __('Save settings', 'nightly')}
        >
            {loading && (
                <span className="nightly-button__spinner" aria-hidden="true">
                    <svg
                        className="nightly-spinner-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeDasharray="31.416"
                            strokeDashoffset="31.416"
                        >
                            <animate
                                attributeName="stroke-dasharray"
                                dur="2s"
                                values="0 31.416;15.708 15.708;0 31.416;0 31.416"
                                repeatCount="indefinite"
                            />
                            <animate
                                attributeName="stroke-dashoffset"
                                dur="2s"
                                values="0;-15.708;-31.416;-31.416"
                                repeatCount="indefinite"
                            />
                        </circle>
                    </svg>
                </span>
            )}
            <span className="nightly-button__text">
                {loading ? __('Saving...', 'nightly') : __('Save Settings', 'nightly')}
            </span>
        </button>
    );
};

export default SaveButton;