import http from 'http';
import app from './app.js';
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';
import { initSocket } from './sockets/socketManager.js';
import { logger } from './utils/logger.js';

const startServer = async () => {
  // 1. Connect MongoDB
  await connectDB();

  // 2. Create HTTP Server
  const server = http.createServer(app);

  // 3. Initialize Realtime Socket.IO
  initSocket(server, ENV.CORS_ORIGIN);

  // 4. Start Listening
  server.listen(ENV.PORT, () => {
    logger.info(`[ResQnet Backend] Server listening on http://localhost:${ENV.PORT} (Environment: ${ENV.NODE_ENV})`);
  });
};

startServer();
