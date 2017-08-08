import * as path from 'path';
import * as webpack from 'webpack';
import exilityTransformer from '@exility/ts-transformer';

const isDev = process.env.NODE_ENV !== 'production';
const R_EXCLUDE = /\/(node_modules|dist|private|__[a-z-]+__)\//i;

export default (): webpack.Configuration => ({
	watch: true,
	devtool: isDev ? 'cheap-module-eval-source-map' : false,

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
				exclude: R_EXCLUDE,
				options: {
					getCustomTransformers: () => ({
						before: [exilityTransformer({isomorphic: true})],
						after: [],
					}),
				},
			},

			// CSS
			{
				test: /\.css$/,
				exclude: R_EXCLUDE,
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

	plugins: [].concat(
		isDev ? new webpack.HotModuleReplacementPlugin() : [],
		new webpack.DefinePlugin({
			'process.env': {
				SEED: JSON.stringify(process.env.SEED),
				NODE_ENV: JSON.stringify(process.env.NODE_ENV),
			},
		}),
	),
});
