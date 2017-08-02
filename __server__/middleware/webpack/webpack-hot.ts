import {Context} from 'koa';
import {PassThrough} from 'stream';
import {Compiler} from 'webpack';

import * as devMiddleware from 'webpack-dev-middleware';
import * as hotMiddleware from 'webpack-hot-middleware';

// https://github.com/leecade/koa-webpack-middleware/blob/master/middleware/hotMiddleware.js
export default function webpackHotMiddleware(webpack: Compiler, opts?: devMiddleware.Options) {
	const expressMiddleware = hotMiddleware(webpack, opts);

	return async(ctx: Context, next: Function) => {
		const stream = new PassThrough();

		await expressMiddleware(ctx.req, <any>{
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
}
