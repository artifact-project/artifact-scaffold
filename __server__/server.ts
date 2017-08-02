import * as Koa from 'koa';
import configureMiddlewares from './middleware/configure';

const app = new Koa();

configureMiddlewares(app);

app.use(ctx => {
	ctx.body = `
	<html>
	<head>
		<title>Exility Scaffold!</title>
	</head>
	<body>
		<div id="root">Loading</div>
		<script src="/dist/app.bundle.js"></script>
	</body>
	</html>
	`;
});

export default app;
