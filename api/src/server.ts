import cors from '@fastify/cors';
import fastify from 'fastify';
import {LOGGER} from './constant';
import router from './controller/route';

export function buildServer() {
  const server = fastify({
    logger: LOGGER,
    trustProxy: true,
    bodyLimit: 10485760, // 10 MiB
  });
  server
    .register(cors)
    .after(err => {
      if (err) {
        console.log(`register plugins failed: ${err.message}`);
        throw err;
      }
    })
    .register(router)
    .ready()
    .then(
      () => {
        LOGGER.info('Server successfully booted!');
      },
      err => {
        LOGGER.trace('Server start error', err);
      }
    );

  return server;
}

export function startServer() {
  const FASTIFY_PORT = Number(process.env.FASTIFY_PORT) || 3006;
  const FASTIFY_ADDRESS = process.env.FASTIFY_ADDRESS || '127.0.0.1';
  const server = buildServer();

  server.listen({port: FASTIFY_PORT, host: FASTIFY_ADDRESS}).then(() => {
    server.log.info(`🚀 Server running on port ${FASTIFY_PORT}`);
  });
}
