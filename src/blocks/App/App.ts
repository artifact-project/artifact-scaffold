import Block from '@exility/block';
import css, {fx} from '@exility/css';
import WelcomeForm from '../WelcomeForm/WelcomeForm';

interface AppAttrs {
	request: any;
}

class GlitchText extends Block<{value: string, active: boolean}> {
	static classNames = css({
		'glitch': {
			position: 'relative',
			color: '#fff',
  			fontFamily: `'Arial', sans-serif`,
  			fontSize: '15vmin',
  			fontWeight: 'bold',
		  	textTransform: 'uppercase',
		  	textAlign: 'center',
		  	'mix-blend-mode': 'lighten',
		},

		'pseudo': {
			position: 'absolute',
			top: 0,
      		width: '100%',
      		clip: 'rect(0, 0, 0, 0)',
      		background: 'black',
		},

		'before': {
			left: -1,
			textShadow: '1px 0 rgba(255, 0, 0, .7)',

			'.active &': {
				textShadow: '4px 0 rgba(255, 0, 0, .7)',
				animation: fx({
					0: {clip: 'rect(36px, 9999px, 9px, 0)'},
					25: {clip: 'rect(25px, 9999px, 99px, 0)'},
					50: {clip: 'rect(50px, 9999px, 102px, 0)'},
					75: {clip: 'rect(30px, 9999px, 92px, 0)'},
					100: {clip: 'rect(91px, 9999px, 98px, 0)'},
				})('0.8s infinite ease-in-out alternate-reverse'),
			},
		},

		'after': {
			left: 1,
			textShadow: '-1px 0 rgba(0, 0, 255, .7)',

			'.active &': {
				textShadow: '-5px 0 rgba(0, 0, 255, .7)',
				animation: fx({
					0: {top: -1, left: 1, clip: 'rect(65px, 9999px, 119px, 0)'},
					25: {top: -6, left: 4, clip: 'rect(79px, 9999px, 19px, 0)'},
					50: {top: -3, left: 2, clip: 'rect(68px, 9999px, 11px, 0)'},
					75: {top: 0, left: -4, clip: 'rect(95px, 9999px, 53px, 0)'},
					100: {top: -1, left: -1, clip: 'rect(31px, 9999px, 149px, 0)'},
				})('0.8s infinite ease-in-out alternate-reverse'),
			},
		},
	});

	static template = `
		.glitch[class.active=\${attrs.active}]
			.pseudo.before | \${attrs.value}
			| \${attrs.value}
			.pseudo.after | \${attrs.value}
	`;

	private pid: any;

	connectedCallback() {
		const next = () => {
			this.pid = setTimeout(() => {
				this.update({active: true});

				this.pid = setTimeout(() => {
					this.update({active: false});
					next();
				}, 1000);
			}, 2000 + Math.random() * 5000);
		};

		next();
	}

	disconnectedCallback() {
		clearInterval(this.pid);
	}
}

export default class App extends Block<AppAttrs> {
	static blocks = {
		GlitchText,
		WelcomeForm,
	};

	static classNames = css({
		'app': {
			margin: 0,
			padding: 20,
			backgroundColor: '#ff944d',
			backgroundImage: 'url(data:image/png;base64,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)',
		},

		'text': {
			color: '#ff944d',
		},
	});

	static template = `
		.app
			GlitchText[value="Artifact"]
			WelcomeForm
	`;
}
