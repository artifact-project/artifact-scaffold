import {revertCSSNode} from '@exility/css';

import Page from './blocks/Page/Page';
import mountTo from '@exility/dom/src/mountTo/mountTo';
import {getGlobalData} from './data/global';

console.time('page');

const isHRM = false && !!window['page'];
const page = new Page(
	getGlobalData(location.toString()),
	isHRM ? {} : {isomorphic: document},
);

console.timeEnd('page');
console.log(page['__view__']);

if (isHRM) {
	// const frag = document.createDocumentFragment();
	// const oldPage = document.documentElement;
	//
	// mountTo(frag, page);
	//
	// [].forEach.call(frag.querySelectorAll('script') , el => {
	// 	el.parentNode.removeChild(el);
	// });
	//
	// document.removeChild(oldPage);
	// document.appendChild(frag);
	//
	// requestAnimationFrame(revertCSSNode);
} else {
	mountTo(document, page);
}


window['page'] = page;

if (module['hot']) {
	module['hot'].accept();
}
