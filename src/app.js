const { URL } = require('node:url');

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload);

  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
  });

  res.end(body);
}

function createApp() {
  return function handler(req, res) {
    const requestUrl = new URL(req.url, 'http://localhost');

    if (req.method === 'GET' && requestUrl.pathname === '/') {
      return sendJson(res, 200, {
        name: 'Garden Management API',
        status: 'ok',
        version: '1.0.0',
      });
    }

    if (req.method === 'GET' && requestUrl.pathname === '/health') {
      return sendJson(res, 200, {
        status: 'healthy',
        timestamp: new Date().toISOString(),
      });
    }

    return sendJson(res, 404, {
      error: 'Not Found',
    });
  };
}

module.exports = {
  createApp,
};
