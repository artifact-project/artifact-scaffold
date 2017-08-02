import * as webpack from 'webpack';
import webpackDevMiddleware from './webpack-dev';
import webpackHotMiddleware from './webpack-hot';
import webpackConfig from '../../../__webpack__/config/client';

const compiler = webpack(webpackConfig);

export {compiler};

export default [
	webpackDevMiddleware(compiler, {
		publicPath: webpackConfig.output.publicPath,
		stats: {colors: true},
	}),

	webpackHotMiddleware(compiler),
];
