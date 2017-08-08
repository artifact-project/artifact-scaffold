import Block from '@exility/block';
import css from '@exility/css';

import App from '../App/App';

export interface PageAttrs {
	title: string;
	request: string;
}

export default class Page extends Block<PageAttrs> {
	static blocks = {App};

	static classNames = css({
		'main': {
			margin: 0,
			padding: 0,
			fontSize: 14,
			fontFamily: 'Arial',
		},
	});

	static template = `
		!5
		html
			head
				title[innerHTML=\${attrs.title}]
				style#__css__ | %__USED_CSS_PLACEHOLDER__%
			body.main
				App[__attrs__=\${attrs}]
				script[src="/dist/initial.bundle.js"]
				script[src="/dist/boot.bundle.js"]
	`;
}
