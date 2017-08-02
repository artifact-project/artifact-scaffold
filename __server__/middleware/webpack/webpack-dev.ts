import {Context} from 'koa';
import {PassThrough} from 'stream';
import {Compiler} from 'webpack';

import * as devMiddleware from 'webpack-dev-middleware';
import * as hotMiddleware from 'webpack-hot-middleware';

// https://github.com/leecade/koa-webpack-middleware/blob/master/middleware/devMiddleware.js
export default function webpackDevMiddleware(webpack: Compiler, opts?: devMiddleware.Options) {
	const middleware = devMiddleware(webpack, opts);

	return async(ctx: Context, next: Function) => {
		await middleware(ctx.req, <any>{
			end(content) {
				ctx.body = content;
			},

			setHeader(name, value) {
				ctx.set(name, value);
			},

			locals: ctx.state,
		}, next);
	};
}

