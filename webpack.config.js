const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const NODE_ENV = process.env.NODE_ENV || 'development';
const WebpackBar = require('webpackbar');
const RtlCssPlugin = require('rtlcss-webpack-plugin');
const glob = require('glob');
const path = require('path');

module.exports = [
    // Dashboard
    {
        ...defaultConfig,
        stats: 'minimal',
        mode: NODE_ENV,
        entry: {
            index: './src/dashboard/index.js',
        },
        output: {
            path: path.resolve(__dirname, './build/dashboard'),
        },
        plugins: [
            ...defaultConfig.plugins,
            new WebpackBar({
                name: 'Dashboard...',
                color: '#36f271',
            }),
            new RtlCssPlugin({
                filename: '[name]-rtl.min.css',
            }),
        ],
    },
    // Nightly
    {
        ...defaultConfig,
        stats: 'minimal',
        mode: NODE_ENV,
        entry: {
            nightly: ['./src/nightly/nightly.js', './src/nightly/config.js'],
        },
        output: {
            path: path.resolve(__dirname, './assets/js/'),
        },
        plugins: [
            ...defaultConfig.plugins,
            new WebpackBar({
                name: 'Nightly...',
                color: '#36f271',
            }),
        ],
    },
];
