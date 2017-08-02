import server from './__server__/server';

const port = 3017;

server.listen(port);

console.log(`Server running on: http://localhost:${port}/`);
