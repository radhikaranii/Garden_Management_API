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
    assert.equal(body.name, 'Garden Management API');
    assert.equal(body.status, 'ok');
    assert.equal(body.version, '1.0.0');
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});

test('GET /api/health returns healthy status', async () => {
  const { server, port } = await startServer();

  try {
    const response = await fetch(`http://127.0.0.1:${port}/api/health`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.status, 'healthy');
    assert.equal(typeof body.timestamp, 'string');
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});

test('POST /api/login returns user for valid demo credentials', async () => {
  const { server, port } = await startServer();

  try {
    const response = await fetch(`http://127.0.0.1:${port}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'radhika@gmail.com',
        password: 'garden123',
      }),
    });
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.email, 'radhika@gmail.com');
    assert.equal(body.name, 'Radhika');
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});

test('GET /api/garden-data returns page data for a known user', async () => {
  const { server, port } = await startServer();

  try {
    const response = await fetch(`http://127.0.0.1:${port}/api/garden-data?email=radhika@gmail.com`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.user.email, 'radhika@gmail.com');
    assert.ok(Array.isArray(body.plants));
    assert.ok(Array.isArray(body.alerts));
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});
