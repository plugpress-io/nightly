/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/admin/components/AdminHeader.jsx":
/*!*************************************************!*\
  !*** ./src/js/admin/components/AdminHeader.jsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);


const AdminHeader = () => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "w-full border-b border-gray-100"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "mx-auto flex items-center justify-between px-6 py-3"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex items-center gap-3"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "text-lg font-semibold text-gray-900"
  }, "Nightly")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex items-center gap-6"
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AdminHeader);

/***/ }),

/***/ "./src/js/admin/components/App.jsx":
/*!*****************************************!*\
  !*** ./src/js/admin/components/App.jsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _hooks_useSettings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../hooks/useSettings */ "./src/js/admin/hooks/useSettings.js");
/* harmony import */ var _AdminHeader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./AdminHeader */ "./src/js/admin/components/AdminHeader.jsx");
/* harmony import */ var _SaveButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SaveButton */ "./src/js/admin/components/SaveButton.jsx");
/* harmony import */ var _TabNavigation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./TabNavigation */ "./src/js/admin/components/TabNavigation.jsx");
/* harmony import */ var _GeneralTab__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./GeneralTab */ "./src/js/admin/components/GeneralTab.jsx");
/* harmony import */ var _DesignTab__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./DesignTab */ "./src/js/admin/components/DesignTab.jsx");
/* harmony import */ var _PreviewPanel__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./PreviewPanel */ "./src/js/admin/components/PreviewPanel.jsx");











const App = () => {
  const {
    settings,
    loading,
    error,
    saving,
    saveSettings,
    clearError
  } = (0,_hooks_useSettings__WEBPACK_IMPORTED_MODULE_4__["default"])();
  const [localSettings, setLocalSettings] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)({});
  const [hasChanges, setHasChanges] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [activeTab, setActiveTab] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('general');

  // Update local settings when API settings change
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (settings) {
      // Ensure mode has a default value
      const settingsWithDefaults = {
        ...settings,
        mode: settings.mode || 'manual'
      };
      setLocalSettings(settingsWithDefaults);
      setHasChanges(false);
    }
  }, [settings]);

  // Handle setting changes
  const handleSettingChange = (key, value) => {
    const newSettings = {
      ...localSettings,
      [key]: value
    };
    setLocalSettings(newSettings);

    // Check if there are changes from original settings
    const hasChanges = Object.keys(newSettings).some(settingKey => newSettings[settingKey] !== settings[settingKey]);
    setHasChanges(hasChanges);
  };

  // Handle save
  const handleSave = async () => {
    try {
      await saveSettings(localSettings);
      setHasChanges(false);
    } catch (err) {
      console.error('Failed to save settings:', err);
    }
  };
  if (loading) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "flex flex-col items-center justify-center min-h-screen space-y-4"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Spinner, null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      className: "text-gray-600"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Loading settings...', 'nightly')));
  }
  if (error && !settings) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "p-6"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Notice, {
      status: "error",
      isDismissible: false
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, error)));
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "min-h-screen bg-gray-50"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_AdminHeader__WEBPACK_IMPORTED_MODULE_5__["default"], {
    hasChanges: hasChanges,
    saving: saving,
    onSave: handleSave,
    version: "1.0.0"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "w-full max-w-[908px] mx-auto p-6"
  }, error && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "mb-6"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Notice, {
    status: "error",
    onRemove: clearError
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, error))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "mb-6"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex items-center justify-between"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", {
    className: "text-2xl font-semibold text-gray-900"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Dark Mode Settings', 'nightly')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_SaveButton__WEBPACK_IMPORTED_MODULE_6__["default"], {
    onClick: handleSave,
    disabled: !hasChanges || saving,
    loading: saving
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_TabNavigation__WEBPACK_IMPORTED_MODULE_7__["default"], {
    activeTab: activeTab,
    onTabChange: setActiveTab,
    saving: saving
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "lg:col-span-2"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bg-white rounded-b-sm rounded-t-none shadow-sm border border-gray-200 border-t-0"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "p-6"
  }, activeTab === 'general' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_GeneralTab__WEBPACK_IMPORTED_MODULE_8__["default"], {
    localSettings: localSettings,
    handleSettingChange: handleSettingChange,
    saving: saving
  }), activeTab === 'design' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DesignTab__WEBPACK_IMPORTED_MODULE_9__["default"], {
    localSettings: localSettings,
    handleSettingChange: handleSettingChange,
    saving: saving
  })))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_PreviewPanel__WEBPACK_IMPORTED_MODULE_10__["default"], {
    localSettings: localSettings
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);

/***/ }),

/***/ "./src/js/admin/components/DesignTab.jsx":
/*!***********************************************!*\
  !*** ./src/js/admin/components/DesignTab.jsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);



// Clean Color Picker Component
const ColorPicker = ({
  label,
  value,
  onChange,
  help,
  disabled = false
}) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
  className: "space-y-2"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
  className: "flex items-center justify-between"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
  className: "text-sm font-medium text-gray-700"
}, label), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
  className: "flex items-center space-x-2"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
  className: "w-6 h-6 rounded border border-gray-300",
  style: {
    backgroundColor: value
  }
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
  className: "px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded font-mono"
}, value))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
  type: "color",
  value: value,
  onChange: e => onChange(e.target.value),
  disabled: disabled,
  className: "w-full h-10 rounded border border-gray-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
}), help && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
  className: "text-xs text-gray-500"
}, help));
const DesignTab = ({
  localSettings,
  handleSettingChange,
  saving
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "space-y-8"
  }, localSettings.auto_inject ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "space-y-4"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "text-lg font-medium text-gray-900"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Floating Button', 'nightly')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ColorPicker, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Background Color', 'nightly'),
    value: localSettings.floating_bg_color || '#333333',
    onChange: value => handleSettingChange('floating_bg_color', value),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Choose the background color for the floating toggle button', 'nightly'),
    disabled: saving
  })) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "text-center py-12"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "text-gray-400 mb-4"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    className: "mx-auto h-12 w-12",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a4 4 0 004-4V5z"
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "text-lg font-medium text-gray-900 mb-2"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No Design Options Available', 'nightly')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "text-gray-500 mb-4"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Enable the floating toggle in the General tab to access design options.', 'nightly')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "inline-flex rounded-md shadow"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-50"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Go to General Tab', 'nightly')))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DesignTab);

/***/ }),

/***/ "./src/js/admin/components/GeneralTab.jsx":
/*!************************************************!*\
  !*** ./src/js/admin/components/GeneralTab.jsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);




// Clean Range Control Component
const RangeControl = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
  help,
  disabled = false
}) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
  className: "space-y-2"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
  className: "flex items-center justify-between"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
  className: "text-sm font-medium text-gray-700"
}, label), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
  className: "px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
}, value)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
  type: "range",
  min: min,
  max: max,
  step: step,
  value: value,
  onChange: e => onChange(parseFloat(e.target.value)),
  disabled: disabled,
  className: "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
}), help && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
  className: "text-xs text-gray-500"
}, help));

// Position Selector Component
const PositionSelector = ({
  value,
  onChange,
  disabled
}) => {
  const positions = [{
    value: 'bottom-right',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Bottom Right', 'nightly')
  }, {
    value: 'bottom-left',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Bottom Left', 'nightly')
  }, {
    value: 'top-right',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Top Right', 'nightly')
  }, {
    value: 'top-left',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Top Left', 'nightly')
  }];
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Position', 'nightly'),
    value: value,
    options: positions,
    onChange: onChange,
    disabled: disabled,
    className: "w-full"
  });
};
const GeneralTab = ({
  localSettings,
  handleSettingChange,
  saving
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "space-y-8"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "space-y-6"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "text-lg font-medium text-gray-900"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Floating Toggle', 'nightly')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Enable floating toggle', 'nightly'),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Show a floating toggle button on all pages', 'nightly'),
    checked: localSettings.auto_inject || false,
    onChange: value => handleSettingChange('auto_inject', value),
    disabled: saving
  }), localSettings.auto_inject && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(PositionSelector, {
    value: localSettings.floating_position || 'bottom-right',
    onChange: value => handleSettingChange('floating_position', value),
    disabled: saving
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "space-y-6"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "text-lg font-medium text-gray-900"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('System Settings', 'nightly')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Respect system preference', 'nightly'),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Use the user\'s system dark mode setting', 'nightly'),
    checked: localSettings.respect_system_preference !== false,
    onChange: value => handleSettingChange('respect_system_preference', value),
    disabled: saving
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Transition Duration', 'nightly'),
    value: localSettings.transition_duration || 200,
    onChange: value => handleSettingChange('transition_duration', value),
    min: 0,
    max: 1000,
    step: 50,
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Animation speed in milliseconds', 'nightly'),
    disabled: saving
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "space-y-4"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "text-lg font-medium text-gray-900"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Dark Mode Type', 'nightly')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grid grid-cols-1 gap-4 sm:grid-cols-2"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "radio",
    name: "mode",
    value: "auto",
    checked: localSettings.mode === 'auto',
    onChange: e => handleSettingChange('mode', e.target.value),
    disabled: saving,
    className: "sr-only"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "flex flex-1"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "flex flex-col"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "block text-sm font-medium text-gray-900"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Auto Mode', 'nightly')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "mt-1 flex items-center text-sm text-gray-500"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Automatic filter-based dark mode', 'nightly')))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: `h-5 w-5 rounded-full border flex items-center justify-center ${localSettings.mode === 'auto' ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`
  }, localSettings.mode === 'auto' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "h-2 w-2 rounded-full bg-white"
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "radio",
    name: "mode",
    value: "manual",
    checked: localSettings.mode === 'manual',
    onChange: e => handleSettingChange('mode', e.target.value),
    disabled: saving,
    className: "sr-only"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "flex flex-1"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "flex flex-col"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "block text-sm font-medium text-gray-900"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Custom Mode', 'nightly')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "mt-1 flex items-center text-sm text-gray-500"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Customizable color theme', 'nightly')))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: `h-5 w-5 rounded-full border flex items-center justify-center ${localSettings.mode === 'manual' ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`
  }, localSettings.mode === 'manual' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "h-2 w-2 rounded-full bg-white"
  }))))), localSettings.mode === 'auto' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "space-y-4"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "text-lg font-medium text-gray-900"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Auto Mode Settings', 'nightly')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grid grid-cols-1 gap-6 sm:grid-cols-2"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Intensity', 'nightly'),
    value: localSettings.auto_intensity || 0.05,
    onChange: value => handleSettingChange('auto_intensity', value),
    min: 0,
    max: 0.3,
    step: 0.01,
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Filter strength', 'nightly'),
    disabled: saving
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Contrast', 'nightly'),
    value: localSettings.auto_contrast || 1.15,
    onChange: value => handleSettingChange('auto_contrast', value),
    min: 1.0,
    max: 1.5,
    step: 0.05,
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Text readability', 'nightly'),
    disabled: saving
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Brightness', 'nightly'),
    value: localSettings.auto_brightness || 0.98,
    onChange: value => handleSettingChange('auto_brightness', value),
    min: 0.9,
    max: 1.1,
    step: 0.02,
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Overall brightness', 'nightly'),
    disabled: saving
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Warm Tone', 'nightly'),
    value: localSettings.auto_sepia || 0.15,
    onChange: value => handleSettingChange('auto_sepia', value),
    min: 0,
    max: 0.4,
    step: 0.05,
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Eye comfort', 'nightly'),
    disabled: saving
  }))), localSettings.mode === 'manual' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "space-y-4"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "text-lg font-medium text-gray-900"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Custom Mode', 'nightly')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bg-blue-50 border border-blue-200 rounded-lg p-4"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "text-sm text-blue-800"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Custom mode uses semantic color tokens for professional styling. Colors are optimized for readability and can be customized in future updates.', 'nightly')))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "space-y-4"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "text-lg font-medium text-gray-900"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Advanced', 'nightly')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "space-y-2"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "text-sm font-medium text-gray-700"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Ignore Selectors', 'nightly')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("textarea", {
    value: localSettings.ignore_selectors || '',
    onChange: e => handleSettingChange('ignore_selectors', e.target.value),
    disabled: saving,
    rows: 3,
    className: "w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed",
    placeholder: ".my-component, #special-widget, .chart-container"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "text-xs text-gray-500"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('CSS selectors to exempt from dark mode. Tip: Add class "nightly-ignore" to any HTML element.', 'nightly')))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GeneralTab);

/***/ }),

/***/ "./src/js/admin/components/PreviewPanel.jsx":
/*!**************************************************!*\
  !*** ./src/js/admin/components/PreviewPanel.jsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);


const PreviewPanel = ({
  localSettings
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "lg:col-span-1"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bg-white rounded-sm shadow-sm border border-gray-200 sticky top-6"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "p-4 border-b border-gray-200"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "text-lg font-medium text-gray-900"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Preview', 'nightly'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "p-4"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "relative bg-gray-100 rounded border overflow-hidden aspect-[16/10]"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bg-white border-b p-3"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex items-center space-x-2"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "w-6 h-6 bg-blue-500 rounded"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex-1"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "h-2 bg-gray-300 rounded w-20"
  })))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "p-3 space-y-2"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "h-3 bg-gray-300 rounded w-3/4"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "h-2 bg-gray-200 rounded w-full"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "h-2 bg-gray-200 rounded w-2/3"
  })), localSettings.auto_inject && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "absolute w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs",
    style: {
      backgroundColor: localSettings.floating_bg_color || '#333333',
      bottom: '8px',
      right: localSettings.floating_position?.includes('left') ? 'auto' : '8px',
      left: localSettings.floating_position?.includes('left') ? '8px' : 'auto',
      top: localSettings.floating_position?.includes('top') ? '8px' : 'auto'
    }
  }, "\uD83C\uDF19")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "mt-4 space-y-2"
  }, localSettings.auto_inject ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "text-sm text-gray-600"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Position:', 'nightly')), " ", localSettings.floating_position || 'bottom-right'), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "text-sm text-gray-600"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Color:', 'nightly')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "ml-2 inline-flex items-center space-x-1"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "w-3 h-3 rounded border",
    style: {
      backgroundColor: localSettings.floating_bg_color || '#333333'
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("code", {
    className: "text-xs"
  }, localSettings.floating_bg_color || '#333333')))) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "text-sm text-gray-500 italic"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Enable floating toggle to see preview', 'nightly')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "text-sm text-gray-600"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Mode:', 'nightly')), " ", localSettings.mode === 'auto' ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Auto Mode', 'nightly') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Custom Mode', 'nightly'))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PreviewPanel);

/***/ }),

/***/ "./src/js/admin/components/SaveButton.jsx":
/*!************************************************!*\
  !*** ./src/js/admin/components/SaveButton.jsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);



const SaveButton = ({
  onClick,
  disabled = false,
  loading = false,
  className = 'button button-primary'
}) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
  variant: "primary",
  onClick: onClick,
  disabled: disabled || loading,
  className: className,
  "aria-label": loading ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Saving settings...', 'nightly') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Save settings', 'nightly')
}, loading && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, null), loading ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Saving...', 'nightly') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Save Settings', 'nightly'));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SaveButton);

/***/ }),

/***/ "./src/js/admin/components/TabNavigation.jsx":
/*!***************************************************!*\
  !*** ./src/js/admin/components/TabNavigation.jsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);


const TabNavigation = ({
  activeTab,
  onTabChange,
  saving
}) => {
  const tabs = [{
    id: 'general',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('General', 'nightly')
  }, {
    id: 'design',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Design', 'nightly')
  }];
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("nav", {
    className: "flex gap-2",
    "aria-label": "Tabs"
  }, tabs.map(tab => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    key: tab.id,
    onClick: () => onTabChange(tab.id),
    disabled: saving,
    className: `${activeTab === tab.id ? 'bg-slate-200' : ''} px-3 py-1 font-medium text-base transition-colors duration-200 rounded-lg`
  }, tab.label)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TabNavigation);

/***/ }),

/***/ "./src/js/admin/hooks/useSettings.js":
/*!*******************************************!*\
  !*** ./src/js/admin/hooks/useSettings.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/**
 * useSettings Hook - API Communication
 *
 * @package Nightly
 */




const useSettings = () => {
  const [settings, setSettings] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [saving, setSaving] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [error, setError] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);

  // Default settings fallback
  const defaultSettings = {
    auto_inject: false,
    floating_position: 'bottom-right',
    respect_system_preference: true,
    mode: 'dark',
    transition_duration: 200,
    ignore_selectors: '',
    // Reader mode settings
    reader_intensity: 0.05,
    reader_contrast: 1.15,
    reader_brightness: 0.98,
    reader_sepia: 0.15,
    // Legacy filter settings (no longer used for dark mode)
    intensity: 0.88,
    contrast: 1.05,
    brightness: 0.85,
    sepia: 0.05
  };

  // Load settings from API
  const loadSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({
        path: '/nightly/v1/settings',
        method: 'GET'
      });
      setSettings(response.settings || defaultSettings);
    } catch (err) {
      console.error('Failed to load settings:', err);
      setError((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Failed to load settings. Using defaults.', 'nightly'));
      setSettings(defaultSettings);
    } finally {
      setLoading(false);
    }
  };

  // Save settings to API
  const saveSettings = async newSettings => {
    try {
      setSaving(true);
      setError(null);
      const response = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({
        path: '/nightly/v1/settings',
        method: 'POST',
        data: newSettings
      });
      setSettings(response.settings);
      return response.settings;
    } catch (err) {
      console.error('Failed to save settings:', err);
      setError((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Failed to save settings. Please try again.', 'nightly'));
      throw err;
    } finally {
      setSaving(false);
    }
  };

  // Clear error state
  const clearError = () => {
    setError(null);
  };

  // Retry mechanism for failed operations
  const retryLoadSettings = async () => {
    clearError();
    await loadSettings();
  };

  // Load settings on mount
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    loadSettings();
  }, []);
  return {
    settings,
    loading,
    saving,
    error,
    saveSettings,
    loadSettings,
    retryLoadSettings,
    clearError
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useSettings);

/***/ }),

/***/ "./src/scss/admin.scss":
/*!*****************************!*\
  !*** ./src/scss/admin.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*******************************!*\
  !*** ./src/js/admin/index.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/App */ "./src/js/admin/components/App.jsx");
/* harmony import */ var _scss_admin_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../scss/admin.scss */ "./src/scss/admin.scss");

/**
 * Admin Interface Entry Point
 *
 * @package Nightly
 */




// Import admin styles


// Render the admin app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const adminRoot = document.getElementById('nightly-admin-root');
  if (adminRoot) {
    // Create React root and render the app
    const root = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createRoot)(adminRoot);
    root.render((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_App__WEBPACK_IMPORTED_MODULE_2__["default"], null));
  }
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map