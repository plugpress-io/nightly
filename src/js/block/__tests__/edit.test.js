/**
 * Block Edit Component Tests
 *
 * @package Nightly
 */

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Edit from '../edit';

// Mock WordPress dependencies
jest.mock('@wordpress/i18n', () => ({
    __: (text) => text,
}));

jest.mock('@wordpress/block-editor', () => ({
    useBlockProps: jest.fn((props) => props || { className: 'wp-block-nightly-toggle' }),
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

describe('Edit Component', () => {
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

    test('renders with default attributes', () => {
        render(<Edit attributes={defaultAttributes} setAttributes={mockSetAttributes} />);

        expect(screen.getByText('Toggle Dark Mode')).toBeInTheDocument();
        expect(screen.getByText('☀️')).toBeInTheDocument();
        expect(screen.getByText('Preview only - actual toggle will work on frontend')).toBeInTheDocument();
    });

    test('renders without icon when showIcon is false', () => {
        const attributes = { ...defaultAttributes, showIcon: false };
        render(<Edit attributes={attributes} setAttributes={mockSetAttributes} />);

        expect(screen.getByText('Toggle Dark Mode')).toBeInTheDocument();
        expect(screen.queryByText('☀️')).not.toBeInTheDocument();
    });

    test('renders inspector controls', () => {
        render(<Edit attributes={defaultAttributes} setAttributes={mockSetAttributes} />);

        expect(screen.getByTestId('inspector-controls')).toBeInTheDocument();
        expect(screen.getByText('Toggle Settings')).toBeInTheDocument();
        expect(screen.getByText('Button Text')).toBeInTheDocument();
        expect(screen.getByText('Show Icon')).toBeInTheDocument();
    });

    test('renders block controls with alignment toolbar', () => {
        render(<Edit attributes={defaultAttributes} setAttributes={mockSetAttributes} />);

        expect(screen.getByTestId('block-controls')).toBeInTheDocument();
        expect(screen.getByTestId('alignment-toolbar')).toBeInTheDocument();
    });

    test('updates button text when changed', () => {
        render(<Edit attributes={defaultAttributes} setAttributes={mockSetAttributes} />);

        const textInput = screen.getByDisplayValue('Toggle Dark Mode');
        fireEvent.change(textInput, { target: { value: 'Switch Theme' } });

        expect(mockSetAttributes).toHaveBeenCalledWith({ buttonText: 'Switch Theme' });
    });

    test('updates showIcon when toggled', () => {
        render(<Edit attributes={defaultAttributes} setAttributes={mockSetAttributes} />);

        const iconToggle = screen.getByRole('checkbox');
        fireEvent.click(iconToggle);

        expect(mockSetAttributes).toHaveBeenCalledWith({ showIcon: false });
    });

    test('updates alignment when changed', () => {
        render(<Edit attributes={defaultAttributes} setAttributes={mockSetAttributes} />);

        const centerButton = screen.getByText('Center');
        fireEvent.click(centerButton);

        expect(mockSetAttributes).toHaveBeenCalledWith({ alignment: 'center' });
    });

    test('toggles preview state when button is clicked', () => {
        render(<Edit attributes={defaultAttributes} setAttributes={mockSetAttributes} />);

        const toggleButton = screen.getByRole('button', { name: /toggle dark mode/i });
        
        // Initial state
        expect(toggleButton).toHaveAttribute('aria-pressed', 'false');
        expect(toggleButton).not.toHaveClass('is-toggled');

        // Click to toggle
        fireEvent.click(toggleButton);
        
        expect(toggleButton).toHaveAttribute('aria-pressed', 'true');
        expect(toggleButton).toHaveClass('is-toggled');
        expect(screen.getByText('🌙')).toBeInTheDocument();
    });

    test('applies custom className', () => {
        const attributes = { ...defaultAttributes, customClassName: 'my-custom-class' };
        const { container } = render(<Edit attributes={attributes} setAttributes={mockSetAttributes} />);

        const blockElement = container.querySelector('.my-custom-class');
        expect(blockElement).toBeInTheDocument();
    });

    test('applies alignment class', () => {
        const attributes = { ...defaultAttributes, alignment: 'center' };
        const { container } = render(<Edit attributes={attributes} setAttributes={mockSetAttributes} />);

        const blockElement = container.querySelector('.align-center');
        expect(blockElement).toBeInTheDocument();
    });
});