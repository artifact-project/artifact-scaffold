import Block from '@exility/block';
import {formify, Form, Element, WithFormContext} from '@exility/form';
import {theme} from '@exility/css';

interface WelcomeFormAttrs {
	message: string;
}

const welcomeTheme = theme.create(
	theme.for(Form, {
		':host': {
			margin: '50px auto',
			padding: 20,
			background: '#fff',
			boxShadow: '0 1px 3px rgba(0,0,0,.3)',
			borderRadius: 5,
			maxWidth: 300,
		},
	}),

	theme.for(Element, {
		':host': {
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
			},
		},
	}),
);

class WelcomeForm extends Block<WelcomeFormAttrs, WithFormContext> {
	static blocks = {Form, Element};
	static template = `
		Form
			Element[name="message" placeholder="Enter text"]
			.length | !? \${context.$form.get("message").value}
	`;
}

export default formify({
	theme: welcomeTheme,
	submit: () => Promise.resolve(),
})(WelcomeForm);
