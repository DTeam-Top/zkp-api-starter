# ZKP API Starter

This starter inlcude two sub projects:

- circom, a circom-starter powered by hardhat-cirom plugin.
- api, a fastify api server hosting the circuits created by circom sub project.

## How To Run

1. Following the instructions in [circom/README](./circom/README.md) to create, build and test your circuits and verifier contracts.
2. Verifiers contracts deployment, for local deployment:

   - `npx hardhat node`, kick off local hardhat node.
   - `npm run deploy:local` in circom project.

3. Changing the verifiers contracts addresses in [api/src/constant.ts](./api/src/constant.ts).
4. `npm start` in api project.
5. Sending requests to it and the interfaces can be found in [api/README](./api/README.md).
