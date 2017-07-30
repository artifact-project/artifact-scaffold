import {createServer} from 'http';
import app from './src/server/server';

const port = 3017;
const server = createServer(app.callback()).listen(port);

module['hot'] && module['hot'].accept('./src/server', () => {
	server.removeAllListeners('request');
	server.on('request', app.callback());
});

console.log(`Server running on: http://localhost:${port}/`);
