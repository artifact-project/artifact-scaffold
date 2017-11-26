import {Context} from 'koa';
import {runtimeBlockActivate} from '@exility/string';
import {getUsedCSS} from '@exility/css';

import now = require('performance-now');
import decache = require('decache');

export default (app) => {
	const IS_DEV = process.env.NODE_ENV !== 'production';
	let Page = require('../../src/blocks/Page/Page').default;
	let {getGlobalData} = require('../../src/data/global');

	runtimeBlockActivate(Page, {
		metaComments: true,
	});

	app.use((ctx: Context) => {
		const start = now();
		let requireTime = 0;
		let compileTime = 0;

		if (IS_DEV) {
			requireTime = -now();
			Page = require('../../src/blocks/Page/Page').default;
			getGlobalData = require('../../src/data/global').getGlobalData;
			requireTime += now();

			// Compiling
			compileTime = -now();
			runtimeBlockActivate(Page, {
				metaComments: true,
			});
			compileTime += now();
		}

		// Render
		let renderTime = -now();
		const page = new Page(getGlobalData(ctx.req.url));
		renderTime += now();

		// Getting Critical CSS
		let cssTime = -now();
		const usedCSS = getUsedCSS();
		cssTime += now();

		// Adding Critical CSS into HTML
		ctx.body = page['__view__']
			.replace('%__USED_CSS__%', usedCSS.names.join(','))
			.replace('%__USED_CSS_TEXT__%', usedCSS.cssText)
		;

		// Exporting timings
		requireTime && ctx.set('x-time-require', requireTime.toFixed(3));
		compileTime && ctx.set('x-time-compile', compileTime.toFixed(3));
		ctx.set('x-time-render', renderTime.toFixed(3));
		ctx.set('x-time-css', cssTime.toFixed(3));
		ctx.set('x-time-all', (now() - start).toFixed(3));

		if (IS_DEV) {
			// Decache for reloading
			decache('../../src/blocks/Page/Page');
			decache('../../src/data/global');
		}
	});
};
