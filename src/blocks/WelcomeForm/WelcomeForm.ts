import Block from '@exility/block';
import css, {fx} from '@exility/css';

interface WelcomeFormAttrs {
	request: any;
}

export default class WelcomeForm extends Block<WelcomeFormAttrs> {
	static classNames = css({
		'form': {
			margin: '50px auto',
			padding: 20,
			background: '#fff',
			boxShadow: '0 1px 3px rgba(0,0,0,.3)',
			borderRadius: 5,
			maxWidth: 300,
		},

		'input': {
			width: '100%',
			border: '2px solid #ccc',
			borderRadius: 3,
			fontSize: 16,
			fontFamily: 'Arial',
			padding: '8px 5px 7px',
			boxSizing: 'border-box',

			'&:focus': {
				outline: 'none',
				borderColor: '#f60',
			}
		},
	});

	static template = `
		form.form[@submit]
			input.input[bind=\${attrs.name}]
	`;

	'@submit'() {
	}
}
