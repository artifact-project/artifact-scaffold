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
			backgroundColor: '#ff00cc',
			backgroundImage: 'linear-gradient(to right, #ff00cc, #333399)',
		},

		'text': {
			color: '#ff00cc',
		},
	});

	static template = `
		.app
			GlitchText[value=\${attrs.header}]
			WelcomeForm
	`;
}
