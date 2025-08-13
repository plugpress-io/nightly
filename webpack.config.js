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
		// Optimize chunk loading
		chunkFilename: '[name].[contenthash].js',
	},

	resolve: {
		...defaultConfig.resolve,
		alias: {
			...defaultConfig.resolve.alias,
			'@': path.resolve(__dirname, 'src/js'),
		},
	},

	// Performance optimizations
	optimization: {
		...defaultConfig.optimization,
		// Split chunks for better caching
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
			},
		},
	},

	// Development optimizations
	...(process.env.NODE_ENV === 'development' && {
		devtool: 'eval-source-map',
	}),

	// Production optimizations
	...(process.env.NODE_ENV === 'production' && {
		devtool: false,
		performance: {
			maxAssetSize: 250000,
			maxEntrypointSize: 250000,
			hints: 'warning',
		},
	}),
};
