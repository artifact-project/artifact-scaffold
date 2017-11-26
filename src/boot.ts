import Page from './blocks/Page/Page';
import mountTo from '@exility/dom/src/mountTo/mountTo';
import {getGlobalData} from './data/global';

console.time('page');

let page = window['page'];

if (window['page']) {
	if (process.env.NODE_ENV !== 'production') {
		const {reloadBlock} = require('@exility/dom/src/reload/reload');
		reloadBlock(page, Page);
	}
} else {
	window['dataSource'] = getGlobalData(location.toString());

	page = new Page(
		window['dataSource'],
		{isomorphic: document},
	);

	mountTo(document, page);
}

window['page'] = page;

console.timeEnd('page');
console.log(page['__view__']);


if (module['hot']) {
	module['hot'].accept();
}
