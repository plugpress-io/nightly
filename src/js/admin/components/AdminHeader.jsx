/**
 * AdminHeader Component
 * 
 * Modern header component with proper branding and save functionality
 *
 * @package Nightly
 */

import { __ } from '@wordpress/i18n';

const AdminHeader = ({ 
    hasChanges = false, 
    saving = false, 
    onSave, 
    themeType = 'classic',
    version = '1.0.0'
}) => {
    // Theme type badge configuration
    const themeConfig = {
        classic: {
            label: __('Classic', 'nightly'),
            className: 'bg-green-100 text-green-800'
        },
        fse: {
            label: __('FSE', 'nightly'),
            className: 'bg-blue-100 text-blue-800'
        }
    };

    return (
        <div className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-6">
                    {/* Left side - Branding */}
                    <div className="flex items-center space-x-3">
                        <h1 className="text-2xl font-bold text-gray-900">
                            {__('Nightly', 'nightly')}
                        </h1>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            v{version}
                        </span>
                    </div>

                    {/* Right side - Save functionality */}
                    <div className="flex items-center space-x-4">
                        {/* Unsaved changes indicator */}
                        {hasChanges && (
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                                <span className="text-sm text-amber-600 font-medium">
                                    {__('Unsaved changes', 'nightly')}
                                </span>
                            </div>
                        )}

                        {/* Save button */}
                        <button
                            type="button"
                            onClick={onSave}
                            disabled={!hasChanges || saving}
                            className={`
                                inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm 
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200
                                ${hasChanges && !saving
                                    ? 'text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
                                    : 'text-gray-400 bg-gray-100 cursor-not-allowed'
                                }
                            `}
                            aria-label={saving ? __('Saving settings...', 'nightly') : __('Save settings', 'nightly')}
                        >
                            {/* Loading spinner */}
                            {saving && (
                                <svg 
                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" 
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
                            )}
                            
                            {/* Button text */}
                            {saving ? __('Saving...', 'nightly') : __('Save Settings', 'nightly')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHeader;