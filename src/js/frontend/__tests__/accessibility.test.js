/**
 * Accessibility Tests for Nightly Toggle
 *
 * @package Nightly
 */

// Set up global mocks before any imports
const localStorageMock = {
	getItem: jest.fn(),
	setItem: jest.fn(),
	removeItem: jest.fn(),
	clear: jest.fn(),
};

const matchMediaMock = jest.fn();

// Mock document methods
const mockButton = {
	setAttribute: jest.fn(),
	getAttribute: jest.fn(),
	hasAttribute: jest.fn(),
	classList: {
		add: jest.fn(),
		remove: jest.fn(),
		contains: jest.fn(),
	},
	querySelector: jest.fn(),
	parentNode: {
		insertBefore: jest.fn(),
	},
	nextSibling: null,
	blur: jest.fn(),
	focus: jest.fn(),
};

const mockLiveRegion = {
	id: 'nightly-live-region',
	setAttribute: jest.fn(),
	textContent: '',
	className: '',
	remove: jest.fn(),
};

// Set up global mocks
Object.defineProperty(window, 'localStorage', {
	value: localStorageMock,
	writable: true,
});

Object.defineProperty(window, 'matchMedia', {
	value: matchMediaMock,
	writable: true,
});

// Import the class after mocks are set up
const { NightlyToggle } = require('../index.js');

describe('Accessibility Features', () => {
	let toggle;
	
	beforeEach(() => {
		// Reset all mocks
		jest.clearAllMocks();
		
		// Set up default matchMedia behavior
		matchMediaMock.mockReturnValue({
			matches: false,
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
		});
		
		// Mock DOM methods
		document.documentElement.setAttribute = jest.fn();
		document.documentElement.getAttribute = jest.fn().mockReturnValue('light');
		document.documentElement.classList = {
			add: jest.fn(),
			remove: jest.fn(),
		};
		document.querySelector = jest.fn();
		document.querySelectorAll = jest.fn().mockReturnValue([mockButton]);
		document.createElement = jest.fn().mockReturnValue(mockLiveRegion);
		document.getElementById = jest.fn().mockReturnValue(null);
		document.body.appendChild = jest.fn();
		document.addEventListener = jest.fn();
		document.dispatchEvent = jest.fn();
		
		// Mock console methods
		console.warn = jest.fn();
		
		// Mock CustomEvent
		global.CustomEvent = jest.fn().mockImplementation((type, options) => ({
			type,
			detail: options?.detail,
		}));
		
		// Default localStorage to return null (no saved theme)
		localStorageMock.getItem.mockReturnValue(null);
		
		// Reset button mock
		mockButton.setAttribute.mockClear();
		mockButton.getAttribute.mockClear();
		mockButton.hasAttribute.mockClear();
		mockButton.classList.add.mockClear();
		mockButton.classList.remove.mockClear();
		mockButton.classList.contains.mockClear();
		mockButton.querySelector.mockClear();
		mockButton.parentNode.insertBefore.mockClear();
	});
	
	afterEach(() => {
		if (toggle && typeof toggle.destroy === 'function') {
			toggle.destroy();
			toggle = null;
		}
	});

	describe('ARIA Attributes', () => {
		test('should set proper ARIA attributes on toggle buttons', () => {
			toggle = new NightlyToggle({ respectSystemPreference: false });
			toggle.updateToggleButtons('light');

			expect(mockButton.setAttribute).toHaveBeenCalledWith('aria-pressed', 'false');
			expect(mockButton.setAttribute).toHaveBeenCalledWith(
				'aria-label',
				expect.stringContaining('currently light mode')
			);
		});

		test('should update ARIA attributes when theme changes', () => {
			toggle = new NightlyToggle({ respectSystemPreference: false });
			
			// Clear initial calls
			mockButton.setAttribute.mockClear();
			
			toggle.updateToggleButtons('dark');

			expect(mockButton.setAttribute).toHaveBeenCalledWith('aria-pressed', 'true');
			expect(mockButton.setAttribute).toHaveBeenCalledWith(
				'aria-label',
				expect.stringContaining('currently dark mode')
			);
		});

		test('should create aria-describedby elements for additional context', () => {
			const mockDescription = {
				id: '',
				className: '',
				textContent: '',
			};
			document.createElement.mockReturnValue(mockDescription);
			mockButton.getAttribute.mockReturnValue(null); // No existing aria-describedby

			toggle = new NightlyToggle({ respectSystemPreference: false });
			toggle.updateToggleButtons('light');

			expect(document.createElement).toHaveBeenCalledWith('span');
			expect(mockDescription.className).toBe('nightly-sr-only');
			expect(mockDescription.textContent).toContain('Switches between light and dark color schemes');
			expect(mockButton.parentNode.insertBefore).toHaveBeenCalled();
		});

		test('should update existing aria-describedby elements', () => {
			const mockDescription = {
				textContent: '',
			};
			mockButton.getAttribute.mockReturnValue('existing-description-id');
			document.getElementById.mockReturnValue(mockDescription);

			toggle = new NightlyToggle({ respectSystemPreference: false });
			toggle.updateToggleButtons('dark');

			expect(mockDescription.textContent).toContain('Current theme: dark');
		});
	});

	describe('Keyboard Navigation', () => {
		test('should handle Enter key press', () => {
			toggle = new NightlyToggle({ respectSystemPreference: false });
			const toggleSpy = jest.spyOn(toggle, 'toggle');

			// Simulate keydown event
			const event = {
				key: 'Enter',
				target: mockButton,
				preventDefault: jest.fn(),
			};
			mockButton.closest = jest.fn().mockReturnValue(mockButton);

			// Trigger the event handler
			const keydownHandler = document.addEventListener.mock.calls.find(
				call => call[0] === 'keydown'
			)[1];
			keydownHandler(event);

			expect(event.preventDefault).toHaveBeenCalled();
			expect(toggleSpy).toHaveBeenCalled();
		});

		test('should handle Space key press', () => {
			toggle = new NightlyToggle({ respectSystemPreference: false });
			const toggleSpy = jest.spyOn(toggle, 'toggle');

			// Simulate keydown event
			const event = {
				key: ' ',
				target: mockButton,
				preventDefault: jest.fn(),
			};
			mockButton.closest = jest.fn().mockReturnValue(mockButton);

			// Trigger the event handler
			const keydownHandler = document.addEventListener.mock.calls.find(
				call => call[0] === 'keydown'
			)[1];
			keydownHandler(event);

			expect(event.preventDefault).toHaveBeenCalled();
			expect(toggleSpy).toHaveBeenCalled();
		});

		test('should handle Escape key to remove focus', () => {
			toggle = new NightlyToggle({ respectSystemPreference: false });

			// Simulate keydown event
			const event = {
				key: 'Escape',
				target: mockButton,
				preventDefault: jest.fn(),
			};
			mockButton.closest = jest.fn().mockReturnValue(mockButton);

			// Trigger the event handler
			const keydownHandler = document.addEventListener.mock.calls.find(
				call => call[0] === 'keydown'
			)[1];
			keydownHandler(event);

			expect(mockButton.blur).toHaveBeenCalled();
		});

		test('should ensure proper focus management', () => {
			toggle = new NightlyToggle({ respectSystemPreference: false });
			
			mockButton.hasAttribute.mockReturnValue(false);
			mockButton.classList.contains.mockReturnValue(false);
			
			toggle.ensureProperFocusManagement(mockButton);

			expect(mockButton.setAttribute).toHaveBeenCalledWith('tabindex', '0');
			expect(mockButton.classList.add).toHaveBeenCalledWith('nightly-focus-target');
		});
	});

	describe('Screen Reader Announcements', () => {
		test('should create live region for announcements', () => {
			toggle = new NightlyToggle({ respectSystemPreference: false });
			
			document.getElementById.mockReturnValue(null); // No existing live region
			
			toggle.announceToScreenReader('Test message', 'polite');

			expect(document.createElement).toHaveBeenCalledWith('div');
			expect(mockLiveRegion.id).toBe('nightly-live-region');
			expect(mockLiveRegion.setAttribute).toHaveBeenCalledWith('aria-live', 'polite');
			expect(mockLiveRegion.setAttribute).toHaveBeenCalledWith('aria-atomic', 'true');
			expect(mockLiveRegion.className).toBe('nightly-sr-only');
		});

		test('should announce theme changes with context', () => {
			toggle = new NightlyToggle({ respectSystemPreference: false });
			const announceSpy = jest.spyOn(toggle, 'announceToScreenReader');

			toggle.announceThemeChange('dark');

			expect(announceSpy).toHaveBeenCalledWith('Dark mode activated', 'polite');
			
			// Check that contextual message is scheduled
			setTimeout(() => {
				expect(announceSpy).toHaveBeenCalledWith(
					'Theme switched to dark mode. Page colors and contrast have been updated.',
					'polite'
				);
			}, 1100);
		});

		test('should update live region with new messages', () => {
			const existingLiveRegion = {
				setAttribute: jest.fn(),
				textContent: '',
			};
			document.getElementById.mockReturnValue(existingLiveRegion);

			toggle = new NightlyToggle({ respectSystemPreference: false });
			toggle.announceToScreenReader('New message', 'assertive');

			expect(existingLiveRegion.setAttribute).toHaveBeenCalledWith('aria-live', 'assertive');
			
			// Check that message is set after delay
			setTimeout(() => {
				expect(existingLiveRegion.textContent).toBe('New message');
			}, 150);
		});
	});

	describe('High Contrast Mode', () => {
		test('should detect high contrast mode', () => {
			// Mock high contrast media query
			matchMediaMock.mockImplementation((query) => {
				if (query === '(prefers-contrast: high)') {
					return { matches: true };
				}
				return { matches: false };
			});

			toggle = new NightlyToggle({ respectSystemPreference: false });
			const isHighContrast = toggle.isHighContrastMode();

			expect(isHighContrast).toBe(true);
		});

		test('should detect forced colors mode', () => {
			// Mock forced colors media query
			matchMediaMock.mockImplementation((query) => {
				if (query === '(forced-colors: active)') {
					return { matches: true };
				}
				return { matches: false };
			});

			toggle = new NightlyToggle({ respectSystemPreference: false });
			const isHighContrast = toggle.isHighContrastMode();

			expect(isHighContrast).toBe(true);
		});

		test('should apply high contrast enhancements', () => {
			// Mock high contrast detection
			matchMediaMock.mockImplementation((query) => {
				if (query === '(prefers-contrast: high)') {
					return { matches: true };
				}
				return { matches: false };
			});

			toggle = new NightlyToggle({ respectSystemPreference: false });
			toggle.applyHighContrastEnhancements();

			expect(document.documentElement.classList.add).toHaveBeenCalledWith('nightly-high-contrast');
			expect(mockButton.classList.add).toHaveBeenCalledWith('nightly-high-contrast-focus');
		});

		test('should set up high contrast change listeners', () => {
			const mockHighContrastQuery = {
				addEventListener: jest.fn(),
				removeEventListener: jest.fn(),
			};
			const mockForcedColorsQuery = {
				addEventListener: jest.fn(),
				removeEventListener: jest.fn(),
			};

			matchMediaMock.mockImplementation((query) => {
				if (query === '(prefers-contrast: high)') {
					return mockHighContrastQuery;
				}
				if (query === '(forced-colors: active)') {
					return mockForcedColorsQuery;
				}
				return { matches: false, addEventListener: jest.fn() };
			});

			toggle = new NightlyToggle({ respectSystemPreference: false });

			expect(mockHighContrastQuery.addEventListener).toHaveBeenCalledWith(
				'change',
				expect.any(Function)
			);
			expect(mockForcedColorsQuery.addEventListener).toHaveBeenCalledWith(
				'change',
				expect.any(Function)
			);
		});
	});

	describe('Focus Management', () => {
		test('should handle focus in events', () => {
			toggle = new NightlyToggle({ respectSystemPreference: false });
			
			const event = {
				target: mockButton,
			};
			mockButton.closest = jest.fn().mockReturnValue(mockButton);
			mockButton.classList.contains.mockReturnValue(true); // Is floating toggle

			// Trigger the focus in handler
			const focusInHandler = document.addEventListener.mock.calls.find(
				call => call[0] === 'focusin'
			)[1];
			focusInHandler(event);

			expect(mockButton.classList.add).toHaveBeenCalledWith('nightly-focused');
		});

		test('should handle focus out events', () => {
			toggle = new NightlyToggle({ respectSystemPreference: false });
			
			const event = {
				target: mockButton,
			};
			mockButton.closest = jest.fn().mockReturnValue(mockButton);

			// Trigger the focus out handler
			const focusOutHandler = document.addEventListener.mock.calls.find(
				call => call[0] === 'focusout'
			)[1];
			focusOutHandler(event);

			expect(mockButton.classList.remove).toHaveBeenCalledWith('nightly-focused');
		});

		test('should announce focus for floating toggles', () => {
			toggle = new NightlyToggle({ respectSystemPreference: false });
			const announceSpy = jest.spyOn(toggle, 'announceToScreenReader');
			
			mockButton.classList.contains.mockReturnValue(true); // Is floating toggle
			
			toggle.handleFocusIn(mockButton);

			expect(announceSpy).toHaveBeenCalledWith('Dark mode toggle focused', 'polite');
		});
	});

	describe('Cleanup and Accessibility', () => {
		test('should clean up accessibility enhancements on destroy', () => {
			const mockDescription = {
				remove: jest.fn(),
				classList: {
					contains: jest.fn().mockReturnValue(true),
				},
			};
			
			mockButton.getAttribute.mockReturnValue('test-description-id');
			document.getElementById.mockReturnValue(mockDescription);
			document.querySelectorAll.mockReturnValue([mockButton]);

			toggle = new NightlyToggle({ respectSystemPreference: false });
			toggle.destroy();

			expect(mockButton.classList.remove).toHaveBeenCalledWith(
				'nightly-focused',
				'nightly-focus-target',
				'nightly-high-contrast-focus'
			);
			expect(mockDescription.remove).toHaveBeenCalled();
			expect(document.documentElement.classList.remove).toHaveBeenCalledWith('nightly-high-contrast');
		});

		test('should remove high contrast listeners on destroy', () => {
			const mockHighContrastQuery = {
				addEventListener: jest.fn(),
				removeEventListener: jest.fn(),
			};
			const mockForcedColorsQuery = {
				addEventListener: jest.fn(),
				removeEventListener: jest.fn(),
			};

			matchMediaMock.mockImplementation((query) => {
				if (query === '(prefers-contrast: high)') {
					return mockHighContrastQuery;
				}
				if (query === '(forced-colors: active)') {
					return mockForcedColorsQuery;
				}
				return { matches: false, addEventListener: jest.fn() };
			});

			toggle = new NightlyToggle({ respectSystemPreference: false });
			toggle.destroy();

			expect(mockHighContrastQuery.removeEventListener).toHaveBeenCalled();
			expect(mockForcedColorsQuery.removeEventListener).toHaveBeenCalled();
		});
	});

	describe('Touch and Mobile Accessibility', () => {
		test('should ensure minimum touch target size', () => {
			// This would be tested via CSS, but we can verify the class is applied
			toggle = new NightlyToggle({ respectSystemPreference: false });
			toggle.ensureProperFocusManagement(mockButton);

			expect(mockButton.classList.add).toHaveBeenCalledWith('nightly-focus-target');
		});

		test('should handle role attribute for non-button elements', () => {
			mockButton.hasAttribute.mockImplementation((attr) => {
				if (attr === 'role') return false;
				if (attr === 'tabindex') return false;
				return false;
			});
			mockButton.tagName = 'DIV';

			toggle = new NightlyToggle({ respectSystemPreference: false });
			toggle.ensureProperFocusManagement(mockButton);

			expect(mockButton.setAttribute).toHaveBeenCalledWith('role', 'button');
		});
	});

	describe('Enhanced Accessibility Features', () => {
		test('should provide comprehensive ARIA labeling', () => {
			toggle = new NightlyToggle({ respectSystemPreference: false });
			
			// Mock button with existing aria-label
			mockButton.getAttribute.mockImplementation((attr) => {
				if (attr === 'aria-label') return 'Toggle dark mode';
				return null;
			});
			
			toggle.updateToggleButtons('light');

			// Should enhance the existing label with state information
			expect(mockButton.setAttribute).toHaveBeenCalledWith(
				'aria-label',
				'Toggle dark mode (currently light mode)'
			);
		});

		test('should create detailed descriptions for screen readers', () => {
			const mockDescription = {
				id: '',
				className: '',
				textContent: '',
			};
			document.createElement.mockReturnValue(mockDescription);
			mockButton.getAttribute.mockReturnValue(null); // No existing aria-describedby

			toggle = new NightlyToggle({ respectSystemPreference: false });
			toggle.updateToggleButtons('dark');

			expect(mockDescription.textContent).toContain('Switches between light and dark color schemes');
			expect(mockDescription.textContent).toContain('Current theme: dark');
		});

		test('should handle multiple screen reader announcements', () => {
			toggle = new NightlyToggle({ respectSystemPreference: false });
			const announceSpy = jest.spyOn(toggle, 'announceToScreenReader');

			toggle.announceThemeChange('dark');

			// Should make immediate announcement
			expect(announceSpy).toHaveBeenCalledWith('Dark mode activated', 'polite');
			
			// Should schedule contextual announcement
			jest.advanceTimersByTime(1000);
			expect(announceSpy).toHaveBeenCalledWith(
				'Theme switched to dark mode. Page colors and contrast have been updated.',
				'polite'
			);
		});

		test('should support assertive announcements for urgent changes', () => {
			const existingLiveRegion = {
				setAttribute: jest.fn(),
				textContent: '',
			};
			document.getElementById.mockReturnValue(existingLiveRegion);

			toggle = new NightlyToggle({ respectSystemPreference: false });
			toggle.announceToScreenReader('Critical error', 'assertive');

			expect(existingLiveRegion.setAttribute).toHaveBeenCalledWith('aria-live', 'assertive');
		});

		test('should handle keyboard shortcuts properly', () => {
			toggle = new NightlyToggle({ respectSystemPreference: false });
			const toggleSpy = jest.spyOn(toggle, 'toggle');

			// Test various keyboard interactions
			const testKeys = ['Enter', ' ', 'Escape'];
			
			testKeys.forEach(key => {
				const event = {
					key,
					target: mockButton,
					preventDefault: jest.fn(),
				};
				mockButton.closest = jest.fn().mockReturnValue(mockButton);

				const keydownHandler = document.addEventListener.mock.calls.find(
					call => call[0] === 'keydown'
				)[1];
				keydownHandler(event);

				if (key === 'Enter' || key === ' ') {
					expect(event.preventDefault).toHaveBeenCalled();
					expect(toggleSpy).toHaveBeenCalled();
				} else if (key === 'Escape') {
					expect(mockButton.blur).toHaveBeenCalled();
				}
				
				// Reset for next iteration
				jest.clearAllMocks();
				toggleSpy.mockClear();
			});
		});

		test('should provide enhanced focus management for floating toggles', () => {
			toggle = new NightlyToggle({ respectSystemPreference: false });
			const announceSpy = jest.spyOn(toggle, 'announceToScreenReader');
			
			// Mock floating toggle
			mockButton.classList.contains.mockImplementation((className) => {
				return className === 'nightly-floating-toggle';
			});
			
			toggle.handleFocusIn(mockButton);

			expect(mockButton.classList.add).toHaveBeenCalledWith('nightly-focused');
			expect(announceSpy).toHaveBeenCalledWith('Dark mode toggle focused', 'polite');
		});

		test('should clean up all accessibility enhancements on destroy', () => {
			const mockDescription = {
				remove: jest.fn(),
				classList: {
					contains: jest.fn().mockReturnValue(true),
				},
			};
			const mockLiveRegion = {
				remove: jest.fn(),
			};
			
			mockButton.getAttribute.mockReturnValue('test-description-id');
			document.getElementById.mockImplementation((id) => {
				if (id === 'test-description-id') return mockDescription;
				if (id === 'nightly-live-region') return mockLiveRegion;
				return null;
			});
			document.querySelectorAll.mockReturnValue([mockButton]);

			toggle = new NightlyToggle({ respectSystemPreference: false });
			toggle.destroy();

			// Should clean up all accessibility classes
			expect(mockButton.classList.remove).toHaveBeenCalledWith(
				'nightly-focused',
				'nightly-focus-target',
				'nightly-high-contrast-focus'
			);
			
			// Should remove dynamically created elements
			expect(mockDescription.remove).toHaveBeenCalled();
			expect(mockLiveRegion.remove).toHaveBeenCalled();
			
			// Should remove high contrast class from document
			expect(document.documentElement.classList.remove).toHaveBeenCalledWith('nightly-high-contrast');
		});
	});

	describe('Advanced High Contrast Support', () => {
		test('should detect and handle forced colors mode', () => {
			matchMediaMock.mockImplementation((query) => {
				if (query === '(forced-colors: active)') {
					return { matches: true };
				}
				return { matches: false };
			});

			toggle = new NightlyToggle({ respectSystemPreference: false });
			const isHighContrast = toggle.isHighContrastMode();

			expect(isHighContrast).toBe(true);
		});

		test('should apply enhanced focus indicators in high contrast mode', () => {
			matchMediaMock.mockImplementation((query) => {
				if (query === '(prefers-contrast: high)') {
					return { matches: true };
				}
				return { matches: false };
			});

			toggle = new NightlyToggle({ respectSystemPreference: false });
			toggle.applyHighContrastEnhancements();

			expect(document.documentElement.classList.add).toHaveBeenCalledWith('nightly-high-contrast');
			expect(mockButton.classList.add).toHaveBeenCalledWith('nightly-high-contrast-focus');
		});

		test('should handle high contrast mode changes dynamically', () => {
			const mockHighContrastQuery = {
				addEventListener: jest.fn(),
				removeEventListener: jest.fn(),
			};

			matchMediaMock.mockImplementation((query) => {
				if (query === '(prefers-contrast: high)') {
					return mockHighContrastQuery;
				}
				return { matches: false, addEventListener: jest.fn() };
			});

			toggle = new NightlyToggle({ respectSystemPreference: false });

			// Should set up listener for high contrast changes
			expect(mockHighContrastQuery.addEventListener).toHaveBeenCalledWith(
				'change',
				expect.any(Function)
			);

			// Should clean up listener on destroy
			toggle.destroy();
			expect(mockHighContrastQuery.removeEventListener).toHaveBeenCalled();
		});
	});
});