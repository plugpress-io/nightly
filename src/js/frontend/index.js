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
		const { theme, mode } = detail;
		const settings = window.nightlySettings || {};
		const baseColor = settings.floatingBgColor || '#333333';

		// Update ARIA attributes
		this.floatingToggle.setAttribute(
			'aria-pressed',
			theme === 'dark' ? 'true' : 'false'
		);

		// Update background color based on theme
		if (theme === 'dark') {
			// Use a lighter/accent color when dark mode is active
			this.floatingToggle.style.background = '#79c0ff';
		} else {
			// Use the user's chosen background color
			this.floatingToggle.style.background = baseColor;
		}
	}

	/**
	 * Check if floating toggle should be created
	 */
	maybeCreateFloatingToggle() {
		const placeholder = document.getElementById(
			'nightly-floating-toggle-placeholder'
		);
		if (
			!placeholder ||
			placeholder.getAttribute('data-auto-inject') !== 'true'
		) {
			return;
		}

		this.createFloatingToggle();
	}

	/**
	 * Create floating toggle button
	 */
	createFloatingToggle() {
		const settings = window.nightlySettings || {};
		const position = settings.floatingPosition || 'bottom-right';

		// Create the button using core functionality
		this.floatingToggle = this.core.createToggleButton({
			toggleType: 'theme',
			showText: false,
		});

		// Add floating styles
		this.floatingToggle.className = `nightly-floating-toggle position-${position}`;
		const bgColor = settings.floatingBgColor || '#333333';
		this.floatingToggle.style.cssText = `
			position: fixed;
			z-index: 9999;
			padding: 12px;
			background: ${bgColor};
			color: white;
			border: none;
			border-radius: 50%;
			cursor: pointer;
			transition: background-color 0.2s ease;
			${position.includes('bottom') ? 'bottom: 20px;' : 'top: 20px;'}
			${position.includes('right') ? 'right: 20px;' : 'left: 20px;'}
		`;

		// Add to page
		document.body.appendChild(this.floatingToggle);

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
}

// Initialize when DOM is ready
let nightlyFrontend;

function initNightly() {
	// Get options from global nightlySettings object (localized from PHP)
	const settings = window.nightlySettings || {};

	// Debug logging
	console.log('Nightly Debug - Initializing with settings:', settings);

	// Prepare options for the core
	const coreOptions = {
		respectSystemPreference: settings.respectSystemPreference !== false,
		mode: settings.mode || 'manual', // 'auto' or 'manual'
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

	// Make globally accessible for debugging and external integration
	if (settings.debug) {
		window.nightlyFrontend = nightlyFrontend;
		window.nightlyCore = nightlyFrontend.core;
	}

	// Always add these for easy testing (can be removed in production)
	window.nightlyTest = {
		toggleMode: () => nightlyFrontend.core.toggleMode(),
		toggleTheme: () => nightlyFrontend.core.toggleTheme(),
		getCurrentMode: () => nightlyFrontend.core.getCurrentMode(),
		getCurrentTheme: () => nightlyFrontend.core.getCurrentTheme(),
		setMode: (mode) => nightlyFrontend.core.setMode(mode),
		setTheme: (theme) => nightlyFrontend.core.setTheme(theme),
	};
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
