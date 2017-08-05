import {core as stdlib} from '@exility/stdlib';
import {createCompiler} from '@exility/string';

import App from './blocks/App/App';
import pageTemplateString from './page.tpl';

const compiler = createCompiler({
	scope: [
		'state',
		'__blocks__',
	],
	blocks: ['App'],
	metaComments: true,
});

const templateFactory = compiler(pageTemplateString);
const template = templateFactory({stdlib});

export function renderPage(url: string) {
	return template({
		state: {
			title: 'Exility scaffold!',
			request: url,
		},

		__blocks__: {
			App,
		},
	});
}
