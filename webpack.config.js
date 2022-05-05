const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const RtlCssPlugin = require('rtlcss-webpack-plugin');
const glob = require('glob');
const path = require('path');

module.exports = [
    {
        ...defaultConfig,
        entry: {
            dashboard: path.resolve(process.cwd(), 'src/dashboard/index.js'),
            nightly: path.resolve(process.cwd(), 'src/nightly/index.js'),
        },
        output: {
            ...defaultConfig.output,
            path: path.resolve(process.cwd(), 'dist/'),
            publicPath: 'auto',
        },

        externals: {
            ...defaultConfig.externals,
            wpnightly: 'wpnightly',
        },

        plugins: [
            ...defaultConfig.plugins,
            new RtlCssPlugin({
                filename: '[name]-rtl.css',
            }),
        ],
    },
];
