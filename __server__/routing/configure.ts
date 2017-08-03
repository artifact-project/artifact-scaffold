import {Context} from 'koa';
import {renderPage} from '../../src/boot';

export default (app) => {
	app.use((ctx: Context) => {
		ctx.body = renderPage(
			ctx.req.url,
		);
	});
};
