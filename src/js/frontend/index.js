/**
 * Frontend Theme Toggle Entry Point - DarkReader Inspired
 *
 * @package Nightly
 */

import '../../scss/frontend.scss';

/**
 * DarkReader-inspired dark mode toggle
 * Dynamically injects dark mode styles instead of relying on theme-specific CSS
 */
class NightlyToggle {
	constructor(options = {}) {
		this.storageKey = 'nightly-theme-preference';
		this.htmlAttribute = 'data-nightly-theme';
		this.themes = {
			LIGHT: 'light',
			DARK: 'dark'
		};

		this.options = {
			respectSystemPreference: true,
			transitionDuration: 200,
			intensity: 0.8, // Dark mode intensity (0-1)
			contrast: 1.0,  // Contrast adjustment
			brightness: 0.9, // Brightness adjustment
			sepia: 0.1,     // Sepia tone for warmer dark mode
			...options
		};

		// Style injection system
		this.styleElement = null;
		this.observer = null;
		this.processedElements = new WeakSet();

		this.init();
	}

	init() {
		this.loadSavedTheme();
		this.bindEvents();
		this.setupSystemPreferenceListener();
		this.setupDynamicStyleInjection();
		this.maybeCreateFloatingToggle();
		this.createDebugIndicator();
	}

	loadSavedTheme() {
		let theme = this.getSavedTheme();

		if (!theme && this.options.respectSystemPreference) {
			theme = this.getSystemPreference();
		}

		if (!theme) {
			theme = this.themes.LIGHT;
		}

		this.setTheme(theme, false);
	}

	getSavedTheme() {
		try {
			const saved = localStorage.getItem(this.storageKey);
			if (saved && Object.values(this.themes).includes(saved)) {
				return saved;
			}
		} catch (error) {
			console.warn('Nightly: localStorage not available');
		}
		return null;
	}

	getSystemPreference() {
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			return this.themes.DARK;
		}
		return this.themes.LIGHT;
	}

	saveTheme(theme) {
		try {
			localStorage.setItem(this.storageKey, theme);
		} catch (error) {
			console.warn('Nightly: Could not save theme preference');
		}
	}

	getCurrentTheme() {
		return document.documentElement.getAttribute(this.htmlAttribute) || this.themes.LIGHT;
	}

	setTheme(theme, save = true) {
		if (!Object.values(this.themes).includes(theme)) {
			console.warn(`Nightly: Invalid theme "${theme}"`);
			return;
		}

		console.log(`Nightly: Setting theme to ${theme}`);

		// Set HTML data attribute
		document.documentElement.setAttribute(this.htmlAttribute, theme);

		// Apply dynamic styles based on theme
		this.applyDynamicStyles(theme);

		// Update all toggle buttons
		this.updateToggleButtons(theme);

		// Save preference if requested
		if (save) {
			this.saveTheme(theme);
		}

		// Dispatch custom event
		this.dispatchThemeChangeEvent(theme);

		// Debug: Log the current attribute
		console.log(`Nightly: HTML data attribute is now: ${document.documentElement.getAttribute(this.htmlAttribute)}`);
	}

	toggle() {
		const currentTheme = this.getCurrentTheme();
		const newTheme = currentTheme === this.themes.DARK ? this.themes.LIGHT : this.themes.DARK;
		this.setTheme(newTheme);
	}

	updateToggleButtons(theme) {
		const buttons = document.querySelectorAll('[data-nightly-toggle]');
		buttons.forEach(button => {
			// Update ARIA attributes
			button.setAttribute('aria-pressed', theme === this.themes.DARK ? 'true' : 'false');

			// Update screen reader text
			const srState = button.querySelector('.nightly-sr-state');
			if (srState) {
				srState.textContent = `Current theme: ${theme}`;
			}

			// Update button text if it has dynamic text
			const textElement = button.querySelector('.nightly-toggle-text');
			if (textElement && (button.hasAttribute('data-light-text') || button.hasAttribute('data-dark-text'))) {
				const lightText = button.getAttribute('data-light-text') || 'Switch to dark mode';
				const darkText = button.getAttribute('data-dark-text') || 'Switch to light mode';
				textElement.textContent = theme === this.themes.DARK ? darkText : lightText;
			}

			// Update toggle switch state
			const toggleSwitch = button.querySelector('.nightly-toggle-switch');
			if (toggleSwitch) {
				if (theme === this.themes.DARK) {
					toggleSwitch.classList.add('is-checked');
				} else {
					toggleSwitch.classList.remove('is-checked');
				}
			}
		});
	}

	dispatchThemeChangeEvent(theme) {
		const event = new CustomEvent('nightlyThemeChange', {
			detail: { theme, timestamp: Date.now() }
		});
		document.dispatchEvent(event);
	}

	bindEvents() {
		// Use event delegation for better performance
		document.addEventListener('click', (event) => {
			const toggleButton = event.target.closest('[data-nightly-toggle]');
			if (toggleButton) {
				event.preventDefault();
				this.toggle();
			}
		});

		// Handle keyboard events
		document.addEventListener('keydown', (event) => {
			const toggleButton = event.target.closest('[data-nightly-toggle]');
			if (toggleButton && (event.key === 'Enter' || event.key === ' ')) {
				event.preventDefault();
				this.toggle();
			}
		});
	}

	setupSystemPreferenceListener() {
		if (!this.options.respectSystemPreference || !window.matchMedia) {
			return;
		}

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleChange = (event) => {
			// Only update if user hasn't set a manual preference
			const savedTheme = this.getSavedTheme();
			if (!savedTheme) {
				const systemTheme = event.matches ? this.themes.DARK : this.themes.LIGHT;
				this.setTheme(systemTheme, false);
			}
		};

		if (mediaQuery.addEventListener) {
			mediaQuery.addEventListener('change', handleChange);
		} else if (mediaQuery.addListener) {
			mediaQuery.addListener(handleChange);
		}
	}

	maybeCreateFloatingToggle() {
		// Check if we should create a floating toggle
		const placeholder = document.getElementById('nightly-floating-toggle-placeholder');
		if (!placeholder || placeholder.getAttribute('data-auto-inject') !== 'true') {
			return;
		}

		// Don't create if there are already other toggles on the page
		const existingToggles = document.querySelectorAll('[data-nightly-toggle]:not([data-nightly-toggle="floating"])');
		if (existingToggles.length > 0) {
			return;
		}

		// Create floating toggle
		this.createFloatingToggle();
	}

	createFloatingToggle() {
		const settings = window.nightlySettings || {};
		const position = settings.floatingPosition || 'bottom-right';

		const button = document.createElement('button');
		button.className = `nightly-toggle-button nightly-floating-toggle position-${position}`;
		button.setAttribute('data-nightly-toggle', 'floating');
		button.setAttribute('type', 'button');
		button.setAttribute('aria-pressed', 'false');
		button.setAttribute('aria-label', 'Toggle between light and dark mode');
		button.setAttribute('title', 'Toggle dark mode');

		// Create the switch using spans for better semantics
		const switchElement = document.createElement('span');
		switchElement.className = 'nightly-toggle-switch';
		switchElement.setAttribute('aria-hidden', 'true');

		const track = document.createElement('span');
		track.className = 'nightly-toggle-track';

		const thumb = document.createElement('span');
		thumb.className = 'nightly-toggle-thumb';

		// Add SVG icons
		thumb.innerHTML = `
			<svg class="nightly-icon nightly-icon-sun" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2"/>
				<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 6.34L4.93 4.93M19.07 19.07l-1.41-1.41" stroke="currentColor" stroke-width="2"/>
			</svg>
			<svg class="nightly-icon nightly-icon-moon" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" fill="currentColor"/>
			</svg>
		`;

		track.appendChild(thumb);
		switchElement.appendChild(track);
		button.appendChild(switchElement);

		// Add screen reader text
		const srText = document.createElement('span');
		srText.className = 'screen-reader-text nightly-sr-state';
		srText.textContent = 'Current theme: light';
		button.appendChild(srText);

		// Add to page
		document.body.appendChild(button);

		// Store reference for cleanup
		this.floatingToggle = button;
	}

	createDebugIndicator() {
		// Only create in debug mode or if URL has debug parameter
		const settings = window.nightlySettings || {};
		const urlParams = new URLSearchParams(window.location.search);

		if (!settings.debug && !urlParams.has('nightly-debug')) {
			return;
		}

		const indicator = document.createElement('div');
		indicator.className = 'nightly-debug-indicator';
		indicator.textContent = 'Nightly Debug';
		document.body.appendChild(indicator);

		// Store reference
		this.debugIndicator = indicator;
	}

	/**
	 * Setup dynamic style injection system
	 * Similar to DarkReader's approach - observes DOM changes and applies styles dynamically
	 */
	setupDynamicStyleInjection() {
		// Create style element for dynamic styles
		this.styleElement = document.createElement('style');
		this.styleElement.id = 'nightly-dynamic-styles';
		document.head.appendChild(this.styleElement);

		// Setup mutation observer to handle dynamically added content
		if (window.MutationObserver) {
			this.observer = new MutationObserver((mutations) => {
				let shouldUpdate = false;

				mutations.forEach((mutation) => {
					if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
						// Check if any added nodes are elements that need styling
						for (let node of mutation.addedNodes) {
							if (node.nodeType === Node.ELEMENT_NODE) {
								shouldUpdate = true;
								break;
							}
						}
					}
				});

				if (shouldUpdate && this.getCurrentTheme() === this.themes.DARK) {
					// Debounce updates to avoid performance issues
					clearTimeout(this.updateTimeout);
					this.updateTimeout = setTimeout(() => {
						this.applyDynamicStyles(this.themes.DARK);
					}, 100);
				}
			});

			// Start observing
			this.observer.observe(document.body, {
				childList: true,
				subtree: true
			});
		}
	}

	/**
	 * Apply dynamic styles based on theme
	 * This is the core DarkReader-inspired functionality
	 */
	applyDynamicStyles(theme) {
		if (!this.styleElement) return;

		if (theme === this.themes.DARK) {
			this.styleElement.textContent = this.generateDarkModeCSS();
		} else {
			this.styleElement.textContent = '';
		}
	}

	/**
	 * Generate dynamic dark mode CSS
	 * Analyzes page elements and creates appropriate dark mode styles
	 */
	generateDarkModeCSS() {
		const { intensity, contrast, brightness, sepia } = this.options;

		// Base dark mode styles with CSS filters and custom properties
		let css = `
			/* Nightly Dynamic Dark Mode Styles */
			html[data-nightly-theme="dark"] {
				filter: invert(${intensity}) contrast(${contrast}) brightness(${brightness}) sepia(${sepia});
			}

			/* Preserve images, videos, and media */
			html[data-nightly-theme="dark"] img,
			html[data-nightly-theme="dark"] video,
			html[data-nightly-theme="dark"] iframe,
			html[data-nightly-theme="dark"] svg,
			html[data-nightly-theme="dark"] canvas,
			html[data-nightly-theme="dark"] embed,
			html[data-nightly-theme="dark"] object {
				filter: invert(${intensity}) contrast(${1 / contrast}) brightness(${1 / brightness}) sepia(${-sepia});
			}

			/* Preserve elements that should stay in original colors */
			html[data-nightly-theme="dark"] [data-nightly-preserve],
			html[data-nightly-theme="dark"] .nightly-preserve,
			html[data-nightly-theme="dark"] .wp-block-image,
			html[data-nightly-theme="dark"] .wp-block-video,
			html[data-nightly-theme="dark"] .wp-block-gallery,
			html[data-nightly-theme="dark"] .wp-block-media-text__media {
				filter: invert(${intensity}) contrast(${1 / contrast}) brightness(${1 / brightness}) sepia(${-sepia});
			}

			/* Smooth transitions */
			html[data-nightly-theme="dark"],
			html[data-nightly-theme="dark"] * {
				transition: filter ${this.options.transitionDuration}ms ease !important;
			}

			/* Fix for already dark elements */
			html[data-nightly-theme="dark"] [style*="background: #000"],
			html[data-nightly-theme="dark"] [style*="background-color: #000"],
			html[data-nightly-theme="dark"] [style*="background: rgb(0"],
			html[data-nightly-theme="dark"] .bg-black,
			html[data-nightly-theme="dark"] .bg-dark {
				filter: invert(0) !important;
			}
		`;

		// Add theme-specific improvements
		css += this.generateThemeSpecificCSS();

		// Add accessibility improvements
		css += this.generateAccessibilityCSS();

		return css;
	}

	/**
	 * Generate theme-specific CSS improvements
	 * Handles common WordPress themes and page builders
	 */
	generateThemeSpecificCSS() {
		let css = '';

		// WordPress admin bar
		css += `
			html[data-nightly-theme="dark"] #wpadminbar {
				filter: none !important;
			}
		`;

		// GeneratePress theme specific improvements
		css += `
			/* GeneratePress theme compatibility */
			html[data-nightly-theme="dark"] .site-header,
			html[data-nightly-theme="dark"] .main-navigation,
			html[data-nightly-theme="dark"] .site-content,
			html[data-nightly-theme="dark"] .content-area,
			html[data-nightly-theme="dark"] .site-main,
			html[data-nightly-theme="dark"] .generate-columns-container,
			html[data-nightly-theme="dark"] .inside-article,
			html[data-nightly-theme="dark"] .entry-content,
			html[data-nightly-theme="dark"] .site-footer {
				background-color: transparent !important;
			}

			/* GeneratePress specific sections that need better handling */
			html[data-nightly-theme="dark"] .separate-containers .inside-article,
			html[data-nightly-theme="dark"] .separate-containers .comments-area,
			html[data-nightly-theme="dark"] .separate-containers .page-header,
			html[data-nightly-theme="dark"] .one-container .site-content {
				background-color: #2a2a2a !important;
				color: #ffffff !important;
			}

			/* GeneratePress navigation improvements */
			html[data-nightly-theme="dark"] .main-navigation a,
			html[data-nightly-theme="dark"] .menu-toggle,
			html[data-nightly-theme="dark"] .dropdown-menu a {
				color: #ffffff !important;
			}

			/* GeneratePress widget areas */
			html[data-nightly-theme="dark"] .widget-area,
			html[data-nightly-theme="dark"] .sidebar .widget {
				background-color: #2a2a2a !important;
				color: #ffffff !important;
			}
		`;

		// Common page builders and themes
		const preserveSelectors = [
			'.elementor-widget-image',
			'.et_pb_image',
			'.vc_single_image-wrapper',
			'.wp-block-cover',
			'.has-background',
			'[style*="background-image"]',
			'.wp-block-image',
			'.wp-block-gallery'
		];

		preserveSelectors.forEach(selector => {
			css += `
				html[data-nightly-theme="dark"] ${selector} {
					filter: invert(${this.options.intensity}) contrast(${1 / this.options.contrast}) brightness(${1 / this.options.brightness}) sepia(${-this.options.sepia});
				}
			`;
		});

		// Detect and handle specific themes
		const bodyClasses = document.body.className;

		// GeneratePress specific handling
		if (bodyClasses.includes('generate-') || document.querySelector('.generate-columns-container')) {
			css += this.generateGeneratePressCSS();
		}

		// Astra theme handling
		if (bodyClasses.includes('ast-') || document.querySelector('.ast-container')) {
			css += this.generateAstraCSS();
		}

		// Divi theme handling
		if (bodyClasses.includes('et_') || document.querySelector('.et_pb_section')) {
			css += this.generateDiviCSS();
		}

		return css;
	}

	/**
	 * Generate GeneratePress specific CSS
	 */
	generateGeneratePressCSS() {
		return `
			/* Enhanced GeneratePress compatibility */
			html[data-nightly-theme="dark"] .generate-columns,
			html[data-nightly-theme="dark"] .generate-columns-container .inside-article {
				background-color: #2a2a2a !important;
				border-color: #444 !important;
			}

			html[data-nightly-theme="dark"] .gp-icon,
			html[data-nightly-theme="dark"] .generate-back-to-top {
				color: #ffffff !important;
			}

			/* GeneratePress forms */
			html[data-nightly-theme="dark"] input[type="text"],
			html[data-nightly-theme="dark"] input[type="email"],
			html[data-nightly-theme="dark"] input[type="search"],
			html[data-nightly-theme="dark"] textarea,
			html[data-nightly-theme="dark"] select {
				background-color: #333 !important;
				color: #ffffff !important;
				border-color: #555 !important;
			}

			/* GeneratePress buttons */
			html[data-nightly-theme="dark"] .button,
			html[data-nightly-theme="dark"] button,
			html[data-nightly-theme="dark"] input[type="button"],
			html[data-nightly-theme="dark"] input[type="submit"] {
				background-color: #4A90E2 !important;
				color: #ffffff !important;
				border-color: #4A90E2 !important;
			}
		`;
	}

	/**
	 * Generate Astra theme specific CSS
	 */
	generateAstraCSS() {
		return `
			/* Enhanced Astra compatibility */
			html[data-nightly-theme="dark"] .ast-article-post,
			html[data-nightly-theme="dark"] .ast-separate-container .ast-article-post,
			html[data-nightly-theme="dark"] .ast-separate-container .ast-article-single {
				background-color: #2a2a2a !important;
				color: #ffffff !important;
			}
		`;
	}

	/**
	 * Generate Divi theme specific CSS
	 */
	generateDiviCSS() {
		return `
			/* Enhanced Divi compatibility */
			html[data-nightly-theme="dark"] .et_pb_section:not([style*="background"]),
			html[data-nightly-theme="dark"] .et_pb_row:not([style*="background"]) {
				background-color: transparent !important;
			}

			html[data-nightly-theme="dark"] .et_pb_text,
			html[data-nightly-theme="dark"] .et_pb_blurb_content {
				color: #ffffff !important;
			}
		`;
	}

	/**
	 * Generate accessibility-focused CSS
	 * Ensures dark mode maintains good contrast and readability
	 */
	generateAccessibilityCSS() {
		return `
			/* Ensure focus indicators remain visible */
			html[data-nightly-theme="dark"] *:focus {
				outline: 2px solid #4A90E2 !important;
				outline-offset: 2px !important;
			}

			/* Improve text contrast on light backgrounds */
			html[data-nightly-theme="dark"] [style*="background: #fff"],
			html[data-nightly-theme="dark"] [style*="background-color: #fff"],
			html[data-nightly-theme="dark"] [style*="background: rgb(255"],
			html[data-nightly-theme="dark"] .bg-white,
			html[data-nightly-theme="dark"] .bg-light {
				color: #333 !important;
			}

			/* Preserve readability for form elements */
			html[data-nightly-theme="dark"] input,
			html[data-nightly-theme="dark"] textarea,
			html[data-nightly-theme="dark"] select {
				background-color: #2a2a2a !important;
				color: #ffffff !important;
				border-color: #555 !important;
			}

			html[data-nightly-theme="dark"] input::placeholder,
			html[data-nightly-theme="dark"] textarea::placeholder {
				color: #aaa !important;
			}
		`;
	}

	/**
	 * Analyze element colors and determine if they need adjustment
	 * This could be expanded for more sophisticated color analysis
	 */
	analyzeElementColors(element) {
		const computedStyle = window.getComputedStyle(element);
		const backgroundColor = computedStyle.backgroundColor;
		const color = computedStyle.color;

		// Simple heuristic: if background is very light, it probably needs inversion
		if (backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)') {
			const rgb = backgroundColor.match(/\d+/g);
			if (rgb) {
				const brightness = (parseInt(rgb[0]) + parseInt(rgb[1]) + parseInt(rgb[2])) / 3;
				return brightness > 200; // Likely needs dark mode treatment
			}
		}

		return false;
	}

	/**
	 * Clean up dynamic styles and observers
	 */
	cleanup() {
		if (this.observer) {
			this.observer.disconnect();
			this.observer = null;
		}

		if (this.styleElement) {
			this.styleElement.remove();
			this.styleElement = null;
		}

		if (this.updateTimeout) {
			clearTimeout(this.updateTimeout);
		}
	}
}

// Initialize when DOM is ready
let nightlyToggle;

function initNightlyToggle() {
	// Get options from global nightlySettings object (localized from PHP)
	const settings = window.nightlySettings || {};

	// Initialize main toggle system with DarkReader-inspired options
	const toggleOptions = {
		respectSystemPreference: settings.respectSystemPreference !== false,
		transitionDuration: Math.max(0, Math.min(1000, settings.transitionDuration || 200)),
		// DarkReader-inspired options
		intensity: Math.max(0, Math.min(1, settings.intensity || 0.8)),
		contrast: Math.max(0.5, Math.min(2, settings.contrast || 1.0)),
		brightness: Math.max(0.3, Math.min(1.5, settings.brightness || 0.9)),
		sepia: Math.max(0, Math.min(1, settings.sepia || 0.1))
	};

	nightlyToggle = new NightlyToggle(toggleOptions);

	// Make globally accessible for debugging and customization
	if (settings.debug) {
		window.nightlyToggle = nightlyToggle;
	}

	// Allow runtime customization
	window.nightlyCustomize = function (options) {
		if (nightlyToggle) {
			Object.assign(nightlyToggle.options, options);
			// Re-apply styles if currently in dark mode
			if (nightlyToggle.getCurrentTheme() === nightlyToggle.themes.DARK) {
				nightlyToggle.applyDynamicStyles(nightlyToggle.themes.DARK);
			}
		}
	};
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initNightlyToggle);
} else {
	initNightlyToggle();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
	module.exports = { NightlyToggle };
}