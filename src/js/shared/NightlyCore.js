/**
 * Nightly Core - Simple Dark Mode
 */
export class NightlyCore {
	constructor(options = {}) {
		this.themes = {
			LIGHT: 'light',
			DARK: 'dark',
		};

		this.modes = {
			AUTO: 'auto',
			MANUAL: 'manual',
		};

		this.options = {
			respectSystemPreference: true,
			mode: 'manual',
			transitionDuration: 200,
			auto: {
				intensity: 0.05,
				contrast: 1.15,
				brightness: 0.98,
				sepia: 0.15,
			},
			...options,
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
		if (
			window.matchMedia &&
			window.matchMedia('(prefers-color-scheme: dark)').matches
		) {
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
		return (
			document.documentElement.getAttribute('data-nightly-theme') ||
			this.themes.LIGHT
		);
	}

	getCurrentMode() {
		return (
			document.documentElement.getAttribute('data-nightly-mode') ||
			this.modes.MANUAL
		);
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
		const newTheme =
			currentTheme === this.themes.LIGHT
				? this.themes.DARK
				: this.themes.LIGHT;

		this.setTheme(newTheme);
	}

	toggleMode() {
		const currentMode = this.getCurrentMode();
		const newMode =
			currentMode === this.modes.AUTO
				? this.modes.MANUAL
				: this.modes.AUTO;

		this.setMode(newMode);
	}

	dispatchChangeEvent() {
		const event = new CustomEvent('nightlyChange', {
			detail: {
				theme: this.getCurrentTheme(),
				mode: this.getCurrentMode(),
			},
		});
		window.dispatchEvent(event);
	}

	bindEvents() {
		document.addEventListener('click', (e) => {
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
		const handleChange = (e) => {
			if (
				this.options.respectSystemPreference &&
				!localStorage.getItem('nightly-theme-preference')
			) {
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
			const { intensity, contrast, brightness, sepia } = settings;
			return `
				html[data-nightly-theme="dark"][data-nightly-mode="auto"] {
					filter: invert(${intensity}) contrast(${contrast}) brightness(${brightness}) sepia(${sepia});
				}
				html[data-nightly-theme="dark"][data-nightly-mode="auto"] img,
				html[data-nightly-theme="dark"][data-nightly-mode="auto"] video {
					filter: invert(${intensity}) contrast(${1 / contrast}) brightness(${
						1 / brightness
					});
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
			mode = 'manual',
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
