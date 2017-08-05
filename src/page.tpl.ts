import css from './css';

css({
	'<body/>': {
		margin: 0,
		padding: 0,
		fontSize: 14,
		fontFamily: 'Arial',
	},
});

export default `
!5
html
	head
		title[innerHTML=\${state.title}]
		style | %__USED_CSS_PLACEHOLDER__%
	body
		App[__attrs__=\${state}]
`;
