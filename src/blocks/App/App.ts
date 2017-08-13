import Block from '@exility/block';
import css from '@exility/css';

interface AppAttrs {
	state: any;
}

export default class App extends Block<AppAttrs> {
	static classNames = css({
		'app': {
			margin: 10,
			padding: 10,
			background: '#ccc',
		},

		'text': {
			color: '#0f0',
		},

		'pic': {
			width: 100,
			height: 100,
		},
	});

	static template = `
		.app
			.text | App.req: \${attrs.request}
	`;
}
