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
			backgroundColor: '#ff00cc',
			backgroundImage: 'linear-gradient(to right, #ff00cc, #333399)',
		},
	});

	static template = `
		!5
		html
			head
				title[innerHTML=\${attrs.title}]
				style#__css__[--freezed data-names="%__USED_CSS__%"] | %__USED_CSS_TEXT__%
			body.main
				App[__attrs__=\${attrs}]
				script[src="/dist/vendor.bundle.js"]
				script[src="/dist/app.bundle.js"]
	`;
}
