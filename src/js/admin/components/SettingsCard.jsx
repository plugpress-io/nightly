/**
 * SettingsCard Component
 * 
 * Clean card-based layout component for settings sections
 *
 * @package Nightly
 */

import { __ } from '@wordpress/i18n';

const SettingsCard = ({ 
    title, 
    description, 
    children, 
    loading = false,
    saving = false,
    error = null,
    className = '',
    headerActions = null
}) => {
    return (
        <div className={`relative bg-white shadow-sm rounded-lg border border-gray-200 ${className}`}>
            {/* Card Header */}
            <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <h2 className="text-lg font-medium text-gray-900">
                            {title}
                        </h2>
                        {description && (
                            <p className="mt-1 text-sm text-gray-600">
                                {description}
                            </p>
                        )}
                    </div>
                    {headerActions && (
                        <div className="ml-4 flex-shrink-0">
                            {headerActions}
                        </div>
                    )}
                </div>
            </div>

            {/* Card Content */}
            <div className="px-6 py-6">
                {/* Error State */}
                {error && (
                    <div className="mb-6 border-l-4 border-red-200 bg-red-50 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg 
                                    className="h-5 w-5 text-red-400" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    viewBox="0 0 20 20" 
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path 
                                        fillRule="evenodd" 
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
                                        clipRule="evenodd" 
                                    />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-800">
                                    {error}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Loading State */}
                {loading ? (
                    <div className="flex items-center justify-center py-8">
                        <div className="flex items-center space-x-3">
                            <svg 
                                className="animate-spin h-6 w-6 text-gray-400" 
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
                            <span className="text-sm text-gray-500">
                                {__('Loading...', 'nightly')}
                            </span>
                        </div>
                    </div>
                ) : (
                    /* Content */
                    <div className="space-y-6">
                        {children}
                    </div>
                )}

                {/* Saving Overlay */}
                {saving && (
                    <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
                        <div className="flex items-center space-x-3">
                            <svg 
                                className="animate-spin h-6 w-6 text-blue-600" 
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
                            <span className="text-sm font-medium text-gray-900">
                                {__('Saving settings...', 'nightly')}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SettingsCard;