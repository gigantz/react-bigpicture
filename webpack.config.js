const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
	mode: process.env === 'production' ? 'production' : 'development',
	devtool: isProd ? false : 'source-map',
	entry: {
		index: './src/index',
		BigPictureWrapper: './src/BigPictureWrapper',
		BigPictureGallery: './src/BigPictureGallery',
	},
	target: 'web',
	output: {
		path: path.join(__dirname, '/lib'),
		filename: '[name].js',
		libraryTarget: 'commonjs2',
	},
	devServer: {
    publicPath: "/",
    contentBase: "./public",
    hot: true,
		inline: true,
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: isProd,
			},
		}),
		new webpack.HotModuleReplacementPlugin(),
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
