module.exports = {
	entry: ("./src/static/js/index.js"),
	output: {
		path: __dirname + "/build",
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			loader: 'babel-loader',
			test: /\.js$/,
			exclude: /node_modules/,
			options: {
				presets: 'es2015'
			},
		}]
	},
	devtool: 'inline-source-map',
	externals: {
		routie: 'routie',
		transparency: 'transparency'
	},
	devServer: {
		port: 3000,
		contentBase: './build',
		inline: true
	},

};
