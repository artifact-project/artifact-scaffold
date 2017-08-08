import {revertCSSNode} from '@exility/css';

import Page from './blocks/Page/Page';
import mountTo from '@exility/dom/src/mountTo/mountTo';
import {getGlobalData} from './data/global';

console.time('page');

const isHRM = !!window['page'];
const page = new Page(
	getGlobalData(location.toString()),
	isHRM ? {} : {isomorphic: document},
);

console.timeEnd('page');

if (isHRM) {
	const frag = document.createDocumentFragment();

	mountTo(frag, page);

	[].forEach.call(frag.querySelectorAll('script') , el => {
		el.parentNode.removeChild(el);
	});

	document.removeChild(document.documentElement);
	document.appendChild(frag);

	revertCSSNode();
} else {
	mountTo(document, page);
}


window['page'] = page;
module['hot'] && module['hot'].accept();
