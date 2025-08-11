/**
 * Block Accessibility Tests
 *
 * @package Nightly
 */

import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Edit from '../edit';
import Save from '../save';

// Mock WordPress dependencies
jest.mock('@wordpress/i18n', () => ({
    __: (text) => text.replace('%s', 'PLACEHOLDER'),
}));

jest.mock('@wordpress/block-editor', () => ({
    useBlockProps: Object.assign(
        jest.fn((props) => props || { className: 'wp-block-nightly-toggle' }),
        {
            save: jest.fn((props) => props || { className: 'wp-block-nightly-toggle' })
        }
    ),
    InspectorControls: ({ children }) => <div data-testid="inspector-controls">{children}</div>,
    BlockControls: ({ children }) => <div data-testid="block-controls">{children}</div>,
    AlignmentToolbar: ({ value, onChange }) => (
        <div data-testid="alignment-toolbar">
            <button onClick={() => onChange('left')}>Left</button>
            <button onClick={() => onChange('center')}>Center</button>
            <button onClick={() => onChange('right')}>Right</button>
        </div>
    ),
}));

jest.mock('@wordpress/components', () => ({
    PanelBody: ({ title, children }) => (
        <div data-testid="panel-body">
            <h3>{title}</h3>
            {children}
        </div>
    ),
    TextControl: ({ label, value, onChange, help }) => (
        <div data-testid="text-control">
            <label>{label}</label>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                aria-describedby="help"
            />
            <div id="help">{help}</div>
        </div>
    ),
    ToggleControl: ({ label, checked, onChange, help }) => (
        <div data-testid="toggle-control">
            <label>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                />
                {label}
            </label>
            <div>{help}</div>
        </div>
    ),
    Button: ({ children, onClick, className, ...props }) => (
        <button onClick={onClick} className={className} {...props}>
            {children}
        </button>
    ),
}));

describe('Block Accessibility', () => {
    const defaultAttributes = {
        buttonText: 'Toggle Dark Mode',
        showIcon: true,
        alignment: 'left',
        customClassName: '',
    };

    const mockSetAttributes = jest.fn();

    beforeEach(() => {
        mockSetAttributes.mockClear();
    });

    describe('Edit Component Accessibility', () => {
        test('should have proper ARIA attributes in editor', () => {
            render(<Edit attributes={defaultAttributes} setAttributes={mockSetAttributes} />);

            const button = screen.getByRole('switch');
            expect(button).toHaveAttribute('aria-pressed', 'false');
            expect(button).toHaveAttribute('aria-label', expect.stringContaining('currently light mode'));
            expect(button).toHaveAttribute('aria-keyshortcuts', 'Enter Space');
            expect(button).toHaveAttribute('tabIndex', '0');
        });

        test('should update ARIA attributes when toggled in editor', async () => {
            const user = userEvent.setup();
            render(<Edit attributes={defaultAttributes} setAttributes={mockSetAttributes} />);

            const button = screen.getByRole('switch');
            await user.click(button);

            expect(button).toHaveAttribute('aria-pressed', 'true');
            expect(button).toHaveAttribute('aria-label', expect.stringContaining('currently dark mode'));
        });

        test('should have screen reader text for editor context', () => {
            render(<Edit attributes={defaultAttributes} setAttributes={mockSetAttributes} />);

            expect(screen.getByText('Editor preview - actual functionality available on frontend')).toBeInTheDocument();
        });

        test('should have proper role for editor notice', () => {
            render(<Edit attributes={defaultAttributes} setAttributes={mockSetAttributes} />);

            const notice = screen.getByRole('note');
            expect(notice).toHaveAttribute('aria-live', 'polite');
        });

        test('should handle keyboard navigation in editor', async () => {
            const user = userEvent.setup();
            render(<Edit attributes={defaultAttributes} setAttributes={mockSetAttributes} />);

            const button = screen.getByRole('switch');
            button.focus();
            
            // Test Enter key
            await user.keyboard('{Enter}');
            expect(button).toHaveAttribute('aria-pressed', 'true');

            // Test Space key
            await user.keyboard(' ');
            expect(button).toHaveAttribute('aria-pressed', 'false');
        });

        test('should have accessible form controls in inspector', () => {
            render(<Edit attributes={defaultAttributes} setAttributes={mockSetAttributes} />);

            // Text control should have proper labeling
            const textInput = screen.getByDisplayValue('Toggle Dark Mode');
            expect(textInput).toHaveAttribute('aria-describedby', 'help');

            // Toggle control should be properly labeled
            const iconToggle = screen.getByRole('checkbox');
            expect(iconToggle).toBeInTheDocument();
        });
    });

    describe('Save Component Accessibility', () => {
        test('should have comprehensive ARIA attributes', () => {
            const { container } = render(<Save attributes={defaultAttributes} />);

            const button = container.querySelector('button[data-nightly-toggle="true"]');
            expect(button).toHaveAttribute('type', 'button');
            expect(button).toHaveAttribute('role', 'switch');
            expect(button).toHaveAttribute('aria-pressed', 'false');
            expect(button).toHaveAttribute('aria-label', expect.stringContaining('currently light mode'));
            expect(button).toHaveAttribute('aria-keyshortcuts', 'Enter Space');
            expect(button).toHaveAttribute('tabIndex', '0');
        });

        test('should have data attributes for dynamic text', () => {
            const { container } = render(<Save attributes={defaultAttributes} />);

            const button = container.querySelector('button[data-nightly-toggle="true"]');
            expect(button).toHaveAttribute('data-light-text', 'Switch to dark mode');
            expect(button).toHaveAttribute('data-dark-text', 'Switch to light mode');
        });

        test('should have proper icon accessibility', () => {
            const { container } = render(<Save attributes={defaultAttributes} />);

            const icon = container.querySelector('.nightly-toggle-icon');
            expect(icon).toHaveAttribute('aria-hidden', 'true');

            // Should have both light and dark icons
            expect(container.querySelector('.nightly-icon-light')).toBeInTheDocument();
            expect(container.querySelector('.nightly-icon-dark')).toBeInTheDocument();
        });

        test('should have screen reader state text', () => {
            const { container } = render(<Save attributes={defaultAttributes} />);

            const stateText = container.querySelector('.nightly-sr-state');
            expect(stateText).toHaveClass('screen-reader-text');
            expect(stateText).toHaveTextContent('Current theme: light');
        });

        test('should have descriptive screen reader text', () => {
            const { container } = render(<Save attributes={defaultAttributes} />);

            const description = container.querySelector('.nightly-toggle-description');
            expect(description).toHaveClass('screen-reader-text');
            expect(description).toHaveTextContent('Switches between light and dark color schemes for better readability');
        });

        test('should render without icon when showIcon is false', () => {
            const attributes = { ...defaultAttributes, showIcon: false };
            const { container } = render(<Save attributes={attributes} />);

            expect(container.querySelector('.nightly-toggle-icon')).not.toBeInTheDocument();
        });

        test('should have proper button text', () => {
            const { container } = render(<Save attributes={defaultAttributes} />);

            const buttonText = container.querySelector('.nightly-toggle-text');
            expect(buttonText).toHaveTextContent('Toggle Dark Mode');
        });

        test('should apply custom className', () => {
            const attributes = { ...defaultAttributes, customClassName: 'my-custom-class' };
            const { container } = render(<Save attributes={attributes} />);

            expect(container.firstChild).toHaveClass('my-custom-class');
        });

        test('should apply alignment class', () => {
            const attributes = { ...defaultAttributes, alignment: 'center' };
            const { container } = render(<Save attributes={attributes} />);

            expect(container.firstChild).toHaveClass('align-center');
        });
    });

    describe('Keyboard Interaction', () => {
        test('should be focusable with tab key', () => {
            render(<Edit attributes={defaultAttributes} setAttributes={mockSetAttributes} />);

            const button = screen.getByRole('switch');
            expect(button).toHaveAttribute('tabIndex', '0');
        });

        test('should handle Enter key activation', async () => {
            const user = userEvent.setup();
            render(<Edit attributes={defaultAttributes} setAttributes={mockSetAttributes} />);

            const button = screen.getByRole('switch');
            button.focus();
            await user.keyboard('{Enter}');

            expect(button).toHaveAttribute('aria-pressed', 'true');
        });

        test('should handle Space key activation', async () => {
            const user = userEvent.setup();
            render(<Edit attributes={defaultAttributes} setAttributes={mockSetAttributes} />);

            const button = screen.getByRole('switch');
            button.focus();
            await user.keyboard(' ');

            expect(button).toHaveAttribute('aria-pressed', 'true');
        });
    });

    describe('Screen Reader Support', () => {
        test('should announce current state', () => {
            const { container } = render(<Save attributes={defaultAttributes} />);

            const stateAnnouncement = container.querySelector('.nightly-sr-state');
            expect(stateAnnouncement).toHaveTextContent('Current theme: light');
        });

        test('should provide context for screen readers', () => {
            const { container } = render(<Save attributes={defaultAttributes} />);

            const description = container.querySelector('.nightly-toggle-description');
            expect(description).toHaveTextContent('Switches between light and dark color schemes for better readability');
        });

        test('should hide decorative icons from screen readers', () => {
            const { container } = render(<Save attributes={defaultAttributes} />);

            const icon = container.querySelector('.nightly-toggle-icon');
            expect(icon).toHaveAttribute('aria-hidden', 'true');
        });

        test('should provide editor-specific context', () => {
            render(<Edit attributes={defaultAttributes} setAttributes={mockSetAttributes} />);

            expect(screen.getByText('Editor preview - actual functionality available on frontend')).toBeInTheDocument();
        });
    });

    describe('High Contrast and Visual Accessibility', () => {
        test('should have proper button structure for styling', () => {
            const { container } = render(<Save attributes={defaultAttributes} />);

            const button = container.querySelector('button');
            expect(button).toHaveClass('nightly-toggle-button');
        });

        test('should have proper icon structure for CSS styling', () => {
            const { container } = render(<Save attributes={defaultAttributes} />);

            const lightIcon = container.querySelector('.nightly-icon-light');
            const darkIcon = container.querySelector('.nightly-icon-dark');
            
            expect(lightIcon).toBeInTheDocument();
            expect(darkIcon).toBeInTheDocument();
        });

        test('should have minimum touch target considerations in class structure', () => {
            const { container } = render(<Save attributes={defaultAttributes} />);

            const button = container.querySelector('button');
            expect(button).toHaveClass('nightly-toggle-button');
            // Minimum touch target size is handled by CSS
        });
    });

    describe('Form Accessibility in Editor', () => {
        test('should have proper form labels', () => {
            render(<Edit attributes={defaultAttributes} setAttributes={mockSetAttributes} />);

            expect(screen.getByText('Button Text')).toBeInTheDocument();
            expect(screen.getByText('Show Icon')).toBeInTheDocument();
        });

        test('should have help text for form controls', () => {
            render(<Edit attributes={defaultAttributes} setAttributes={mockSetAttributes} />);

            expect(screen.getByText('Text displayed on the toggle button')).toBeInTheDocument();
            expect(screen.getByText('Display an icon alongside the button text')).toBeInTheDocument();
        });

        test('should have accessible alignment controls', () => {
            render(<Edit attributes={defaultAttributes} setAttributes={mockSetAttributes} />);

            const alignmentToolbar = screen.getByTestId('alignment-toolbar');
            expect(alignmentToolbar).toBeInTheDocument();
            
            expect(screen.getByText('Left')).toBeInTheDocument();
            expect(screen.getByText('Center')).toBeInTheDocument();
            expect(screen.getByText('Right')).toBeInTheDocument();
        });
    });
});