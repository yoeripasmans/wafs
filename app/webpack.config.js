const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: __dirname + "/src/index.js",
	output: {
		path: __dirname + "/public/assets/js",
		publicPath: "/assets/js",
		filename: 'bundle.js'
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: [/node_modules/],
			use: [{
				loader: 'babel-loader',
				options: {
					presets: ['es2015']
				},
			}],
		}, ]
	},
	devtool: 'inline-source-map',
	devServer: {
		port: 3000,
		compress: true,
		contentBase: __dirname + "/public/",
	},

};
