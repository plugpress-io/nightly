/**
 * Block Save Component Tests
 *
 * @package Nightly
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Save from '../save';

// Mock WordPress dependencies
jest.mock('@wordpress/i18n', () => ({
    __: (text) => text,
}));

jest.mock('@wordpress/block-editor', () => ({
    useBlockProps: {
        save: jest.fn((props) => props || {}),
    },
}));

describe('Save Component', () => {
    const defaultAttributes = {
        buttonText: 'Toggle Dark Mode',
        showIcon: true,
        alignment: 'left',
        customClassName: '',
    };

    test('renders with default attributes', () => {
        render(<Save attributes={defaultAttributes} />);

        const button = screen.getByRole('button');
        expect(button).toHaveTextContent('Toggle Dark Mode');
        expect(button).toHaveAttribute('aria-pressed', 'false');
        expect(button).toHaveAttribute('aria-label', 'Toggle between light and dark mode');
        expect(button).toHaveAttribute('data-nightly-toggle', 'true');
    });

    test('renders with icon when showIcon is true', () => {
        render(<Save attributes={defaultAttributes} />);

        expect(screen.getByText('☀️')).toBeInTheDocument();
        expect(screen.getByText('🌙')).toBeInTheDocument();
        
        const iconContainer = screen.getByText('☀️').parentElement;
        expect(iconContainer).toHaveClass('nightly-toggle-icon');
        expect(iconContainer).toHaveAttribute('aria-hidden', 'true');
    });

    test('renders without icon when showIcon is false', () => {
        const attributes = { ...defaultAttributes, showIcon: false };
        const { container } = render(<Save attributes={attributes} />);

        expect(screen.queryByText('☀️')).not.toBeInTheDocument();
        expect(screen.queryByText('🌙')).not.toBeInTheDocument();
        expect(container.querySelector('.nightly-toggle-icon')).not.toBeInTheDocument();
    });

    test('renders custom button text', () => {
        const attributes = { ...defaultAttributes, buttonText: 'Switch Theme' };
        render(<Save attributes={attributes} />);

        expect(screen.getByText('Switch Theme')).toBeInTheDocument();
    });

    test('applies alignment class', () => {
        const attributes = { ...defaultAttributes, alignment: 'center' };
        render(<Save attributes={attributes} />);

        const container = screen.getByRole('button').parentElement;
        expect(container).toHaveClass('align-center');
    });

    test('applies custom className', () => {
        const attributes = { ...defaultAttributes, customClassName: 'my-custom-class' };
        render(<Save attributes={attributes} />);

        const container = screen.getByRole('button').parentElement;
        expect(container).toHaveClass('my-custom-class');
    });

    test('includes screen reader text for current state', () => {
        render(<Save attributes={defaultAttributes} />);

        const srText = screen.getByText('Current theme: light');
        expect(srText).toHaveClass('screen-reader-text');
        expect(srText).toHaveClass('nightly-sr-state');
    });

    test('has proper accessibility attributes', () => {
        render(<Save attributes={defaultAttributes} />);

        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('type', 'button');
        expect(button).toHaveAttribute('aria-pressed', 'false');
        expect(button).toHaveAttribute('aria-label', 'Toggle between light and dark mode');
        expect(button).toHaveClass('nightly-toggle-button');
    });

    test('renders with all alignment options', () => {
        const alignments = ['left', 'center', 'right'];
        
        alignments.forEach(alignment => {
            const attributes = { ...defaultAttributes, alignment };
            const { container } = render(<Save attributes={attributes} />);
            
            const blockContainer = container.querySelector('.nightly-toggle-block');
            expect(blockContainer).toHaveClass(`align-${alignment}`);
            
            // Clean up for next iteration
            container.remove();
        });
    });

    test('handles empty custom className gracefully', () => {
        const attributes = { ...defaultAttributes, customClassName: '' };
        render(<Save attributes={attributes} />);

        const container = screen.getByRole('button').parentElement;
        expect(container).toHaveClass('nightly-toggle-block');
        expect(container).toHaveClass('align-left');
        // Should not have empty class
        expect(container.className).not.toContain('  '); // No double spaces
    });
});