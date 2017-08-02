import webpack from './webpack/webpack';

const all = [].concat(
	webpack,
);

export default (app) => {
	all.forEach(middleware => app.use(middleware));
};
