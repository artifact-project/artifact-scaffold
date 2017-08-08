import * as webpack from 'webpack';
import * as webpackMerge from 'webpack-merge';
import baseConfig from './base';

const isDev = process.env.NODE_ENV !== 'production';

export default webpackMerge(
	// Base config
	baseConfig(),

	// Client config
	<webpack.Configuration>{
		target: 'web',

		entry: {
			initial: [].concat(
				isDev ? 'webpack-hot-middleware/client' : [],
				'@exility/block',
				'@exility/css',
				'@exility/stdlib',
			),

			boot: [
				'./src/boot',
			],
		},

		output: {
			filename: '[name].bundle.js',
		},

		plugins: [].concat(
			new webpack.optimize.CommonsChunkPlugin({
				name: 'initial',
			}),

			isDev ? [] : new webpack.LoaderOptionsPlugin({
				minimize: true,
				debug: false
			}),

			isDev ? [] : new webpack.optimize.UglifyJsPlugin({
				beautify: false,
				mangle: {
					screw_ie8: true,
					keep_fnames: true,
				},
				compress: {
					screw_ie8: true,
				},
				comments: false,
			}),
		),
	},
);
