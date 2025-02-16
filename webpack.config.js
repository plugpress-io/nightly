const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
	...defaultConfig,
	entry: {
		dashboard: path.resolve(__dirname, 'src/dashboard.js'),
		darkmode: path.resolve(__dirname, 'src/darkmode.js'),
	},
	output: {
		...defaultConfig.output,
		path: path.resolve(__dirname, 'dist/'),
		publicPath: 'auto',
	},
};
