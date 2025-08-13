/**
 * Main Admin App Component
 *
 * @package Nightly
 */

import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import useSettings from '../hooks/useSettings';
import AdminHeader from './AdminHeader';
import SettingsCard from './SettingsCard';
import { PageLoadingSpinner } from './LoadingSpinner';

// Enhanced WordPress component detection and integration
const useWordPressComponents = () => {
    const [components, setComponents] = useState({
        ToggleControl: null,
        Button: null,
        Notice: null,
        available: false
    });

    useEffect(() => {
        // Check if WordPress components are available
        const wpComponents = window.wp?.components;
        
        if (wpComponents) {
            setComponents({
                ToggleControl: wpComponents.ToggleControl,
                Button: wpComponents.Button,
                Notice: wpComponents.Notice,
                available: true
            });
        } else {
            // Try dynamic import as fallback
            import('@wordpress/components')
                .then((wpComponents) => {
                    setComponents({
                        ToggleControl: wpComponents.ToggleControl,
                        Button: wpComponents.Button,
                        Notice: wpComponents.Notice,
                        available: true
                    });
                })
                .catch(() => {
                    console.warn('WordPress components not available, using enhanced fallbacks');
                    setComponents(prev => ({ ...prev, available: false }));
                });
        }
    }, []);

    return components;
};

// Enhanced fallback components with proper Tailwind styling and accessibility
const EnhancedToggleControl = ({ label, help, checked, onChange, disabled = false }) => {
    const handleKeyDown = (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            if (!disabled) {
                onChange(!checked);
            }
        }
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <label className="text-sm font-medium text-gray-900 block">
                        {label}
                    </label>
                    {help && (
                        <p className="text-xs text-gray-500 mt-1">
                            {help}
                        </p>
                    )}
                </div>
                <div className="ml-4">
                    <button
                        type="button"
                        role="switch"
                        aria-checked={checked}
                        aria-labelledby={`toggle-${label.replace(/\s+/g, '-').toLowerCase()}`}
                        className={`
                            relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
                            transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2
                            ${checked ? 'bg-blue-600' : 'bg-gray-200'}
                            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                        `}
                        onClick={() => !disabled && onChange(!checked)}
                        onKeyDown={handleKeyDown}
                        disabled={disabled}
                    >
                        <span className="sr-only">{label}</span>
                        <span
                            className={`
                                pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 
                                transition duration-200 ease-in-out
                                ${checked ? 'translate-x-5' : 'translate-x-0'}
                            `}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

const EnhancedButton = ({ children, variant = 'secondary', onClick, isBusy = false, disabled = false, className = '', ...props }) => {
    const baseClasses = `
        inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md shadow-sm 
        focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
    `;
    
    const variantClasses = {
        primary: `
            border-transparent text-white bg-blue-600 hover:bg-blue-700 
            focus:ring-blue-500 disabled:bg-blue-300
        `,
        secondary: `
            border-gray-300 text-gray-700 bg-white hover:bg-gray-50 
            focus:ring-blue-500 disabled:bg-gray-100
        `
    };

    return (
        <button
            type="button"
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            onClick={onClick}
            disabled={disabled || isBusy}
            {...props}
        >
            {isBusy && (
                <svg 
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
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
            {isBusy ? __('Loading...', 'nightly') : children}
        </button>
    );
};

// Enhanced Range Slider Component for DarkReader settings
const EnhancedRangeControl = ({ label, help, value, onChange, min = 0, max = 1, step = 0.1, disabled = false }) => {
    const percentage = ((value - min) / (max - min)) * 100;
    
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <label className="text-sm font-medium text-gray-900 block">
                        {label}
                    </label>
                    {help && (
                        <p className="text-xs text-gray-500 mt-1">
                            {help}
                        </p>
                    )}
                </div>
                <div className="ml-4 text-sm font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded">
                    {value}
                </div>
            </div>
            <div className="relative">
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(parseFloat(e.target.value))}
                    disabled={disabled}
                    className={`
                        w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                    style={{
                        background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${percentage}%, #E5E7EB ${percentage}%, #E5E7EB 100%)`
                    }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{min}</span>
                    <span>{max}</span>
                </div>
            </div>
        </div>
    );
};

const EnhancedNotice = ({ status = 'info', children, onRemove, isDismissible = true, className = '' }) => {
    const statusClasses = {
        info: 'bg-blue-50 border-blue-200 text-blue-800',
        success: 'bg-green-50 border-green-200 text-green-800',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
        error: 'bg-red-50 border-red-200 text-red-800'
    };

    const iconClasses = {
        info: 'text-blue-400',
        success: 'text-green-400',
        warning: 'text-yellow-400',
        error: 'text-red-400'
    };

    const StatusIcon = ({ status }) => {
        const iconClass = `h-5 w-5 ${iconClasses[status]}`;
        
        switch (status) {
            case 'success':
                return (
                    <svg className={iconClass} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                );
            case 'error':
                return (
                    <svg className={iconClass} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                );
            case 'warning':
                return (
                    <svg className={iconClass} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                );
            default:
                return (
                    <svg className={iconClass} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                );
        }
    };

    return (
        <div className={`rounded-md border-l-4 p-4 shadow-sm ${statusClasses[status]} ${className}`}>
            <div className="flex">
                <div className="flex-shrink-0">
                    <StatusIcon status={status} />
                </div>
                <div className="ml-3 flex-1">
                    <div className="text-sm">
                        {children}
                    </div>
                </div>
                {isDismissible && onRemove && (
                    <div className="ml-auto pl-3">
                        <button
                            type="button"
                            className={`
                                inline-flex rounded-md p-1.5 transition-colors duration-200
                                focus:outline-none focus:ring-2 focus:ring-offset-2
                                ${status === 'error' ? 'text-red-500 hover:bg-red-100 focus:ring-red-600' : ''}
                                ${status === 'warning' ? 'text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-600' : ''}
                                ${status === 'success' ? 'text-green-500 hover:bg-green-100 focus:ring-green-600' : ''}
                                ${status === 'info' ? 'text-blue-500 hover:bg-blue-100 focus:ring-blue-600' : ''}
                            `}
                            onClick={onRemove}
                            aria-label={__('Dismiss notice', 'nightly')}
                        >
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};



// Enhanced Notice Container for managing multiple notices
const NoticeContainer = ({ notices, onRemoveNotice, className = '' }) => {
    if (!notices || notices.length === 0) {
        return null;
    }

    return (
        <div className={`space-y-4 ${className}`} role="region" aria-label={__('Notifications', 'nightly')}>
            {notices.map((notice) => (
                <EnhancedNotice
                    key={notice.id}
                    status={notice.status}
                    onRemove={() => onRemoveNotice(notice.id)}
                    isDismissible={true}
                    className="animate-in slide-in-from-top-2 duration-300"
                >
                    <p className="font-medium">{notice.message}</p>
                </EnhancedNotice>
            ))}
        </div>
    );
};

const App = () => {
    // Check if this is an FSE theme (shouldn't happen, but safety check)
    const isBlockTheme = window.nightlyAdmin?.isBlockTheme || false;

    const {
        settings,
        loading,
        error,
        saving,
        saveSettings,
        clearError,
        retryLoadSettings
    } = useSettings();

    // Get WordPress components with fallback handling
    const wpComponents = useWordPressComponents();

    // Component selector - use WordPress components if available, otherwise use enhanced fallbacks
    const ToggleControl = wpComponents.available && wpComponents.ToggleControl ? wpComponents.ToggleControl : EnhancedToggleControl;
    const Button = wpComponents.available && wpComponents.Button ? wpComponents.Button : EnhancedButton;
    const Notice = wpComponents.available && wpComponents.Notice ? wpComponents.Notice : EnhancedNotice;

    const [localSettings, setLocalSettings] = useState({});
    const [hasChanges, setHasChanges] = useState(false);
    const [notices, setNotices] = useState([]);
    const [activeTab, setActiveTab] = useState('general');

    // Handle setting changes with validation
    const handleSettingChange = (key, value) => {
        try {
            // Clear any existing error notices for this setting
            setNotices(prev => prev.filter(notice => !notice.id.includes(`setting-${key}`)));
            
            // Validate the setting value
            let validatedValue = value;
            let validationError = null;
            
            switch (key) {
                case 'floating_position':
                    const validPositions = ['bottom-right', 'bottom-left', 'top-right', 'top-left'];
                    if (!validPositions.includes(value)) {
                        validationError = __('Invalid position selected. Using default position.', 'nightly');
                        validatedValue = 'bottom-right';
                    }
                    break;
                case 'auto_inject':
                case 'respect_system_preference':
                    if (typeof value !== 'boolean') {
                        validatedValue = Boolean(value);
                    }
                    break;
                case 'intensity':
                    validatedValue = Math.max(0, Math.min(1, parseFloat(value) || 0.8));
                    if (validatedValue !== value) {
                        validationError = __('Intensity must be between 0 and 1. Value adjusted.', 'nightly');
                    }
                    break;
                case 'contrast':
                    validatedValue = Math.max(0.5, Math.min(2, parseFloat(value) || 1.0));
                    if (validatedValue !== value) {
                        validationError = __('Contrast must be between 0.5 and 2. Value adjusted.', 'nightly');
                    }
                    break;
                case 'brightness':
                    validatedValue = Math.max(0.3, Math.min(1.5, parseFloat(value) || 0.9));
                    if (validatedValue !== value) {
                        validationError = __('Brightness must be between 0.3 and 1.5. Value adjusted.', 'nightly');
                    }
                    break;
                case 'sepia':
                    validatedValue = Math.max(0, Math.min(1, parseFloat(value) || 0.1));
                    if (validatedValue !== value) {
                        validationError = __('Sepia must be between 0 and 1. Value adjusted.', 'nightly');
                    }
                    break;
                case 'transition_duration':
                    validatedValue = Math.max(0, Math.min(1000, parseInt(value) || 200));
                    if (validatedValue !== value) {
                        validationError = __('Transition duration must be between 0 and 1000ms. Value adjusted.', 'nightly');
                    }
                    break;
                default:
                    break;
            }
            
            // Show validation error if any
            if (validationError) {
                addNotice(validationError, 'warning', `setting-${key}-validation`);
            }
            
            const newSettings = {
                ...localSettings,
                [key]: validatedValue
            };
            setLocalSettings(newSettings);

            // Check if there are changes from original settings
            const hasChanges = Object.keys(newSettings).some(
                settingKey => newSettings[settingKey] !== settings[settingKey]
            );
            setHasChanges(hasChanges);
            
        } catch (err) {
            console.error('Error handling setting change:', err);
            addNotice(
                __('An error occurred while updating this setting. Please try again.', 'nightly'),
                'error',
                `setting-${key}-error`
            );
        }
    };

    // Enhanced notice management
    const addNotice = (message, status = 'info', id = null) => {
        const notice = {
            id: id || Date.now().toString(),
            message,
            status,
            timestamp: Date.now()
        };
        setNotices(prev => [...prev, notice]);
        
        // Auto-dismiss success notices after 5 seconds
        if (status === 'success') {
            setTimeout(() => {
                removeNotice(notice.id);
            }, 5000);
        }
    };

    const removeNotice = (id) => {
        setNotices(prev => prev.filter(notice => notice.id !== id));
    };

    const clearAllNotices = () => {
        setNotices([]);
    };

    // Handle save with enhanced feedback
    const handleSave = async () => {
        try {
            // Clear any existing notices
            clearAllNotices();
            
            await saveSettings(localSettings);
            setHasChanges(false);
            
            // Show success message
            const successMsg = __('Settings saved successfully!', 'nightly');
            addNotice(successMsg, 'success', 'save-success');
            
        } catch (err) {
            console.error('Failed to save settings:', err);
            
            // Add error notice with more specific messaging
            let errorMsg = __('Failed to save settings. Please try again.', 'nightly');
            
            if (err.code === 'rest_forbidden') {
                errorMsg = __('You do not have permission to save these settings.', 'nightly');
            } else if (err.code === 'validation_failed') {
                errorMsg = __('Settings validation failed. Please check your input and try again.', 'nightly');
            } else if (err.message && typeof err.message === 'string') {
                errorMsg = err.message;
            }
            
            addNotice(errorMsg, 'error', 'save-error');
        }
    };

    // Tab Navigation Component
    const TabNavigation = ({ activeTab, onTabChange, disabled = false }) => {
        const tabs = [
            { key: 'general', label: __('General', 'nightly'), icon: '⚙️' },
            { key: 'design', label: __('Design', 'nightly'), icon: '🎨' }
        ];

        return (
            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            type="button"
                            onClick={() => !disabled && onTabChange(tab.key)}
                            disabled={disabled}
                            className={`
                                group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm
                                transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                                ${activeTab === tab.key
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }
                                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                            `}
                            aria-current={activeTab === tab.key ? 'page' : undefined}
                        >
                            <span className="mr-2">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>
        );
    };

    // Enhanced Position handle component with proper Tailwind styling and accessibility
    const PositionHandle = ({ currentPosition, onChange, disabled = false }) => {
        const positions = [
            { key: 'top-left', row: 0, col: 0, label: __('Top Left', 'nightly') },
            { key: 'top-right', row: 0, col: 2, label: __('Top Right', 'nightly') },
            { key: 'bottom-left', row: 2, col: 0, label: __('Bottom Left', 'nightly') },
            { key: 'bottom-right', row: 2, col: 2, label: __('Bottom Right', 'nightly') }
        ];

        const handleKeyDown = (e, position) => {
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                if (!disabled) {
                    onChange(position);
                }
            }
        };

        const handlePositionChange = (position) => {
            if (!disabled) {
                onChange(position);
            }
        };

        return (
            <div className="space-y-4">
                <fieldset className={disabled ? 'opacity-50' : ''}>
                    <legend className="text-sm font-medium text-gray-900 mb-4">
                        {__('Toggle Position', 'nightly')}
                    </legend>
                    <div className="relative">
                        {/* Enhanced visual grid representation with better styling */}
                        <div className="inline-block p-4 bg-white border-2 border-gray-200 rounded-xl shadow-sm">
                            <div className="relative">
                                {/* Grid container with proper spacing and visual hierarchy */}
                                <div className="grid grid-cols-3 grid-rows-3 gap-2 w-32 h-32 p-3 border-2 border-dashed border-gray-300 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100">
                                    {/* Screen representation label */}
                                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 font-medium">
                                        {__('Website Preview', 'nightly')}
                                    </div>
                                    
                                    {positions.map(({ key, row, col, label }) => {
                                        const isSelected = currentPosition === key;
                                        return (
                                            <button
                                                key={key}
                                                type="button"
                                                className={`
                                                    relative w-6 h-6 rounded-full border-2 transition-all duration-300 ease-in-out
                                                    focus:outline-none focus:ring-3 focus:ring-blue-500 focus:ring-offset-2
                                                    transform hover:scale-110 active:scale-95
                                                    ${isSelected 
                                                        ? 'bg-blue-600 border-blue-600 shadow-lg ring-2 ring-blue-200' 
                                                        : 'bg-white border-gray-400 hover:border-blue-500 hover:bg-blue-50 hover:shadow-md'
                                                    }
                                                    ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                                                `}
                                                style={{ 
                                                    gridRow: row + 1, 
                                                    gridColumn: col + 1 
                                                }}
                                                onClick={() => handlePositionChange(key)}
                                                onKeyDown={(e) => handleKeyDown(e, key)}
                                                disabled={disabled}
                                                aria-label={`${label} ${isSelected ? __('(currently selected)', 'nightly') : ''}`}
                                                aria-pressed={isSelected}
                                                title={label}
                                            >
                                                {/* Selection indicator dot */}
                                                {isSelected && (
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                                    </div>
                                                )}
                                                
                                                {/* Hover indicator ring */}
                                                <div className={`
                                                    absolute inset-0 rounded-full border-2 border-transparent
                                                    transition-all duration-200
                                                    ${!isSelected && !disabled ? 'hover:border-blue-300' : ''}
                                                `} />
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        
                        {/* Enhanced current selection indicator with better styling */}
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-blue-600 rounded-full flex-shrink-0" />
                                <div className="text-sm">
                                    <span className="text-gray-700">{__('Current position:', 'nightly')}</span>
                                    <span className="font-semibold text-blue-900 ml-1">
                                        {positions.find(p => p.key === currentPosition)?.label || currentPosition}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Enhanced help text with better formatting */}
                    <div className="mt-3 p-2 bg-gray-50 rounded-md">
                        <p className="text-xs text-gray-600 leading-relaxed">
                            <span className="font-medium">{__('Tip:', 'nightly')}</span> {__('Click any corner position to place the floating dark mode toggle on your website. The toggle will appear in the same position on all pages.', 'nightly')}
                        </p>
                    </div>
                </fieldset>
            </div>
        );
    };

    if (isBlockTheme) {
        return (
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <AdminHeader
                    hasChanges={hasChanges}
                    saving={saving}
                    onSave={handleSave}
                    themeType="fse"
                />

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="space-y-6">
                        {/* FSE Theme Notice */}
                        <Notice status="info" isDismissible={false}>
                            <div>
                                <p className="font-medium">{__('FSE Theme Detected', 'nightly')}</p>
                                <p className="mt-1">
                                    {__('You can use the Nightly block in the block editor for page-specific toggles, or configure a global floating toggle below.', 'nightly')}
                                </p>
                            </div>
                        </Notice>

                        {/* Enhanced Notice Container */}
                        <NoticeContainer 
                            notices={notices} 
                            onRemoveNotice={removeNotice}
                        />

                        {/* Legacy Error Notice (for API errors) */}
                        {error && !notices.some(n => n.status === 'error') && (
                            <Notice 
                                status="error" 
                                onRemove={clearError}
                                isDismissible={true}
                            >
                                <p className="font-medium">{error}</p>
                            </Notice>
                        )}

                        {/* Settings Card with Tabs */}
                        <SettingsCard
                            title={__('Dark Mode Configuration', 'nightly')}
                            description={__('Configure global dark mode settings for your FSE theme.', 'nightly')}
                            loading={false}
                            saving={saving}
                            error={null}
                        >
                            {/* Tab Navigation */}
                            <TabNavigation
                                activeTab={activeTab}
                                onTabChange={setActiveTab}
                                disabled={saving}
                            />

                            {/* General Tab */}
                            {activeTab === 'general' && (
                                <div className="space-y-6">
                                    <ToggleControl
                                        label={__('Enable floating toggle', 'nightly')}
                                        help={__('Add a floating toggle button that appears on all pages', 'nightly')}
                                        checked={localSettings.auto_inject || false}
                                        onChange={(value) => handleSettingChange('auto_inject', value)}
                                        disabled={saving}
                                    />

                                    {/* Position Handle */}
                                    {localSettings.auto_inject && (
                                        <PositionHandle
                                            currentPosition={localSettings.floating_position || 'bottom-right'}
                                            onChange={(value) => handleSettingChange('floating_position', value)}
                                            disabled={saving}
                                        />
                                    )}

                                    <ToggleControl
                                        label={__('System aware', 'nightly')}
                                        help={__('Automatically detect and use the user\'s system dark mode preference', 'nightly')}
                                        checked={localSettings.respect_system_preference !== false}
                                        onChange={(value) => handleSettingChange('respect_system_preference', value)}
                                        disabled={saving}
                                    />

                                    <EnhancedRangeControl
                                        label={__('Transition Duration', 'nightly')}
                                        help={__('How fast the dark mode transition animation should be (in milliseconds)', 'nightly')}
                                        value={localSettings.transition_duration || 200}
                                        onChange={(value) => handleSettingChange('transition_duration', value)}
                                        min={0}
                                        max={1000}
                                        step={50}
                                        disabled={saving}
                                    />
                                </div>
                            )}

                            {/* Design Tab */}
                            {activeTab === 'design' && (
                                <div className="space-y-6">
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <h3 className="text-sm font-medium text-blue-800">
                                                    {__('DarkReader-Inspired Design Controls', 'nightly')}
                                                </h3>
                                                <div className="mt-2 text-sm text-blue-700">
                                                    <p>{__('These settings control how dark mode is applied to your website. The plugin now uses a DarkReader-inspired approach that works universally with any theme.', 'nightly')}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <EnhancedRangeControl
                                        label={__('Dark Mode Intensity', 'nightly')}
                                        help={__('Controls how dark the dark mode appears. Higher values create a darker appearance.', 'nightly')}
                                        value={localSettings.intensity || 0.8}
                                        onChange={(value) => handleSettingChange('intensity', value)}
                                        min={0}
                                        max={1}
                                        step={0.05}
                                        disabled={saving}
                                    />

                                    <EnhancedRangeControl
                                        label={__('Contrast', 'nightly')}
                                        help={__('Adjusts the contrast in dark mode. Higher values increase contrast for better readability.', 'nightly')}
                                        value={localSettings.contrast || 1.0}
                                        onChange={(value) => handleSettingChange('contrast', value)}
                                        min={0.5}
                                        max={2.0}
                                        step={0.1}
                                        disabled={saving}
                                    />

                                    <EnhancedRangeControl
                                        label={__('Brightness', 'nightly')}
                                        help={__('Controls the overall brightness in dark mode. Lower values create a dimmer appearance.', 'nightly')}
                                        value={localSettings.brightness || 0.9}
                                        onChange={(value) => handleSettingChange('brightness', value)}
                                        min={0.3}
                                        max={1.5}
                                        step={0.05}
                                        disabled={saving}
                                    />

                                    <EnhancedRangeControl
                                        label={__('Sepia Tone', 'nightly')}
                                        help={__('Adds a warm sepia tone to dark mode for a more comfortable reading experience.', 'nightly')}
                                        value={localSettings.sepia || 0.1}
                                        onChange={(value) => handleSettingChange('sepia', value)}
                                        min={0}
                                        max={1}
                                        step={0.05}
                                        disabled={saving}
                                    />

                                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                        <h4 className="text-sm font-medium text-gray-900 mb-2">
                                            {__('Preview Tips', 'nightly')}
                                        </h4>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            <li>• {__('Changes are applied immediately when you save settings', 'nightly')}</li>
                                            <li>• {__('Visit your website in dark mode to see the effects', 'nightly')}</li>
                                            <li>• {__('Recommended: Intensity 0.8, Contrast 1.0, Brightness 0.9, Sepia 0.1', 'nightly')}</li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </SettingsCard>
                    </div>
                </div>
            </div>
        );
    }

    // Update local settings when API settings change
    useEffect(() => {
        if (settings) {
            setLocalSettings(settings);
            setHasChanges(false);
        }
    }, [settings]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <PageLoadingSpinner text={__('Loading your settings...', 'nightly')} />
                    <p className="mt-4 text-sm text-gray-600">
                        {__('This should only take a moment', 'nightly')}
                    </p>
                </div>
            </div>
        );
    }

    // Show error state with retry option if loading failed
    if (error && !settings) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="max-w-md w-full mx-auto text-center">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            {__('Unable to Load Settings', 'nightly')}
                        </h3>
                        <p className="text-sm text-gray-600 mb-6">
                            {error}
                        </p>
                        <div className="space-y-3">
                            <Button
                                variant="primary"
                                onClick={retryLoadSettings}
                                className="w-full"
                            >
                                {__('Try Again', 'nightly')}
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => window.location.reload()}
                                className="w-full"
                            >
                                {__('Refresh Page', 'nightly')}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <AdminHeader
                hasChanges={hasChanges}
                saving={saving}
                onSave={handleSave}
                themeType="classic"
            />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="space-y-6">
                    {/* Enhanced Notice Container */}
                    <NoticeContainer 
                        notices={notices} 
                        onRemoveNotice={removeNotice}
                    />

                    {/* Legacy Error Notice (for API errors) */}
                    {error && !notices.some(n => n.status === 'error') && (
                        <Notice 
                            status="error" 
                            onRemove={clearError}
                            isDismissible={true}
                        >
                            <p className="font-medium">{error}</p>
                        </Notice>
                    )}

                    {/* Settings Card with Tabs */}
                    <SettingsCard
                        title={__('Dark Mode Configuration', 'nightly')}
                        description={__('Configure how dark mode appears and behaves on your classic theme.', 'nightly')}
                        loading={false}
                        saving={saving}
                        error={null}
                    >
                        {/* Tab Navigation */}
                        <TabNavigation
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                            disabled={saving}
                        />

                        {/* General Tab */}
                        {activeTab === 'general' && (
                            <div className="space-y-6">
                                <ToggleControl
                                    label={__('Auto-inject floating toggle', 'nightly')}
                                    help={__('Automatically add a floating toggle button for classic themes', 'nightly')}
                                    checked={localSettings.auto_inject || false}
                                    onChange={(value) => handleSettingChange('auto_inject', value)}
                                    disabled={saving}
                                />

                                {/* Position Handle */}
                                {localSettings.auto_inject && (
                                    <PositionHandle
                                        currentPosition={localSettings.floating_position || 'bottom-right'}
                                        onChange={(value) => handleSettingChange('floating_position', value)}
                                        disabled={saving}
                                    />
                                )}

                                <ToggleControl
                                    label={__('System aware', 'nightly')}
                                    help={__('Automatically detect and use the user\'s system dark mode preference', 'nightly')}
                                    checked={localSettings.respect_system_preference !== false}
                                    onChange={(value) => handleSettingChange('respect_system_preference', value)}
                                    disabled={saving}
                                />

                                <EnhancedRangeControl
                                    label={__('Transition Duration', 'nightly')}
                                    help={__('How fast the dark mode transition animation should be (in milliseconds)', 'nightly')}
                                    value={localSettings.transition_duration || 200}
                                    onChange={(value) => handleSettingChange('transition_duration', value)}
                                    min={0}
                                    max={1000}
                                    step={50}
                                    disabled={saving}
                                />
                            </div>
                        )}

                        {/* Design Tab */}
                        {activeTab === 'design' && (
                            <div className="space-y-6">
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium text-blue-800">
                                                {__('DarkReader-Inspired Design Controls', 'nightly')}
                                            </h3>
                                            <div className="mt-2 text-sm text-blue-700">
                                                <p>{__('These settings control how dark mode is applied to your website. The plugin now uses a DarkReader-inspired approach that works universally with any theme.', 'nightly')}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <EnhancedRangeControl
                                    label={__('Dark Mode Intensity', 'nightly')}
                                    help={__('Controls how dark the dark mode appears. Higher values create a darker appearance.', 'nightly')}
                                    value={localSettings.intensity || 0.8}
                                    onChange={(value) => handleSettingChange('intensity', value)}
                                    min={0}
                                    max={1}
                                    step={0.05}
                                    disabled={saving}
                                />

                                <EnhancedRangeControl
                                    label={__('Contrast', 'nightly')}
                                    help={__('Adjusts the contrast in dark mode. Higher values increase contrast for better readability.', 'nightly')}
                                    value={localSettings.contrast || 1.0}
                                    onChange={(value) => handleSettingChange('contrast', value)}
                                    min={0.5}
                                    max={2.0}
                                    step={0.1}
                                    disabled={saving}
                                />

                                <EnhancedRangeControl
                                    label={__('Brightness', 'nightly')}
                                    help={__('Controls the overall brightness in dark mode. Lower values create a dimmer appearance.', 'nightly')}
                                    value={localSettings.brightness || 0.9}
                                    onChange={(value) => handleSettingChange('brightness', value)}
                                    min={0.3}
                                    max={1.5}
                                    step={0.05}
                                    disabled={saving}
                                />

                                <EnhancedRangeControl
                                    label={__('Sepia Tone', 'nightly')}
                                    help={__('Adds a warm sepia tone to dark mode for a more comfortable reading experience.', 'nightly')}
                                    value={localSettings.sepia || 0.1}
                                    onChange={(value) => handleSettingChange('sepia', value)}
                                    min={0}
                                    max={1}
                                    step={0.05}
                                    disabled={saving}
                                />

                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                                        {__('Preview Tips', 'nightly')}
                                    </h4>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        <li>• {__('Changes are applied immediately when you save settings', 'nightly')}</li>
                                        <li>• {__('Visit your website in dark mode to see the effects', 'nightly')}</li>
                                        <li>• {__('Recommended: Intensity 0.8, Contrast 1.0, Brightness 0.9, Sepia 0.1', 'nightly')}</li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </SettingsCard>
                </div>
            </div>
        </div>
    );
};

export default App;