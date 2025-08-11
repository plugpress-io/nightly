/**
 * Custom Toggle Component - Polaris Inspired
 *
 * @package Nightly
 */

import { useRef } from '@wordpress/element';

const Toggle = ({
    checked = false,
    onChange,
    disabled = false,
    ariaLabel,
    className = ''
}) => {
    const toggleRef = useRef(null);

    const handleClick = () => {
        if (!disabled && onChange) {
            onChange(!checked);
        }
    };

    const handleKeyDown = (event) => {
        if (!disabled && (event.key === ' ' || event.key === 'Enter')) {
            event.preventDefault();
            onChange(!checked);
        }
    };

    const toggleClasses = [
        'nightly-toggle',
        checked ? 'nightly-toggle--checked' : '',
        disabled ? 'nightly-toggle--disabled' : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <button
            ref={toggleRef}
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={ariaLabel || `Toggle switch, currently ${checked ? 'on' : 'off'}`}
            aria-keyshortcuts="Enter Space"
            className={toggleClasses}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            tabIndex={disabled ? -1 : 0}
        >
            <span className="nightly-toggle__track" aria-hidden="true">
                <span className="nightly-toggle__thumb" />
            </span>
            <span className="nightly-toggle__label" aria-hidden="true">
                {checked ? 'On' : 'Off'}
            </span>
            <span className="screen-reader-text">
                {checked ? 'Currently enabled' : 'Currently disabled'}
            </span>
        </button>
    );
};

export default Toggle;