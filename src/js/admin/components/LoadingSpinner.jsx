/**
 * LoadingSpinner Component
 * 
 * Reusable loading spinner with various sizes and styles
 *
 * @package Nightly
 */

import { __ } from '@wordpress/i18n';

const LoadingSpinner = ({ 
    size = 'medium', 
    text = null, 
    className = '',
    centered = false,
    inline = false
}) => {
    // Size configurations
    const sizeClasses = {
        small: 'h-4 w-4',
        medium: 'h-6 w-6',
        large: 'h-8 w-8',
        xlarge: 'h-12 w-12'
    };

    const textSizeClasses = {
        small: 'text-xs',
        medium: 'text-sm',
        large: 'text-base',
        xlarge: 'text-lg'
    };

    const spinnerSize = sizeClasses[size] || sizeClasses.medium;
    const textSize = textSizeClasses[size] || textSizeClasses.medium;

    // Container classes
    const containerClasses = [
        inline ? 'inline-flex' : 'flex',
        'items-center',
        'space-x-3',
        centered && !inline ? 'justify-center' : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={containerClasses} role="status" aria-live="polite">
            {/* Spinner SVG */}
            <svg 
                className={`animate-spin ${spinnerSize} text-gray-400`}
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                />
                <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
            </svg>

            {/* Loading text */}
            {text && (
                <span className={`${textSize} text-gray-500 font-medium`}>
                    {text}
                </span>
            )}

            {/* Screen reader text */}
            <span className="sr-only">
                {text || __('Loading...', 'nightly')}
            </span>
        </div>
    );
};

// Preset loading states for common use cases
export const PageLoadingSpinner = ({ text = null }) => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner 
            size="large" 
            text={text || __('Loading page...', 'nightly')}
            centered={true}
        />
    </div>
);

export const CardLoadingSpinner = ({ text = null }) => (
    <div className="flex items-center justify-center py-12">
        <LoadingSpinner 
            size="medium" 
            text={text || __('Loading...', 'nightly')}
            centered={true}
        />
    </div>
);

export const ButtonLoadingSpinner = ({ text = null }) => (
    <LoadingSpinner 
        size="small" 
        text={text}
        inline={true}
    />
);

export default LoadingSpinner;