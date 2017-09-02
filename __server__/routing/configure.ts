import {Context} from 'koa';
import {runtimeBlockActivate} from '@exility/string';
import {getUsedCSS} from '@exility/css';

import now = require('performance-now');
import decache = require('decache');

export default (app) => {
	app.use((ctx: Context) => {
		const start = now();

		const Page = require('../../src/blocks/Page/Page').default;
		const {getGlobalData} = require('../../src/data/global');

		runtimeBlockActivate(Page, {
			metaComments: true,
		});

		const page = new Page(getGlobalData(ctx.req.url));
		const renderEnd = now();

		const usedCSS = getUsedCSS();
		const cssEnd = now();

		ctx.body = page['__view__']
			.replace('%__USED_CSS__%', usedCSS.names.join(','))
			.replace('%__USED_CSS_TEXT__%', usedCSS.cssText)
		;

		ctx.set('x-time-render', (renderEnd - start) + '');
		ctx.set('x-time-css', (cssEnd - renderEnd) + '');
		ctx.set('x-time-all', (now() - start) + '');

		decache('../../src/blocks/Page/Page');
		decache('../../src/data/global');
	});
};
