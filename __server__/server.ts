import * as Koa from 'koa';

import configureMiddlewares from './middleware/configure';
import configureRouting from './routing/configure';

// Задаём глобальный SEED
process.env.SEED = Math.round(Math.random() * 1e4) + '';

const app = new Koa();

configureMiddlewares(app);
configureRouting(app);

export default app;
