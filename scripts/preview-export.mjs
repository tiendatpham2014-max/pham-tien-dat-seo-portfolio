import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";

const root = resolve("out");
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".woff2": "font/woff2",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
};

createServer(async (request, response) => {
  let path;
  try {
    const url = new URL(request.url ?? "/", "http://127.0.0.1");
    path = resolve(root, `.${decodeURIComponent(url.pathname)}`);
    if (path !== root && !path.startsWith(`${root}${sep}`)) throw new Error("outside export");
    if ((await stat(path)).isDirectory()) path = resolve(path, "index.html");
    const bytes = await readFile(path);
    response.writeHead(200, {
      "content-type": mime[extname(path)] ?? "application/octet-stream",
      "cache-control": "no-cache, no-store, must-revalidate",
      "pragma": "no-cache",
      "expires": "0"
    });
    response.end(bytes);
  } catch {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
}).listen(4173, "127.0.0.1", () => console.log(`Static export: http://127.0.0.1:4173 (from ${root})`));
