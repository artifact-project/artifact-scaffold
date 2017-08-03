import * as Koa from 'koa';
import configureMiddlewares from './middleware/configure';
import configureRouting from './routing/configure';

const app = new Koa();

// configureMiddlewares(app);
configureRouting(app);

export default app;
