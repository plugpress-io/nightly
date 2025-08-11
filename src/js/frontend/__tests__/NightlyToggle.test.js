/**
 * Unit tests for NightlyToggle class
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

const sessionStorageMock = {
	getItem: jest.fn(),
	setItem: jest.fn(),
	removeItem: jest.fn(),
	clear: jest.fn(),
};

const matchMediaMock = jest.fn();

// Mock document.cookie
let mockCookie = '';
Object.defineProperty(document, 'cookie', {
	get: jest.fn(() => mockCookie),
	set: jest.fn((value) => {
		mockCookie = value;
	}),
});

// Set up global mocks
Object.defineProperty(window, 'localStorage', {
	value: localStorageMock,
	writable: true,
});

Object.defineProperty(window, 'sessionStorage', {
	value: sessionStorageMock,
	writable: true,
});

Object.defineProperty(window, 'matchMedia', {
	value: matchMediaMock,
	writable: true,
});

// Import the class after mocks are set up
const { NightlyToggle } = require('../index.js');

describe('NightlyToggle', () => {
	let toggle;
	
	beforeEach(() => {
		// Reset all mocks
		jest.clearAllMocks();
		mockCookie = '';
		
		// Set up default matchMedia behavior
		matchMediaMock.mockReturnValue({
			matches: false,
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
			addListener: jest.fn(),
			removeListener: jest.fn(),
		});
		
		// Mock DOM methods
		document.documentElement.setAttribute = jest.fn();
		document.documentElement.getAttribute = jest.fn().mockReturnValue('light');
		document.querySelector = jest.fn();
		document.querySelectorAll = jest.fn().mockReturnValue([]);
		document.createElement = jest.fn().mockReturnValue({
			id: '',
			setAttribute: jest.fn(),
			style: { cssText: '' },
			textContent: '',
			remove: jest.fn(),
		});
		document.getElementById = jest.fn().mockReturnValue(null);
		document.body.appendChild = jest.fn();
		document.addEventListener = jest.fn();
		document.dispatchEvent = jest.fn();
		
		// Mock console methods
		console.warn = jest.fn();
		console.log = jest.fn();
		
		// Mock CustomEvent
		global.CustomEvent = jest.fn().mockImplementation((type, options) => ({
			type,
			detail: options?.detail,
		}));
		
		// Default localStorage to return null (no saved theme)
		localStorageMock.getItem.mockReturnValue(null);
	});
	
	afterEach(() => {
		if (toggle && typeof toggle.destroy === 'function') {
			toggle.destroy();
			toggle = null;
		}
	});
	
	describe('Initialization', () => {
		test('should initialize with default options', () => {
			toggle = new NightlyToggle();
			
			expect(toggle.storageKey).toBe('nightly-theme-preference');
			expect(toggle.htmlAttribute).toBe('data-nightly-theme');
			expect(toggle.themes.LIGHT).toBe('light');
			expect(toggle.themes.DARK).toBe('dark');
			expect(toggle.options.respectSystemPreference).toBe(true);
			expect(toggle.options.transitionDuration).toBe(200);
		});
		
		test('should initialize with custom options', () => {
			const customOptions = {
				respectSystemPreference: false,
				transitionDuration: 300,
			};
			
			toggle = new NightlyToggle(customOptions);
			
			expect(toggle.options.respectSystemPreference).toBe(false);
			expect(toggle.options.transitionDuration).toBe(300);
		});
	});
	
	describe('Theme Detection', () => {
		test('should detect system preference for dark mode', () => {
			matchMediaMock.mockReturnValue({
				matches: true,
				addEventListener: jest.fn(),
				removeEventListener: jest.fn(),
				addListener: jest.fn(),
				removeListener: jest.fn(),
			});
			
			toggle = new NightlyToggle();
			const systemTheme = toggle.getSystemPreference();
			
			expect(systemTheme).toBe('dark');
		});
		
		test('should detect system preference for light mode', () => {
			matchMediaMock.mockReturnValue({
				matches: false,
				addEventListener: jest.fn(),
				removeEventListener: jest.fn(),
				addListener: jest.fn(),
				removeListener: jest.fn(),
			});
			
			toggle = new NightlyToggle();
			const systemTheme = toggle.getSystemPreference();
			
			expect(systemTheme).toBe('light');
		});
	});
	
	describe('Storage Handling', () => {
		test('should save theme to localStorage', () => {
			toggle = new NightlyToggle({ respectSystemPreference: false });
			
			toggle.saveTheme('dark');
			
			expect(localStorageMock.setItem).toHaveBeenCalledWith('nightly-theme-preference', 'dark');
		});
		
		test('should retrieve theme from localStorage', () => {
			localStorageMock.getItem.mockReturnValue('dark');
			
			toggle = new NightlyToggle({ respectSystemPreference: false });
			const savedTheme = toggle.getSavedTheme();
			
			expect(savedTheme).toBe('dark');
			expect(localStorageMock.getItem).toHaveBeenCalledWith('nightly-theme-preference');
		});
		
		test('should fallback to sessionStorage when localStorage fails', () => {
			localStorageMock.getItem.mockImplementation(() => {
				throw new Error('localStorage not available');
			});
			sessionStorageMock.getItem.mockReturnValue('dark');
			
			toggle = new NightlyToggle({ respectSystemPreference: false });
			const savedTheme = toggle.getSavedTheme();
			
			expect(savedTheme).toBe('dark');
			expect(sessionStorageMock.getItem).toHaveBeenCalledWith('nightly-theme-preference');
		});
		
		test('should fallback to cookies when both localStorage and sessionStorage fail', () => {
			localStorageMock.getItem.mockImplementation(() => {
				throw new Error('localStorage not available');
			});
			sessionStorageMock.getItem.mockImplementation(() => {
				throw new Error('sessionStorage not available');
			});
			
			// Mock cookie with theme
			mockCookie = 'nightly-theme-preference=dark; path=/';
			
			toggle = new NightlyToggle({ respectSystemPreference: false });
			const savedTheme = toggle.getSavedTheme();
			
			expect(savedTheme).toBe('dark');
		});
		
		test('should save to cookie when localStorage and sessionStorage fail', () => {
			localStorageMock.setItem.mockImplementation(() => {
				throw new Error('localStorage not available');
			});
			sessionStorageMock.setItem.mockImplementation(() => {
				throw new Error('sessionStorage not available');
			});
			
			toggle = new NightlyToggle({ respectSystemPreference: false });
			
			// Clear cookie first
			mockCookie = '';
			
			toggle.saveTheme('dark');
			
			expect(mockCookie).toContain('nightly-theme-preference=dark');
		});
	});
	
	describe('Theme Setting', () => {
		test('should set theme and update HTML attribute', () => {
			toggle = new NightlyToggle({ respectSystemPreference: false });
			
			toggle.setTheme('dark');
			
			expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-nightly-theme', 'dark');
		});
		
		test('should save theme when save parameter is true', () => {
			toggle = new NightlyToggle({ respectSystemPreference: false });
			
			// Clear any calls from initialization
			localStorageMock.setItem.mockClear();
			
			toggle.setTheme('dark', true);
			
			expect(localStorageMock.setItem).toHaveBeenCalledWith('nightly-theme-preference', 'dark');
		});
		
		test('should not save theme when save parameter is false', () => {
			toggle = new NightlyToggle({ respectSystemPreference: false });
			
			// Clear any calls from initialization
			localStorageMock.setItem.mockClear();
			
			toggle.setTheme('dark', false);
			
			expect(localStorageMock.setItem).not.toHaveBeenCalled();
		});
		
		test('should warn about invalid theme', () => {
			toggle = new NightlyToggle({ respectSystemPreference: false });
			
			toggle.setTheme('invalid-theme');
			
			expect(console.warn).toHaveBeenCalledWith('Nightly: Invalid theme "invalid-theme"');
		});
		
		test('should dispatch theme change event', () => {
			toggle = new NightlyToggle({ respectSystemPreference: false });
			
			toggle.setTheme('dark');
			
			expect(document.dispatchEvent).toHaveBeenCalledWith(
				expect.objectContaining({
					type: 'nightlyThemeChange',
					detail: expect.objectContaining({
						theme: 'dark',
						previousTheme: 'light',
					}),
				})
			);
		});
	});
	
	describe('Theme Toggling', () => {
		test('should toggle from light to dark', () => {
			document.documentElement.getAttribute.mockReturnValue('light');
			
			toggle = new NightlyToggle({ respectSystemPreference: false });
			
			// Clear any calls from initialization
			document.documentElement.setAttribute.mockClear();
			
			toggle.toggle();
			
			expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-nightly-theme', 'dark');
		});
		
		test('should toggle from dark to light', () => {
			document.documentElement.getAttribute.mockReturnValue('dark');
			
			toggle = new NightlyToggle({ respectSystemPreference: false });
			
			// Clear any calls from initialization
			document.documentElement.setAttribute.mockClear();
			
			toggle.toggle();
			
			expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-nightly-theme', 'light');
		});
	});
	
	describe('Button Updates', () => {
		test('should update toggle buttons with correct ARIA attributes', () => {
			const mockButton = {
				setAttribute: jest.fn(),
				getAttribute: jest.fn(),
				querySelector: jest.fn().mockReturnValue(null),
			};
			
			document.querySelectorAll.mockReturnValue([mockButton]);
			
			toggle = new NightlyToggle({ respectSystemPreference: false });
			toggle.updateToggleButtons('dark');
			
			expect(mockButton.setAttribute).toHaveBeenCalledWith('aria-pressed', 'true');
		});
		
		test('should update button text when text elements exist', () => {
			const mockTextElement = { textContent: '' };
			const mockButton = {
				setAttribute: jest.fn(),
				getAttribute: jest.fn().mockReturnValue('Switch to light mode'),
				querySelector: jest.fn().mockReturnValue(mockTextElement),
			};
			
			document.querySelectorAll.mockReturnValue([mockButton]);
			
			toggle = new NightlyToggle({ respectSystemPreference: false });
			toggle.updateToggleButtons('dark');
			
			expect(mockTextElement.textContent).toBe('Switch to light mode');
		});
	});
	
	describe('System Preference Changes', () => {
		test('should listen for system preference changes', () => {
			const mockMediaQuery = {
				matches: false,
				addEventListener: jest.fn(),
				removeEventListener: jest.fn(),
				addListener: jest.fn(),
				removeListener: jest.fn(),
			};
			
			matchMediaMock.mockReturnValue(mockMediaQuery);
			
			toggle = new NightlyToggle();
			
			expect(mockMediaQuery.addEventListener).toHaveBeenCalledWith('change', toggle.handleSystemPreferenceChange);
		});
		
		test('should handle system preference change when no saved theme exists', () => {
			localStorageMock.getItem.mockReturnValue(null);
			
			toggle = new NightlyToggle({ respectSystemPreference: false });
			
			// Clear any calls from initialization
			document.documentElement.setAttribute.mockClear();
			
			const mockEvent = { matches: true };
			toggle.handleSystemPreferenceChange(mockEvent);
			
			expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-nightly-theme', 'dark');
		});
		
		test('should not change theme when user has saved preference', () => {
			localStorageMock.getItem.mockReturnValue('light');
			
			toggle = new NightlyToggle({ respectSystemPreference: false });
			
			// Clear any calls from initialization
			document.documentElement.setAttribute.mockClear();
			
			const mockEvent = { matches: true };
			toggle.handleSystemPreferenceChange(mockEvent);
			
			// Should not change from saved preference
			expect(document.documentElement.setAttribute).not.toHaveBeenCalledWith('data-nightly-theme', 'dark');
		});
	});
	
	describe('Accessibility', () => {
		test('should create live region for screen reader announcements', () => {
			const mockLiveRegion = {
				id: '',
				setAttribute: jest.fn(),
				style: { cssText: '' },
				textContent: '',
			};
			
			document.createElement.mockReturnValue(mockLiveRegion);
			document.getElementById.mockReturnValue(null);
			
			toggle = new NightlyToggle({ respectSystemPreference: false });
			toggle.announceThemeChange('dark');
			
			expect(mockLiveRegion.setAttribute).toHaveBeenCalledWith('aria-live', 'polite');
			expect(mockLiveRegion.setAttribute).toHaveBeenCalledWith('aria-atomic', 'true');
			expect(mockLiveRegion.textContent).toBe('Dark mode activated');
		});
		
		test('should update existing live region', () => {
			const mockLiveRegion = { 
				textContent: '',
				remove: jest.fn()
			};
			document.getElementById.mockReturnValue(mockLiveRegion);
			
			toggle = new NightlyToggle({ respectSystemPreference: false });
			toggle.announceThemeChange('light');
			
			expect(mockLiveRegion.textContent).toBe('Light mode activated');
		});
	});
	
	describe('Reset Functionality', () => {
		test('should reset to system preference', () => {
			matchMediaMock.mockReturnValue({
				matches: true, // Dark mode preference
				addEventListener: jest.fn(),
				removeEventListener: jest.fn(),
				addListener: jest.fn(),
				removeListener: jest.fn(),
			});
			
			toggle = new NightlyToggle({ respectSystemPreference: false });
			
			// Clear any calls from initialization
			localStorageMock.removeItem.mockClear();
			document.documentElement.setAttribute.mockClear();
			
			toggle.resetToSystemPreference();
			
			expect(localStorageMock.removeItem).toHaveBeenCalledWith('nightly-theme-preference');
			expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-nightly-theme', 'dark');
		});
	});
	
	describe('Cleanup', () => {
		test('should clean up event listeners and DOM elements on destroy', () => {
			const mockMediaQuery = {
				matches: false,
				addEventListener: jest.fn(),
				removeEventListener: jest.fn(),
				addListener: jest.fn(),
				removeListener: jest.fn(),
			};
			
			const mockLiveRegion = { remove: jest.fn() };
			
			matchMediaMock.mockReturnValue(mockMediaQuery);
			document.getElementById.mockReturnValue(mockLiveRegion);
			
			toggle = new NightlyToggle({ respectSystemPreference: false });
			toggle.destroy();
			
			expect(mockMediaQuery.removeEventListener).toHaveBeenCalledWith('change', toggle.handleSystemPreferenceChange);
			expect(mockLiveRegion.remove).toHaveBeenCalled();
		});
	});
});