const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
	devtool: isProd ? 'none' : 'source-map',
	entry: './src/index',
	target: 'web',
	output: {
		path: path.join(__dirname, '/lib'),
		filename: 'index.js',
		libraryTarget: 'commonjs2',
	},
	externals: Object.keys(require('./package.json').dependencies),
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: isProd,
			},
		}),
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: path.join(__dirname, 'src'),
			},
		],
	},
};
