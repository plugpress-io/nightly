/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/frontend/index.js":
/*!**********************************!*\
  !*** ./src/js/frontend/index.js ***!
  \**********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_frontend_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/frontend.scss */ "./src/scss/frontend.scss");
/* harmony import */ var _shared_NightlyCore_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/NightlyCore.js */ "./src/js/shared/NightlyCore.js");
/* module decorator */ module = __webpack_require__.hmd(module);


class NightlyFrontend {
  constructor(options = {}) {
    this.options = options;
    this.core = null;
    this.floatingToggle = null;
    this.init();
  }
  init() {
    this.core = new _shared_NightlyCore_js__WEBPACK_IMPORTED_MODULE_1__.NightlyCore(this.options);
    this.maybeCreateFloatingToggle();
    document.addEventListener('nightlyChange', event => {
      this.handleCoreChange(event.detail);
    });
  }
  handleCoreChange(detail) {
    if (this.floatingToggle) {
      this.updateFloatingToggle(detail);
    }
  }
  updateFloatingToggle(detail) {
    const {
      theme
    } = detail;
    const settings = window.nightlySettings || {};
    const baseColor = settings.floatingBgColor || '#333333';
    const activeColor = settings.floatingBgColorActive || '#79c0ff';
    this.floatingToggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');

    // Update background color
    if (theme === 'dark') {
      this.floatingToggle.style.background = activeColor;
    } else {
      this.floatingToggle.style.background = baseColor;
    }

    // Update icon if using sun-moon variant
    if (settings.floatingIconType === 'sun-moon') {
      const isDark = theme === 'dark';
      if (isDark) {
        // Moon icon for dark mode
        this.floatingToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon" class="size-5"><path fill-rule="evenodd" d="M7.455 2.004a.75.75 0 0 1 .26.77 7 7 0 0 0 9.958 7.967.75.75 0 0 1 1.067.853A8.5 8.5 0 1 1 6.647 1.921a.75.75 0 0 1 .808.083Z" clip-rule="evenodd"></path></svg>`;
      } else {
        // Sun icon for light mode
        this.floatingToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon" class="size-5"><path d="M10 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 2ZM10 15a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 15ZM10 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM15.657 5.404a.75.75 0 1 0-1.06-1.06l-1.061 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06ZM6.464 14.596a.75.75 0 1 0-1.06-1.06l-1.06 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06ZM18 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 18 10ZM5 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 5 10ZM14.596 15.657a.75.75 0 0 0 1.06-1.06l-1.06-1.061a.75.75 0 1 0-1.06 1.06l1.06 1.06ZM5.404 6.464a.75.75 0 0 0 1.06-1.06l-1.06-1.06a.75.75 0 1 0-1.061 1.06l1.06 1.06Z"></path></svg>`;
      }
    }
  }

  /**
   * Check if floating toggle should be created
   */
  maybeCreateFloatingToggle() {
    const placeholder = document.getElementById('nightly-floating-toggle-placeholder');
    const settings = window.nightlySettings || {};

    // Check if placeholder exists with auto-inject enabled
    if (placeholder && placeholder.getAttribute('data-auto-inject') === 'true') {
      this.createFloatingToggle();
      return;
    }

    // Fallback: check if auto-inject is enabled in settings
    if (settings.autoInject === true) {
      this.createFloatingToggle();
      return;
    }
  }

  /**
   * Create floating toggle button
   */
  createFloatingToggle() {
    const settings = window.nightlySettings || {};
    const placeholder = document.getElementById('nightly-floating-toggle-placeholder');

    // Try to get settings from placeholder first, then fall back to global settings
    let placeholderSettings = {};
    if (placeholder && placeholder.getAttribute('data-settings')) {
      try {
        placeholderSettings = JSON.parse(placeholder.getAttribute('data-settings'));
      } catch (e) {
        console.warn('Nightly: Failed to parse placeholder settings:', e);
      }
    }

    // Get all design settings with fallbacks
    const position = placeholderSettings.floating_position || settings.floatingPosition || 'bottom-right';
    const buttonStyle = settings.floatingButtonStyle || 'rounded';
    const buttonSize = settings.floatingButtonSize || 'medium';
    const bgColor = placeholderSettings.floating_bg_color || settings.floatingBgColor || '#333333';
    const bgColorHover = settings.floatingBgColorHover || '#555555';
    const bgColorActive = settings.floatingBgColorActive || '#79c0ff';
    const iconColor = settings.floatingIconColor || '#ffffff';
    const iconColorHover = settings.floatingIconColorHover || '#ffffff';
    const borderColor = settings.floatingBorderColor || 'transparent';
    const borderWidth = settings.floatingBorderWidth || 0;
    const borderRadius = settings.floatingBorderRadius || 50;
    const iconSize = settings.floatingIconSize || 24;
    const iconType = settings.floatingIconType || 'moon';
    const customIcon = settings.floatingCustomIcon || '🌙';
    const paddingTop = settings.floatingPaddingTop || 12;
    const paddingBottom = settings.floatingPaddingBottom || 12;
    const paddingLeft = settings.floatingPaddingLeft || 16;
    const paddingRight = settings.floatingPaddingRight || 16;
    const boxShadow = settings.floatingBoxShadow || '0 2px 4px rgba(0,0,0,0.1)';
    const boxShadowHover = settings.floatingBoxShadowHover || '0 4px 8px rgba(0,0,0,0.15)';
    const width = placeholderSettings.floating_width || settings.floatingWidth || '3.5rem';
    const height = placeholderSettings.floating_height || settings.floatingHeight || '3.5rem';

    // Determine which icon to display
    let iconToShow = '🌙';
    if (iconType === 'custom') {
      iconToShow = customIcon;
    } else if (iconType === 'sun') {
      iconToShow = '☀️';
    } else if (iconType === 'sun-moon') {
      // For sun-moon, we'll use SVG icons and update based on theme
      iconToShow = this.createSunMoonIcon();
    }

    // Create simple floating button
    this.floatingToggle = document.createElement('button');
    this.floatingToggle.innerHTML = iconToShow;
    this.floatingToggle.setAttribute('aria-label', 'Toggle dark mode');
    this.floatingToggle.setAttribute('aria-pressed', 'false');

    // Add floating styles with all design options
    this.floatingToggle.className = `nightly-floating-toggle position-${position} nightly-button-${buttonStyle} nightly-button-${buttonSize}`;
    this.floatingToggle.style.cssText = `
			position: fixed;
			z-index: 9999;
			width: ${width};
			height: ${height};
			padding: ${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px;
			background: ${bgColor};
			color: ${iconColor};
			border: ${borderWidth}px solid ${borderColor};
			border-radius: ${borderRadius}%;
			cursor: pointer;
			transition: all 0.2s ease;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: ${iconSize}px;
			box-shadow: ${boxShadow};
			${position.includes('bottom') ? 'bottom: 20px;' : 'top: 20px;'}
			${position.includes('right') ? 'right: 20px;' : 'left: 20px;'}
		`;

    // Add hover styles
    const hoverStyles = `
			.nightly-floating-toggle:hover {
				background-color: ${bgColorHover} !important;
				color: ${iconColorHover} !important;
				box-shadow: ${boxShadowHover} !important;
			}
		`;

    // Add styles to head if not already present
    if (!document.getElementById('nightly-floating-toggle-styles')) {
      const styleElement = document.createElement('style');
      styleElement.id = 'nightly-floating-toggle-styles';
      styleElement.textContent = hoverStyles;
      document.head.appendChild(styleElement);
    }

    // Add to page
    document.body.appendChild(this.floatingToggle);

    // Add click event handler
    this.floatingToggle.addEventListener('click', () => {
      this.toggleTheme();
    });

    // Listen for theme changes to update the toggle
    document.addEventListener('nightlyChange', event => {
      this.updateFloatingToggle({
        theme: event.detail.theme,
        mode: event.detail.mode
      });
    });

    // Also listen on window since NightlyCore dispatches there
    window.addEventListener('nightlyChange', event => {
      this.updateFloatingToggle({
        theme: event.detail.theme,
        mode: event.detail.mode
      });
    });

    // Update initial state
    this.updateFloatingToggle({
      theme: this.core.getCurrentTheme(),
      mode: this.core.getCurrentMode()
    });
  }

  /**
   * Get current theme
   */
  getCurrentTheme() {
    return this.core ? this.core.getCurrentTheme() : 'light';
  }

  /**
   * Get current mode
   */
  getCurrentMode() {
    return this.core ? this.core.getCurrentMode() : 'dark';
  }

  /**
   * Toggle theme
   */
  toggleTheme() {
    if (this.core) {
      this.core.toggleTheme();
    }
  }

  /**
   * Toggle mode
   */
  toggleMode() {
    if (this.core) {
      this.core.toggleMode();
    }
  }

  /**
   * Clean up resources
   */
  cleanup() {
    if (this.core) {
      this.core.cleanup();
      this.core = null;
    }
    if (this.floatingToggle) {
      this.floatingToggle.remove();
      this.floatingToggle = null;
    }
  }
  createSunMoonIcon() {
    const isDark = this.core.getCurrentTheme() === 'dark';
    if (isDark) {
      // Moon icon for dark mode
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon" class="size-5"><path fill-rule="evenodd" d="M7.455 2.004a.75.75 0 0 1 .26.77 7 7 0 0 0 9.958 7.967.75.75 0 0 1 1.067.853A8.5 8.5 0 1 1 6.647 1.921a.75.75 0 0 1 .808.083Z" clip-rule="evenodd"></path></svg>`;
    } else {
      // Sun icon for light mode
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon" class="size-5"><path d="M10 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 2ZM10 15a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 15ZM10 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM15.657 5.404a.75.75 0 1 0-1.06-1.06l-1.061 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06ZM6.464 14.596a.75.75 0 1 0-1.06-1.06l-1.06 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06ZM18 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 18 10ZM5 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 5 10ZM14.596 15.657a.75.75 0 0 0 1.06-1.06l-1.06-1.061a.75.75 0 1 0-1.06 1.06l1.06 1.06ZM5.404 6.464a.75.75 0 0 0 1.06-1.06l-1.06-1.06a.75.75 0 1 0-1.061 1.06l1.06 1.06Z"></path></svg>`;
    }
  }
}

// Initialize when DOM is ready
let nightlyFrontend;
function initNightly() {
  // Get options from global nightlySettings object (localized from PHP)
  const settings = window.nightlySettings || {};

  // Check localStorage for saved preferences (these take priority over PHP settings)
  const savedMode = localStorage.getItem('nightly-mode-preference');
  const savedTheme = localStorage.getItem('nightly-theme-preference');

  // Prepare options for the core
  const coreOptions = {
    respectSystemPreference: settings.respectSystemPreference !== false,
    mode: savedMode || settings.mode || 'manual',
    // Use saved mode first, then PHP setting, then default
    transitionDuration: Math.max(0, Math.min(1000, settings.transitionDuration || 200)),
    ignoreSelectors: settings.ignoreSelectors || '',
    // Auto mode settings (filter-based dark mode)
    auto: {
      intensity: Math.max(0, Math.min(1, settings.autoIntensity || 0.05)),
      contrast: Math.max(0.5, Math.min(2, settings.autoContrast || 1.15)),
      brightness: Math.max(0.3, Math.min(1.5, settings.autoBrightness || 0.98)),
      sepia: Math.max(0, Math.min(1, settings.autoSepia || 0.15))
    }

    // Custom mode uses semantic color tokens (no filter settings needed)
  };

  // Create frontend instance
  nightlyFrontend = new NightlyFrontend(coreOptions);

  // If we have dashboard settings but no localStorage preferences, sync them
  if (settings.mode && !savedMode) {
    localStorage.setItem('nightly-mode-preference', settings.mode);
  }
  if (settings.theme && !savedTheme) {
    localStorage.setItem('nightly-theme-preference', settings.theme);
  }

  // Make globally accessible for external integration
  window.nightlyFrontend = nightlyFrontend;
  window.nightlyCore = nightlyFrontend.core;

  // Listen for dashboard setting changes and sync localStorage
  window.addEventListener('nightlySettingsChanged', event => {
    const {
      settings: newSettings
    } = event.detail;

    // Update localStorage with new settings
    if (newSettings.mode) {
      localStorage.setItem('nightly-mode-preference', newSettings.mode);
    }
    if (newSettings.theme) {
      localStorage.setItem('nightly-theme-preference', newSettings.theme);
    }

    // Apply the new settings immediately
    if (nightlyFrontend && nightlyFrontend.core) {
      if (newSettings.mode) {
        nightlyFrontend.core.setMode(newSettings.mode);
      }
      if (newSettings.theme) {
        nightlyFrontend.core.setTheme(newSettings.theme);
      }
    }
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNightly);
} else {
  initNightly();
}

// Export for module systems and external integration
if ( true && module.exports) {
  module.exports = {
    NightlyFrontend,
    NightlyCore: _shared_NightlyCore_js__WEBPACK_IMPORTED_MODULE_1__.NightlyCore
  };
}
window.Nightly = {
  Frontend: NightlyFrontend,
  Core: _shared_NightlyCore_js__WEBPACK_IMPORTED_MODULE_1__.NightlyCore
};

/***/ }),

/***/ "./src/js/shared/NightlyCore.js":
/*!**************************************!*\
  !*** ./src/js/shared/NightlyCore.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NightlyCore: () => (/* binding */ NightlyCore)
/* harmony export */ });
/**
 * Nightly Core - Simple Dark Mode
 */
class NightlyCore {
  constructor(options = {}) {
    this.themes = {
      LIGHT: 'light',
      DARK: 'dark'
    };
    this.modes = {
      AUTO: 'auto',
      MANUAL: 'manual'
    };
    this.options = {
      respectSystemPreference: true,
      mode: 'manual',
      transitionDuration: 200,
      auto: {
        intensity: 0.05,
        contrast: 1.15,
        brightness: 0.98,
        sepia: 0.15
      },
      ...options
    };
    this.initialize();
  }
  initialize() {
    // Ensure DOM is ready before proceeding
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.initializeCore();
      });
    } else {
      this.initializeCore();
    }
  }
  initializeCore() {
    this.loadSavedSettings();
    this.setupDynamicStyleInjection();
    this.setupSystemPreferenceListener();
    this.bindEvents();

    // Add a fallback check to ensure theme persistence
    setTimeout(() => {
      this.verifyThemePersistence();
    }, 100);
  }
  verifyThemePersistence() {
    const savedTheme = localStorage.getItem('nightly-theme-preference');
    const currentTheme = this.getCurrentTheme();

    // If there's a mismatch, restore the saved theme
    if (savedTheme && savedTheme !== currentTheme) {
      this.setTheme(savedTheme);
    }
  }
  loadSavedSettings() {
    const savedTheme = this.getSavedTheme();
    const savedMode = this.getSavedMode();

    // Set mode FIRST to avoid double CSS application
    this.setMode(savedMode);

    // Then set theme (which will apply styles with the correct mode)
    this.setTheme(savedTheme);
  }
  getSavedTheme() {
    const saved = localStorage.getItem('nightly-theme-preference');

    // If user has saved a theme preference, use it regardless of system preference
    if (saved) {
      return saved;
    }

    // Only use system preference if no saved theme exists
    if (this.options.respectSystemPreference) {
      const systemPref = this.getSystemPreference();
      return systemPref;
    }
    return this.themes.LIGHT;
  }
  getSavedMode() {
    const saved = localStorage.getItem('nightly-mode-preference');
    const mode = saved || this.options.mode;
    return mode;
  }
  getSystemPreference() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return this.themes.DARK;
    }
    return this.themes.LIGHT;
  }
  saveTheme(theme) {
    localStorage.setItem('nightly-theme-preference', theme);
  }
  saveMode(mode) {
    localStorage.setItem('nightly-mode-preference', mode);
  }
  getCurrentTheme() {
    return document.documentElement.getAttribute('data-nightly-theme') || this.themes.LIGHT;
  }
  getCurrentMode() {
    return document.documentElement.getAttribute('data-nightly-mode') || this.modes.MANUAL;
  }
  setTheme(theme) {
    // Set the attribute first
    document.documentElement.setAttribute('data-nightly-theme', theme);

    // Always save theme to localStorage
    this.saveTheme(theme);

    // Only apply styles if mode is also set (to avoid applying styles twice)
    const currentMode = this.getCurrentMode();
    if (currentMode && theme === this.themes.DARK) {
      this.applyDynamicStyles();
    } else if (theme === this.themes.DARK) {
      // styles will be applied when mode is set
    } else {
      // Remove dark styles if switching to light
      this.removeDarkStyles();
    }

    // Dispatch change event
    this.dispatchChangeEvent();
  }
  setMode(mode) {
    document.documentElement.setAttribute('data-nightly-mode', mode);

    // Always save mode to localStorage
    this.saveMode(mode);

    // Apply styles if theme is dark (regardless of previous mode)
    if (this.getCurrentTheme() === this.themes.DARK) {
      this.applyDynamicStyles();
    }
    this.dispatchChangeEvent();
  }
  toggleTheme() {
    const currentTheme = this.getCurrentTheme();
    const newTheme = currentTheme === this.themes.LIGHT ? this.themes.DARK : this.themes.LIGHT;
    this.setTheme(newTheme);
  }
  toggleMode() {
    const currentMode = this.getCurrentMode();
    const newMode = currentMode === this.modes.AUTO ? this.modes.MANUAL : this.modes.AUTO;
    this.setMode(newMode);
  }
  dispatchChangeEvent() {
    const event = new CustomEvent('nightlyChange', {
      detail: {
        theme: this.getCurrentTheme(),
        mode: this.getCurrentMode()
      }
    });
    window.dispatchEvent(event);
  }
  bindEvents() {
    document.addEventListener('click', e => {
      const toggle = e.target.closest('[data-nightly-toggle]');
      if (!toggle) return;
      e.preventDefault();
      const toggleType = toggle.getAttribute('data-nightly-toggle');
      if (toggleType === 'theme') {
        this.toggleTheme();
      } else if (toggleType === 'mode') {
        this.toggleMode();
      }
    });
  }
  setupSystemPreferenceListener() {
    if (!window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = e => {
      if (this.options.respectSystemPreference && !localStorage.getItem('nightly-theme-preference')) {
        this.setTheme(e.matches ? this.themes.DARK : this.themes.LIGHT);
      }
    };
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    }
  }
  setupDynamicStyleInjection() {
    // Remove existing style element if it exists
    const existing = document.getElementById('nightly-dynamic-styles');
    if (existing) {
      existing.remove();
    }

    // Create new style element
    this.styleElement = document.createElement('style');
    this.styleElement.id = 'nightly-dynamic-styles';

    // Make sure document.head exists
    if (document.head) {
      document.head.appendChild(this.styleElement);
    } else {
      // If head isn't ready, wait for DOM
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          document.head.appendChild(this.styleElement);
        });
      } else {
        // Try again immediately
        setTimeout(() => {
          if (document.head) {
            document.head.appendChild(this.styleElement);
          }
        }, 0);
      }
    }
  }
  applyDynamicStyles() {
    const mode = this.getCurrentMode();
    const theme = this.getCurrentTheme();
    const css = this.generateDynamicCSS(mode);

    // Make sure styleElement exists before using it
    if (!this.styleElement) {
      this.setupDynamicStyleInjection();
    }

    // Apply CSS with error handling
    if (this.styleElement) {
      try {
        this.styleElement.textContent = css;
      } catch (error) {
        // Try alternative method
        this.styleElement.innerHTML = css;
      }
    } else {
      console.error('Nightly: Could not create style element');
    }
  }
  generateDynamicCSS(mode) {
    if (mode === this.modes.AUTO) {
      const settings = this.options.auto;
      const {
        intensity,
        contrast,
        brightness,
        sepia
      } = settings;
      return `
				html[data-nightly-theme="dark"][data-nightly-mode="auto"] {
					filter: invert(${intensity}) contrast(${contrast}) brightness(${brightness}) sepia(${sepia});
				}
				html[data-nightly-theme="dark"][data-nightly-mode="auto"] img,
				html[data-nightly-theme="dark"][data-nightly-mode="auto"] video {
					filter: invert(${intensity}) contrast(${1 / contrast}) brightness(${1 / brightness});
				}
			`;
    } else {
      // Super Specific Dark Mode - Override Everything
      return `
				html[data-nightly-theme="dark"] {
					color-scheme: dark !important;
				}
				
				html[data-nightly-theme="dark"] body,
				html[data-nightly-theme="dark"] body.astra-theme,
				html[data-nightly-theme="dark"].astra-theme body {
					background: #0d1117 !important;
					background-color: #0d1117 !important;
					color: #e6edf3 !important;
				}
				
				html[data-nightly-theme="dark"] *,
				html[data-nightly-theme="dark"] h1,
				html[data-nightly-theme="dark"] h2,
				html[data-nightly-theme="dark"] h3,
				html[data-nightly-theme="dark"] h4,
				html[data-nightly-theme="dark"] h5,
				html[data-nightly-theme="dark"] h6,
				html[data-nightly-theme="dark"] p,
				html[data-nightly-theme="dark"] span,
				html[data-nightly-theme="dark"] div,
				html[data-nightly-theme="dark"] li,
				html[data-nightly-theme="dark"] .entry-title,
				html[data-nightly-theme="dark"] .entry-content {
					color: #e6edf3 !important;
					background: transparent !important;
					background-color: transparent !important;
				}
				
				html[data-nightly-theme="dark"] a,
				html[data-nightly-theme="dark"] .entry-title a {
					color: #79c0ff !important;
				}
				
				html[data-nightly-theme="dark"] a:hover,
				html[data-nightly-theme="dark"] .entry-title a:hover {
					color: #a5d6ff !important;
				}
				
				html[data-nightly-theme="dark"] .site-header,
				html[data-nightly-theme="dark"] .site-content,
				html[data-nightly-theme="dark"] .site-footer,
				html[data-nightly-theme="dark"] .ast-container,
				html[data-nightly-theme="dark"] article,
				html[data-nightly-theme="dark"] .ast-article-post,
				html[data-nightly-theme="dark"] .ast-article-inner,
				html[data-nightly-theme="dark"] .post-content,
				html[data-nightly-theme="dark"] #content,
				html[data-nightly-theme="dark"] #primary,
				html[data-nightly-theme="dark"] .content-area,
				html[data-nightly-theme="dark"] .site-main,
				html[data-nightly-theme="dark"] #main {
					background: #0d1117 !important;
					background-color: #0d1117 !important;
					color: #e6edf3 !important;
					border: none !important;
					box-shadow: none !important;
				}
				
				html[data-nightly-theme="dark"] .nightly-ignore,
				html[data-nightly-theme="dark"] .nightly-ignore * {
					background: initial !important;
					color: initial !important;
				}
			`;
    }
  }
  removeDarkStyles() {
    // Remove the style element that contains dark mode styles
    if (this.styleElement) {
      this.styleElement.textContent = '';
    }
  }
  createToggleButton(options = {}) {
    const {
      toggleType = 'theme',
      showText = true,
      mode = 'manual'
    } = options;
    const button = document.createElement('button');
    button.className = 'nightly-toggle';
    button.setAttribute('data-nightly-toggle', toggleType);
    button.setAttribute('aria-label', 'Toggle dark mode');
    const iconSvg = `
			<svg class="nightly-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
			</svg>
		`;
    button.innerHTML = iconSvg + (showText ? '<span>Dark Mode</span>' : '');
    return button;
  }
  cleanup() {
    if (this.styleElement) {
      this.styleElement.remove();
    }
  }
}

/***/ }),

/***/ "./src/scss/frontend.scss":
/*!********************************!*\
  !*** ./src/scss/frontend.scss ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
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
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/frontend/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map