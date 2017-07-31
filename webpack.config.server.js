const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackNodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');
const clientWebpackConfig = require('./webpack.config.client');

module.exports = webpackMerge(
	// Client config
	clientWebpackConfig,

	// Server config
	{
		entry: {
			server: [
				'webpack/hot/poll?1000',
				'./index',
			],
		},

		watch: true,
		target: 'node',
		cache: true,

		externals: [
			webpackNodeExternals({
				whitelist: ['webpack/hot/poll?1000'],
			}),
		],

		plugins: [
			new StartServerPlugin('server.bundle.js'),
			new webpack.NamedModulesPlugin(),
			new webpack.NoEmitOnErrorsPlugin(),
		],
	},
);
