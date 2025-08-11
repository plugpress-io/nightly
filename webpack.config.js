const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
	...defaultConfig,
	entry: {
		'block/index': path.resolve(__dirname, 'src/js/block/index.js'),
		'admin/index': path.resolve(__dirname, 'src/js/admin/index.js'),
		'frontend/index': path.resolve(__dirname, 'src/js/frontend/index.js'),
	},
	output: {
		...defaultConfig.output,
		path: path.resolve(__dirname, 'build'),
	},

	resolve: {
		...defaultConfig.resolve,
		alias: {
			...defaultConfig.resolve.alias,
			'@': path.resolve(__dirname, 'src/js'),
		},
	},
};
