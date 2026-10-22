import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const port = Number(process.env.PORT || 4173);
const file = join(import.meta.dirname, 'dist', 'index.html');

createServer(async (request, response) => {
  if (request.url !== '/' && request.url !== '/index.html') {
    response.writeHead(404);
    response.end('Not found');
    return;
  }
  try {
    const content = await readFile(file);
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end(content);
  } catch {
    response.writeHead(500);
    response.end('Cannot read dist/index.html');
  }
}).listen(port, '127.0.0.1', () => {
  process.stdout.write(`Preview: http://localhost:${port}\n`);
});
