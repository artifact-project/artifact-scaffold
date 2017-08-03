import {core as stdlib} from '@exility/stdlib';
import {createCompiler} from '@exility/string';
import pageTemplateString from './page.tpl';

const compiler = createCompiler({
	scope: ['state'],
	blocks: [],
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
	});
}
