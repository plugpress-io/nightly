const path = require('path');
const defaultConfig = require('@wordpress/scripts/config/webpack.config');

module.exports = {
  ...defaultConfig,
  entry: {
    admin: path.resolve(process.cwd(), 'src/admin/main.tsx'),
  },
  output: {
    path: path.resolve(process.cwd(), 'build/admin'),
    filename: 'index.js',
  },
};
