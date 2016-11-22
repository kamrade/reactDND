'use strict'

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
	entry: [
		'script!jquery/dist/jquery.min.js',
		'script!foundation-sites/dist/foundation.min.js',
		'./app/app.jsx'
	],
	externals: {
		jquery: 'jQuery'
	},
	plugins: [
		new webpack.ProvidePlugin({
			'$': 'jquery',
			'jQuery': 'jquery'
		}),
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(NODE_ENV),
			LANG: JSON.stringify('en')
		})
	],
	output: {
		path: __dirname,
		filename: './public/bundle.js'
	},
	resolve: {
		root: __dirname,
		alias: {
			Main: 'app/components/Main.jsx',
			List:  'app/components/List.jsx',
			applicationStyles: 'app/styles/app.scss'
		},
		extensions: ['.js', '', '.jsx']
	},
	// watch: NODE_ENV == 'development',
	watchOptions: {
		aggregateTimeout: 100
	},
	devtool: NODE_ENV == 'development' ? 'inline-source-map' : null,
	module: {
		loaders: [
			{
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015', 'stage-0']
				},
				test: /\.jsx?$/,
				exclude: /(node_modules|lib)/
			}
		]
	}
};

if (NODE_ENV == 'production') {
	module.exports.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				drop_console: true,
				unsafe: true
			}
		})
	);
};
