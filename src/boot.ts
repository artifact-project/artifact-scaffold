import Page from './blocks/Page/Page';
import mountTo from '@exility/dom/src/mountTo/mountTo';
import {reloadBlock} from '@exility/dom/src/reload/reload';
import {getGlobalData} from './data/global';

console.time('page');

let page = window['page'];

if (window['page']) {
	reloadBlock(page, Page);
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
