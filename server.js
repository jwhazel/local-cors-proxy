#!/usr/bin/env node
import http from 'node:http';
import https from 'node:https';
import { URL } from 'node:url';

const PORT = process.env.PORT || 1234;

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  'Access-Control-Allow-Headers': '*',
};

// Allow self-signed/invalid certs on proxied https targets
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

const server = http.createServer((req, res) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, CORS_HEADERS);
    res.end();
    return;
  }

  const reqUrl = new URL(req.url, `http://localhost:${PORT}`);
  const targetUrl = reqUrl.searchParams.get('url') || '';
  const forceJson = reqUrl.searchParams.get('json') || 'false';

  if (!targetUrl) {
    res.writeHead(400, { ...CORS_HEADERS, 'Content-Type': 'text/plain' });
    res.end('Missing "url" query parameter');
    return;
  }

  let parsedTarget;
  try {
    parsedTarget = new URL(targetUrl);
  } catch {
    res.writeHead(400, { ...CORS_HEADERS, 'Content-Type': 'text/plain' });
    res.end('Invalid target URL');
    return;
  }

  const forceJsonFlag = forceJson.toLowerCase() === 'true';

  // Forward headers but drop host so the target sees its own hostname
  const forwardHeaders = Object.assign({}, req.headers);
  delete forwardHeaders['host'];
  delete forwardHeaders['accept-encoding'];

  const isHttps = parsedTarget.protocol === 'https:';
  const options = {
    hostname: parsedTarget.hostname,
    port: parsedTarget.port || (isHttps ? 443 : 80),
    path: parsedTarget.pathname + parsedTarget.search,
    method: req.method,
    headers: forwardHeaders,
    agent: isHttps ? httpsAgent : undefined,
  };

  const transport = isHttps ? https : http;

  const proxyReq = transport.request(options, (proxyRes) => {
    const chunks = [];
    proxyRes.on('data', (chunk) => chunks.push(chunk));
    proxyRes.on('end', () => {
      const body = Buffer.concat(chunks);
      const upstreamContentType = proxyRes.headers['content-type'] || 'text/plain';
      const isJSON = forceJsonFlag || upstreamContentType.includes('json');
      const contentType = isJSON ? 'application/json' : upstreamContentType;

      res.writeHead(proxyRes.statusCode, {
        ...CORS_HEADERS,
        'Content-Type': contentType,
      });
      res.end(body);
    });
  });

  proxyReq.setTimeout(25000, () => proxyReq.destroy());

  proxyReq.on('error', (err) => {
    console.error(err);
    res.writeHead(500, { ...CORS_HEADERS, 'Content-Type': 'text/plain' });
    res.end(err.message);
  });

  req.pipe(proxyReq);
});

server.listen(PORT, () => {
  console.log(`CORS-enabled web server listening on port ${PORT}`);
});
