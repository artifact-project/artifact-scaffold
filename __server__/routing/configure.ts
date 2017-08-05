import {Context} from 'koa';
import {renderPage} from '../../src/boot';
import {getUsedCSS} from '../../src/css';

export default (app) => {
	app.use((ctx: Context) => {
		const content = renderPage(
			ctx.req.url,
		);

		ctx.body = content.replace('%__USED_CSS_PLACEHOLDER__%', getUsedCSS());
	});
};
