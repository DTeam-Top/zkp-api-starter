import dotenv from 'dotenv';
import pino from 'pino';

dotenv.config();

export type CircuitConfig = {
  name: string;
  protocol: string;
  verifier: string;
};

export type Settings = {
  jsonRpcUrl: string;
  circuitsRoot: string;
  circuits: CircuitConfig[];
};

export const LOGGER = pino({level: process.env.LOG_LEVEL || 'debug'});
export const SETTINGS: Settings = {
  jsonRpcUrl: process.env.JSON_RPC_URL || 'http://localhost:8545',
  circuitsRoot: '../api/circuits',
  circuits: [
    {
      name: 'adder',
      protocol: 'plonk',
      verifier: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    },
    {
      name: 'multiplier',
      protocol: 'groth16',
      verifier: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
    },
  ],
};
