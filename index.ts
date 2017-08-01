import {createServer} from 'http';
import app from './src/server/server';

const port = 3017;

app.listen(port);

console.log(`Server running on: http://localhost:${port}/`);
