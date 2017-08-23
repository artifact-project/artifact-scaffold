import Page from './blocks/Page/Page';
import mountTo from '@exility/dom/src/mountTo/mountTo';
import {getGlobalData} from './data/global';
import  hotUpdate from './hotUpdate';

console.time('page');

if (window['page']) {
	hotUpdate(window['page']['__view__'], Page.prototype['__template__']);
} else {
	const page = new Page(
		getGlobalData(location.toString()),
		{isomorphic: document},
	);

	mountTo(document, page);

	console.timeEnd('page');
	console.log(page['__view__']);

	window['page'] = page;
}

if (module['hot']) {
	module['hot'].accept();
}
