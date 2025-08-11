/**
 * Frontend Theme Toggle Entry Point
 *
 * @package Nightly
 */

import '../../scss/frontend.scss';

/**
 * Simple and effective dark mode toggle
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
			...options
		};

		this.init();
	}

	init() {
		this.loadSavedTheme();
		this.bindEvents();
		this.setupSystemPreferenceListener();
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

		// Set HTML data attribute
		document.documentElement.setAttribute(this.htmlAttribute, theme);

		// Update all toggle buttons
		this.updateToggleButtons(theme);

		// Save preference if requested
		if (save) {
			this.saveTheme(theme);
		}

		// Dispatch custom event
		this.dispatchThemeChangeEvent(theme);
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
}

// Initialize when DOM is ready
let nightlyToggle;

function initNightlyToggle() {
	// Get options from global nightlySettings object (localized from PHP)
	const settings = window.nightlySettings || {};
	
	// Initialize main toggle system
	const toggleOptions = {
		respectSystemPreference: settings.respectSystemPreference !== false,
		transitionDuration: Math.max(0, Math.min(1000, settings.transitionDuration || 200))
	};
	
	nightlyToggle = new NightlyToggle(toggleOptions);

	// Make globally accessible for debugging
	if (settings.debug) {
		window.nightlyToggle = nightlyToggle;
	}
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