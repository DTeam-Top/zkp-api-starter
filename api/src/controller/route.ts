import {FastifyInstance} from 'fastify';
import apiController from './apiController';

export default async function router(fastify: FastifyInstance) {
  fastify.register(apiController, {prefix: '/'});
}
