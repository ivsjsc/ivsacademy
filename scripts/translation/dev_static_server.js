const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const port = process.env.PORT || 8001;

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);
  let filePath = path.join(root, urlPath);
  if (urlPath === '/' ) filePath = path.join(root, 'index.html');
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const mime = ext === '.json' ? 'application/json; charset=utf-8' : 'text/plain; charset=utf-8';
    res.writeHead(200, {'Content-Type': mime});
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(port, () => console.log(`Dev static server running at http://localhost:${port}/`));
