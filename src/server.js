const http = require('node:http');
const { createApp } = require('./app');

const PORT = Number(process.env.PORT || 3000);
const app = createApp();

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Garden Management API listening on http://localhost:${PORT}`);
});

function shutdown(signal) {
  server.close(() => {
    process.exit(0);
  });

  setTimeout(() => {
    process.exit(1);
  }, 5000).unref();

  console.log(`Received ${signal}, shutting down...`);
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
