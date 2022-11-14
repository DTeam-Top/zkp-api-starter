import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import {SETTINGS} from '../constant';
import {Verifier} from '../service/verifiier';

const verifier = new Verifier(SETTINGS);

export default async function apiController(fastify: FastifyInstance) {
  fastify.post('/verification', verify);
}

async function verify(request: FastifyRequest, reply: FastifyReply) {
  const {quiz, solution, circuit} = request.body as any;

  if (!quiz || !solution || !circuit) {
    reply
      .code(400)
      .send('Missing params, must include: quiz, solution, circuit');
    return;
  }

  if (!verifier.supportedCircuit(circuit)) {
    reply.code(400).send(`${circuit} is not supported by this api.`);
    return;
  }

  try {
    const verified = await verifier.verifyByCircuitName(
      quiz,
      solution,
      circuit
    );
    reply.code(200).send({verified});
  } catch (err: any) {
    reply.code(400).send({verified: false, error: err.message});
  }
}
