// 共用簡報預覽伺服器
// 用法: node templates/preview/server.cjs <preview-html-folder>
// 例如: node templates/preview/server.cjs output/我的簡報

const http = require("http");
const fs = require("fs");
const path = require("path");

const contentDir = process.argv[2]
  ? path.resolve(process.argv[2])
  : process.cwd();
const assetsDir = path.resolve(__dirname, "../../assets");

console.log("Serving from:", contentDir);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
};

const server = http.createServer((req, res) => {
  const urlPath = req.url === "/" ? "/index.html" : decodeURIComponent(req.url);
  const ext = path.extname(urlPath);

  // 1. Try content directory (the unit's preview HTML)
  const contentPath = path.join(contentDir, urlPath);
  if (fs.existsSync(contentPath)) {
    res.writeHead(200, { "Content-Type": TYPES[ext] || "application/octet-stream" });
    fs.createReadStream(contentPath).pipe(res);
    return;
  }

  // 2. Try assets directory
  const assetPath = path.join(assetsDir, urlPath.replace("/assets/", ""));
  if (fs.existsSync(assetPath)) {
    res.writeHead(200, { "Content-Type": TYPES[ext] || "application/octet-stream" });
    fs.createReadStream(assetPath).pipe(res);
    return;
  }

  res.writeHead(404);
  res.end("Not found");
});

const PORT = parseInt(process.env.PORT) || 3456;
server.listen(PORT, () => console.log(`Preview at http://localhost:${PORT}`));
