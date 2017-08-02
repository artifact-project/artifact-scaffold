import * as webpack from 'webpack';
import * as webpackMerge from 'webpack-merge';
import baseConfig from './base';

export default webpackMerge(
	// Base config
	baseConfig(),

	// Client config
	<webpack.Configuration>{
		target: 'web',

		entry: {
			app: [
				'webpack-hot-middleware/client',
				'./src/client/boot',
			],
		},

		output: {
			filename: '[name].bundle.js',
		}
	},
);
