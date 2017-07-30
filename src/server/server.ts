import * as Koa from "koa";

const app = new Koa();

app.use(ctx => {
	ctx.body = `Hi, ${new Date}`;
});

export default app;
