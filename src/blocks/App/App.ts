import Block from '@exility/block';
import css from '../../css';

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
			color: '#f00',
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
