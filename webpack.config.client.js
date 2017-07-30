const path = require('path');
const webpack = require('webpack');
const {default:exilityTransformer} = require('@exility/ts-transformer');

module.exports = {
	entry: {
		vendor: [
			'@exility/block',
			'@exility/stdlib',
		],
	},

	output: {
		filename: '[name].bundle.js',
		path: path.join(__dirname, 'dist'),
	},

	module: {
		rules: [
			// TypeScript
			{
				test: /\.tsx?$/,
				loader: 'awesome-typescript-loader',
				exclude: /node_modules\/(?!@exility|skeletik)/,
				options: {
					getCustomTransformers() {
						return {
							before: [exilityTransformer],
							after: [],
						};
					},
				},
			},

			// CSS
			{
				test: /\.css$/,
				use: [
					{loader: 'style-loader'},
					{loader: 'css-loader'},
				],
			},
		],
	},

	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		modules: [
			'node_modules',
		],
	},

	plugins: [
		new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'dev'),
			},
		}),
	],
};
