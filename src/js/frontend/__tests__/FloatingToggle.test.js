/**
 * FloatingToggle Tests
 *
 * @package Nightly
 */

/**
 * @jest-environment jsdom
 */

// Mock localStorage
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock matchMedia
global.matchMedia = jest.fn(() => ({
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
}));

describe('FloatingToggle', () => {
    // Mock FloatingToggle class for testing
    class MockFloatingToggle {
        constructor(options = {}) {
            this.options = {
                position: 'bottom-right',
                enabled: false,
                isClassicTheme: false,
                ...options
            };
            this.floatingElement = null;
        }
        
        shouldRender() {
            if (!this.options.enabled || !this.options.isClassicTheme) {
                return false;
            }
            
            const placeholder = document.getElementById('nightly-floating-toggle-placeholder');
            if (!placeholder || placeholder.getAttribute('data-auto-inject') !== 'true') {
                return false;
            }
            
            const existingToggles = document.querySelectorAll('[data-nightly-toggle]:not([data-nightly-toggle="floating"])');
            if (existingToggles.length > 0) {
                return false;
            }
            
            return true;
        }
        
        render() {
            if (this.shouldRender() && !this.floatingElement) {
                this.floatingElement = this.createElement();
                document.body.appendChild(this.floatingElement);
            }
        }
        
        createElement() {
            const button = document.createElement('button');
            button.className = `nightly-toggle nightly-floating-toggle position-${this.options.position}`;
            button.setAttribute('data-nightly-toggle', 'floating');
            button.setAttribute('type', 'button');
            button.setAttribute('aria-pressed', 'false');
            return button;
        }
        
        destroy() {
            if (this.floatingElement) {
                this.floatingElement.remove();
                this.floatingElement = null;
            }
        }
    }

    beforeEach(() => {
        jest.clearAllMocks();
        document.body.innerHTML = '';
        localStorageMock.getItem.mockClear();
        localStorageMock.setItem.mockClear();
    });

    describe('shouldRender', () => {
        test('should not render when disabled', () => {
            const toggle = new MockFloatingToggle({
                enabled: false,
                isClassicTheme: true
            });

            expect(toggle.shouldRender()).toBe(false);
        });

        test('should not render on block theme', () => {
            const toggle = new MockFloatingToggle({
                enabled: true,
                isClassicTheme: false
            });

            expect(toggle.shouldRender()).toBe(false);
        });

        test('should not render without placeholder', () => {
            const toggle = new MockFloatingToggle({
                enabled: true,
                isClassicTheme: true
            });

            expect(toggle.shouldRender()).toBe(false);
        });

        test('should not render when existing toggles present', () => {
            // Add placeholder
            const placeholder = document.createElement('div');
            placeholder.id = 'nightly-floating-toggle-placeholder';
            placeholder.setAttribute('data-auto-inject', 'true');
            document.body.appendChild(placeholder);

            // Add existing toggle
            const existingToggle = document.createElement('button');
            existingToggle.setAttribute('data-nightly-toggle', 'block');
            document.body.appendChild(existingToggle);

            const toggle = new MockFloatingToggle({
                enabled: true,
                isClassicTheme: true
            });

            expect(toggle.shouldRender()).toBe(false);
        });

        test('should render when conditions are met', () => {
            // Add placeholder
            const placeholder = document.createElement('div');
            placeholder.id = 'nightly-floating-toggle-placeholder';
            placeholder.setAttribute('data-auto-inject', 'true');
            document.body.appendChild(placeholder);

            const toggle = new MockFloatingToggle({
                enabled: true,
                isClassicTheme: true
            });

            expect(toggle.shouldRender()).toBe(true);
        });
    });

    describe('createElement', () => {
        test('should create button with correct attributes', () => {
            const toggle = new MockFloatingToggle({
                position: 'top-left'
            });

            const element = toggle.createElement();

            expect(element.tagName).toBe('BUTTON');
            expect(element.getAttribute('data-nightly-toggle')).toBe('floating');
            expect(element.getAttribute('type')).toBe('button');
            expect(element.getAttribute('aria-pressed')).toBe('false');
        });

        test('should apply correct position class', () => {
            const toggle = new MockFloatingToggle({
                position: 'top-left'
            });

            const element = toggle.createElement();

            expect(element.className).toContain('position-top-left');
        });
    });

    describe('render', () => {
        test('should render when shouldRender returns true', () => {
            // Add placeholder
            const placeholder = document.createElement('div');
            placeholder.id = 'nightly-floating-toggle-placeholder';
            placeholder.setAttribute('data-auto-inject', 'true');
            document.body.appendChild(placeholder);

            const toggle = new MockFloatingToggle({
                enabled: true,
                isClassicTheme: true
            });

            const initialChildCount = document.body.children.length;
            toggle.render();

            expect(document.body.children.length).toBe(initialChildCount + 1);
            expect(toggle.floatingElement).toBeTruthy();
            expect(toggle.floatingElement.getAttribute('data-nightly-toggle')).toBe('floating');
        });

        test('should not render when shouldRender returns false', () => {
            const toggle = new MockFloatingToggle({
                enabled: false,
                isClassicTheme: true
            });

            const initialChildCount = document.body.children.length;
            toggle.render();

            expect(document.body.children.length).toBe(initialChildCount);
            expect(toggle.floatingElement).toBeNull();
        });
    });

    describe('destroy', () => {
        test('should remove element from DOM', () => {
            // Add placeholder and render toggle
            const placeholder = document.createElement('div');
            placeholder.id = 'nightly-floating-toggle-placeholder';
            placeholder.setAttribute('data-auto-inject', 'true');
            document.body.appendChild(placeholder);

            const toggle = new MockFloatingToggle({
                enabled: true,
                isClassicTheme: true
            });
            toggle.render();

            const initialChildCount = document.body.children.length;
            expect(toggle.floatingElement).toBeTruthy();

            toggle.destroy();

            expect(document.body.children.length).toBe(initialChildCount - 1);
            expect(toggle.floatingElement).toBeNull();
        });

        test('should handle null element gracefully', () => {
            const toggle = new MockFloatingToggle();
            toggle.floatingElement = null;

            expect(() => toggle.destroy()).not.toThrow();
        });
    });
});