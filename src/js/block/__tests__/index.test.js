/**
 * Block Registration Tests
 *
 * @package Nightly
 */

// Mock WordPress dependencies
const mockRegisterBlockType = jest.fn();

jest.mock('@wordpress/blocks', () => ({
    registerBlockType: mockRegisterBlockType,
}));

jest.mock('@wordpress/i18n', () => ({
    __: (text) => text,
}));

// Mock the edit and save components
jest.mock('../edit', () => {
    return function MockEdit() {
        return <div data-testid="mock-edit">Edit Component</div>;
    };
});

jest.mock('../save', () => {
    return function MockSave() {
        return <div data-testid="mock-save">Save Component</div>;
    };
});

// Mock block.json
jest.mock('../block.json', () => ({
    name: 'nightly/toggle',
    title: 'Nightly',
    category: 'widgets',
    attributes: {
        buttonText: {
            type: 'string',
            default: 'Toggle Dark Mode'
        },
        showIcon: {
            type: 'boolean',
            default: true
        },
        alignment: {
            type: 'string',
            default: 'left'
        }
    }
}));

describe('Block Registration', () => {
    beforeEach(() => {
        mockRegisterBlockType.mockClear();
        jest.resetModules();
    });

    test('registers block with correct name and metadata', () => {
        // Import the index file to trigger registration
        require('../index');

        expect(mockRegisterBlockType).toHaveBeenCalledTimes(1);
        
        const [blockName, blockConfig] = mockRegisterBlockType.mock.calls[0];
        
        expect(blockName).toBe('nightly/toggle');
        expect(blockConfig).toHaveProperty('name', 'nightly/toggle');
        expect(blockConfig).toHaveProperty('title', 'Nightly');
        expect(blockConfig).toHaveProperty('category', 'widgets');
    });

    test('registers block with edit and save components', () => {
        require('../index');

        const [, blockConfig] = mockRegisterBlockType.mock.calls[0];
        
        expect(blockConfig).toHaveProperty('edit');
        expect(blockConfig).toHaveProperty('save');
        expect(typeof blockConfig.edit).toBe('function');
        expect(typeof blockConfig.save).toBe('function');
    });

    test('registers block with correct attributes', () => {
        require('../index');

        const [, blockConfig] = mockRegisterBlockType.mock.calls[0];
        
        expect(blockConfig.attributes).toEqual({
            buttonText: {
                type: 'string',
                default: 'Toggle Dark Mode'
            },
            showIcon: {
                type: 'boolean',
                default: true
            },
            alignment: {
                type: 'string',
                default: 'left'
            }
        });
    });
});