import '../../scss/frontend.scss';
import { NightlyCore } from '../shared/NightlyCore.js';

class NightlyFrontend {
	constructor(options = {}) {
		this.options = options;
		this.core = null;
		this.floatingToggle = null;

		this.init();
	}

	init() {
		this.core = new NightlyCore(this.options);

		this.maybeCreateFloatingToggle();

		document.addEventListener('nightlyChange', (event) => {
			this.handleCoreChange(event.detail);
		});
	}

	handleCoreChange(detail) {
		if (this.floatingToggle) {
			this.updateFloatingToggle(detail);
		}
	}

	updateFloatingToggle(detail) {
		const { theme } = detail;
		const settings = window.nightlySettings || {};
		const baseColor = settings.floatingBgColor || '#333333';
		const activeColor = settings.floatingBgColorActive || '#79c0ff';

		this.floatingToggle.setAttribute(
			'aria-pressed',
			theme === 'dark' ? 'true' : 'false'
		);

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
		const placeholder = document.getElementById(
			'nightly-floating-toggle-placeholder'
		);
		const settings = window.nightlySettings || {};

		// Check if placeholder exists with auto-inject enabled
		if (
			placeholder &&
			placeholder.getAttribute('data-auto-inject') === 'true'
		) {
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
		const placeholder = document.getElementById(
			'nightly-floating-toggle-placeholder'
		);

		// Try to get settings from placeholder first, then fall back to global settings
		let placeholderSettings = {};
		if (placeholder && placeholder.getAttribute('data-settings')) {
			try {
				placeholderSettings = JSON.parse(
					placeholder.getAttribute('data-settings')
				);
			} catch (e) {
				console.warn(
					'Nightly: Failed to parse placeholder settings:',
					e
				);
			}
		}

		// Get all design settings with fallbacks
		const position =
			placeholderSettings.floating_position ||
			settings.floatingPosition ||
			'bottom-right';
		const buttonStyle = settings.floatingButtonStyle || 'rounded';
		const buttonSize = settings.floatingButtonSize || 'medium';
		const bgColor =
			placeholderSettings.floating_bg_color ||
			settings.floatingBgColor ||
			'#333333';
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
		const boxShadow =
			settings.floatingBoxShadow || '0 2px 4px rgba(0,0,0,0.1)';
		const boxShadowHover =
			settings.floatingBoxShadowHover || '0 4px 8px rgba(0,0,0,0.15)';
		const width =
			placeholderSettings.floating_width ||
			settings.floatingWidth ||
			'3.5rem';
		const height =
			placeholderSettings.floating_height ||
			settings.floatingHeight ||
			'3.5rem';

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
		document.addEventListener('nightlyChange', (event) => {
			this.updateFloatingToggle({
				theme: event.detail.theme,
				mode: event.detail.mode,
			});
		});

		// Also listen on window since NightlyCore dispatches there
		window.addEventListener('nightlyChange', (event) => {
			this.updateFloatingToggle({
				theme: event.detail.theme,
				mode: event.detail.mode,
			});
		});

		// Update initial state
		this.updateFloatingToggle({
			theme: this.core.getCurrentTheme(),
			mode: this.core.getCurrentMode(),
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
		mode: savedMode || settings.mode || 'manual', // Use saved mode first, then PHP setting, then default
		transitionDuration: Math.max(
			0,
			Math.min(1000, settings.transitionDuration || 200)
		),
		ignoreSelectors: settings.ignoreSelectors || '',

		// Auto mode settings (filter-based dark mode)
		auto: {
			intensity: Math.max(0, Math.min(1, settings.autoIntensity || 0.05)),
			contrast: Math.max(0.5, Math.min(2, settings.autoContrast || 1.15)),
			brightness: Math.max(
				0.3,
				Math.min(1.5, settings.autoBrightness || 0.98)
			),
			sepia: Math.max(0, Math.min(1, settings.autoSepia || 0.15)),
		},

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
	window.addEventListener('nightlySettingsChanged', (event) => {
		const { settings: newSettings } = event.detail;

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
if (typeof module !== 'undefined' && module.exports) {
	module.exports = { NightlyFrontend, NightlyCore };
}

window.Nightly = {
	Frontend: NightlyFrontend,
	Core: NightlyCore,
};
