import * as minimist from 'minimist';
import * as webpack from 'webpack';
import * as webpackMerge from 'webpack-merge';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';

// Bse config
import baseConfig from './base';

const IS_DEV = process.env.NODE_ENV !== 'production';
const {analyzer} = minimist(process.argv.slice(2));

export default webpackMerge(
	// Base config
	baseConfig(),

	// Client config
	<webpack.Configuration>{
		target: 'web',

		entry: {
			vendor: [].concat(
				IS_DEV ? 'webpack-hot-middleware/client' : [],
				'@artifact-project/i18n',
				'@exility/block',
				'@exility/css',
				'@exility/stdlib',
				'elastin',
				'tslib',
			),

			app: [
				'./src/boot',
			],
		},

		output: {
			filename: '[name].bundle.js',
		},

		plugins: [].concat(
			new webpack.optimize.CommonsChunkPlugin({
				name: 'vendor',
			}),

			IS_DEV ? [] : new webpack.LoaderOptionsPlugin({
				minimize: true,
				debug: false
			}),

			IS_DEV ? [] : new webpack.optimize.UglifyJsPlugin({
				beautify: false,
				mangle: {
					keep_fnames: true,
				},
				compress: {
				},
				comments: false,
				output: {
					max_line_len: 255,
				},
			} as any),

			analyzer ? new BundleAnalyzerPlugin({
				analyzerMode: 'server',
				analyzerHost: '127.0.0.1',
				analyzerPort: 3088,
				reportFilename: 'report.html',
				defaultSizes: 'parsed',
				openAnalyzer: true,
				generateStatsFile: false,
				statsFilename: 'stats.json',
				statsOptions: null,
				logLevel: 'info'
			}) : [],
		),
	},
);
