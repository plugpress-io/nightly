import { enableDarkMode, disableDarkMode } from 'darkreader';

import './scss/darkmode.scss';

// Initialize immediately when script loads
document.addEventListener('DOMContentLoaded', () => {
	const darkMode = new DarkMode();
});

class DarkMode {
	constructor() {
		this.isEnabled = false;
		this.currentStyle = 1;
		this.init();
	}

	init() {
		// Create switches
		this.createFloatingSwitch();

		// Initialize dark mode based on saved preference
		const savedPreference = localStorage.getItem('nightly_dark_mode');
		if (savedPreference === 'enabled') {
			this.enable();
			// Update switch states
			document.querySelectorAll('.nightly-switch').forEach((switchEl) => {
				switchEl.classList.add('active');
			});
		}

		// Add switch event listeners
		this.initSwitches();

		// Change style every 3 seconds for demo (remove in production)
		this.startStyleDemo();
	}

	createSwitchElement(className = '') {
		const switchWrapper = document.createElement('div');
		switchWrapper.className = `nightly-switch ${className}`.trim();

		const track = document.createElement('div');
		track.className = 'nightly-switch__track';

		const circle = document.createElement('div');
		circle.className = 'nightly-switch__circle';

		switchWrapper.appendChild(track);
		switchWrapper.appendChild(circle);

		return switchWrapper;
	}

	createFloatingSwitch() {
		const floatingSwitch = this.createSwitchElement('floating');
		document.body.appendChild(floatingSwitch);
	}

	// Change switch style
	changeSwitchStyle() {
		const switches = document.querySelectorAll('.nightly-switch');
		switches.forEach((switchEl) => {
			switchEl.classList.add(`style-${this.currentStyle}`);
		});
	}

	initSwitches() {
		const switches = document.querySelectorAll('.nightly-switch');
		switches.forEach((switchEl) => {
			switchEl.addEventListener('click', () => {
				this.toggle();
				// Update all switches to maintain sync
				document.querySelectorAll('.nightly-switch').forEach((s) => {
					s.classList.toggle('active', this.isEnabled);
				});
			});
		});
	}

	enable() {
		enableDarkMode({
			brightness: 100,
			contrast: 100,
			sepia: 0,
			darkSchemeBackgroundColor: '#1a1a1a',
			darkSchemeTextColor: '#ffffff',
		});
		this.isEnabled = true;
		localStorage.setItem('nightly_dark_mode', 'enabled');
		document.body.classList.add('nightly-dark-mode');
	}

	disable() {
		disableDarkMode();
		this.isEnabled = false;
		localStorage.setItem('nightly_dark_mode', 'disabled');
		document.body.classList.remove('nightly-dark-mode');
	}

	toggle() {
		if (this.isEnabled) {
			this.disable();
		} else {
			this.enable();
		}
	}
}

export default new DarkMode();
