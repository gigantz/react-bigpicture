const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	devtool: 'source-map',
	entry: './src/index',
	target: 'web',
	output: {
		path: path.join(__dirname, '/lib'),
		filename: 'index.js',
		libraryTarget: 'commonjs2'
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		})
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: path.join(__dirname, 'src')
			}
		]
	}
};
