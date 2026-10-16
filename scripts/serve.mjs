import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, resolve, sep } from "node:path";

const root = resolve("out");
const TYPES = {
  ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".json": "application/json",
  ".svg": "image/svg+xml", ".png": "image/png", ".ico": "image/x-icon", ".woff2": "font/woff2", ".txt": "text/plain",
};

export function serve(port = 3000) {
  return new Promise((done) => {
    const server = createServer(async (req, res) => {
      let path = decodeURIComponent(new URL(req.url ?? "/", "http://x").pathname);
      if (path.endsWith("/")) path += "index.html";
      const file = resolve(join(root, path));
      if (!file.startsWith(root + sep)) return res.writeHead(403).end();
      try {
        const body = await readFile(file); // leer antes de escribir headers: si falla, el catch puede responder 404
        res.writeHead(200, { "Content-Type": TYPES[extname(file)] ?? "application/octet-stream" }).end(body);
      } catch {
        try { res.writeHead(404, { "Content-Type": TYPES[".html"] }).end(await readFile(join(root, "404.html"))); }
        catch { res.writeHead(404).end(); }
      }
    });
    server.listen(port, () => done(server));
  });
}

if (process.argv[1]?.endsWith("serve.mjs")) {
  const port = Number(process.env.PORT) || 3000;
  await serve(port);
  console.log(`out/ en http://localhost:${port}`);
}
