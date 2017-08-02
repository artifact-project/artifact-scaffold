import * as path from 'path';
import * as webpack from 'webpack';

// const {default:exilityTransformer} = require('@exility/ts-transformer');

export default (): webpack.Configuration => ({
	watch: true,
	devtool: 'cheap-module-eval-source-map',

	output: {
		path: path.join(__dirname, '..', '..'),
		publicPath: '/dist/',
	},

	module: {
		rules: [
			// TypeScript
			{
				test: /\.tsx?$/,
				loader: 'awesome-typescript-loader',
				exclude: /\/(node_modules|dist)\//,
				options: {
					// xgetCustomTransformers() {
					// 	return {
					// 		before: [exilityTransformer],
					// 		after: [],
					// 	};
					// },
				},
			},

			// CSS
			{
				test: /\.css$/,
				exclude: /\/(node_modules|dist)\//,
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
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'dev'),
			},
		}),
	],
});
