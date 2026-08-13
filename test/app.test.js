const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const { createApp } = require('../src/app');

async function startServer() {
  const server = http.createServer(createApp());

  await new Promise((resolve) => {
    server.listen(0, resolve);
  });

  const { port } = server.address();
  return { server, port };
}

test('GET / returns service metadata', async () => {
  const { server, port } = await startServer();

  try {
    const response = await fetch(`http://127.0.0.1:${port}/`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(body, {
      name: 'Garden Management API',
      status: 'ok',
      version: '1.0.0',
    });
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});

test('GET /health returns healthy status', async () => {
  const { server, port } = await startServer();

  try {
    const response = await fetch(`http://127.0.0.1:${port}/health`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.status, 'healthy');
    assert.equal(typeof body.timestamp, 'string');
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});
