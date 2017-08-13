import {Context} from 'koa';
import {runtimeBlockActivate} from '@exility/string';
import {getUsedCSS} from '@exility/css';
import now = require('performance-now');

import Page from '../../src/blocks/Page/Page';
import {getGlobalData} from '../../src/data/global';

runtimeBlockActivate(Page, {
	metaComments: true,
});

export default (app) => {
	app.use((ctx: Context) => {
		const start = now();
		const page = new Page(getGlobalData(ctx.req.url));
		const content = page['__view__'];
		const renderEnd = now();
		const usedCSS = getUsedCSS();
		const cssEnd = now();

		ctx.body = content
			.replace('%__USED_CSS__%', usedCSS.names.join(','))
			.replace('%__USED_CSS_TEXT__%', usedCSS.cssText)
		;

		ctx.set('x-time-render', (renderEnd - start) + '');
		ctx.set('x-time-css', (cssEnd - renderEnd) + '');
		ctx.set('x-time-all', (now() - start) + '');
	});
};
