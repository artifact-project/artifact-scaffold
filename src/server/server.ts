import {PassThrough} from 'stream'

import * as Koa from 'koa';
import * as koaStaticMiddleware from 'koa-static';

import * as webpack from 'webpack';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';

const app = new Koa();

const webpackConfig = require('../../__webpack__/config/client');
const webpackCompiler = webpack(webpackConfig);

// https://github.com/leecade/koa-webpack-middleware/blob/master/middleware/devMiddleware.js
const koaWebpackDevMiddleware = (compiler, opts) => {
	const expressMiddleware = webpackDevMiddleware(compiler, opts);

	return async(ctx, next) => {
		await expressMiddleware(ctx.req, {
			end(content) {
				ctx.body = content;
			},

			setHeader(name, value) {
				ctx.set(name, value);
			},

			locals: ctx.state,
		}, next);
	};
};

// https://github.com/leecade/koa-webpack-middleware/blob/master/middleware/hotMiddleware.js
const koaWebpackHotMiddleware = (compiler, opts = {}) => {
	const expressMiddleware = webpackHotMiddleware(compiler, opts);

	return async(ctx, next) => {
		const stream = new PassThrough();

		await expressMiddleware(ctx.req, {
			write(chunk, encoding, cb) {
				stream.write(chunk, encoding, cb);
			},

			writeHead(status, headers) {
				ctx.body = stream;
				ctx.status = status;
				ctx.set(headers);
			},
		}, next);
	};
};

app.use(koaWebpackDevMiddleware(webpackCompiler, {
	publicPath: webpackConfig.output.publicPath,
	stats: {colors: true},
}));

app.use(koaWebpackHotMiddleware(webpackCompiler, {
	log: console.log,
	path: '/__webpack_hmr',
	reload: true
}));

// app.use(koaStaticMiddleware('./dist'));

app.use(ctx => {
	ctx.body = `
	<html>
	<head>
		<title>Exility Scaffold!</title>
	</head>
	<body>
		<div id="root">Loading</div>
		<script src="/dist/client.js"></script>
	</body>
	</html>
	`;
});

export default app;
