import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, resolve, sep } from "node:path";
import { gzipSync } from "node:zlib";

const root = resolve("out");
const TYPES = {
  ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".json": "application/json",
  ".svg": "image/svg+xml", ".png": "image/png", ".ico": "image/x-icon", ".woff2": "font/woff2", ".txt": "text/plain",
};

export function serve(port = 3000) {
  return new Promise((done) => {
    const server = createServer(async (req, res) => {
      let path;
      try { path = decodeURIComponent(new URL(req.url ?? "/", "http://x").pathname); }
      catch { return res.writeHead(400).end(); }
      if (path.endsWith("/")) path += "index.html";
      const file = resolve(join(root, path));
      if (!file.startsWith(root + sep)) return res.writeHead(403).end();
      try {
        let body = await readFile(file); // leer antes de escribir headers: si falla, el catch puede responder 404
        const type = TYPES[extname(file)] ?? "application/octet-stream";
        // Como cualquier hosting estático: gzip para texto y caché larga para los assets con hash.
        const headers = { "Content-Type": type, Vary: "Accept-Encoding" };
        if (path.startsWith("/_next/static/")) headers["Cache-Control"] = "public, max-age=31536000, immutable";
        if (/text|javascript|json|svg/.test(type) && /gzip/.test(req.headers["accept-encoding"] ?? "")) {
          body = gzipSync(body);
          headers["Content-Encoding"] = "gzip";
        }
        res.writeHead(200, headers).end(body);
      } catch {
        const nf = await readFile(join(root, "404.html")).catch(() => null);
        if (nf) res.writeHead(404, { "Content-Type": TYPES[".html"] }).end(nf);
        else res.writeHead(404).end();
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
