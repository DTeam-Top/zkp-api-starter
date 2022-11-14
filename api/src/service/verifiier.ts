import snarkjs from './snarkjs';

import {Contract, ethers} from 'ethers';
import {Logger} from 'pino';
import {GROTH16_VERIFIER_ABI, PLONK_VERIFIER_ABI} from '../abi';
import {CircuitConfig, LOGGER, Settings} from '../constant';

export class Verifier {
  private logger: Logger;
  private provider: ethers.providers.JsonRpcProvider;
  private settings: Settings;

  constructor(settings: Settings) {
    this.logger = LOGGER.child({from: 'Verifier'});
    this.provider = new ethers.providers.JsonRpcProvider(settings.jsonRpcUrl);
    this.settings = settings;
  }

  supportedCircuit(circuitName: string): boolean {
    return this.settings.circuits
      .map(circuit => circuit.name.toLowerCase())
      .includes(circuitName.toLocaleLowerCase());
  }

  verifyByCircuitName(
    quiz: any,
    solution: any,
    circuitName: string
  ): Promise<boolean> {
    const circuit = this.settings.circuits.find(
      circuit => circuit.name.toLowerCase() === circuitName.toLowerCase()
    );

    if (!circuit) {
      throw new Error(`Can't find circuit: ${circuitName}.`);
    }

    if (circuit.protocol === 'plonk') {
      return this.plonkVerify(quiz, solution, circuit);
    } else if (circuit.protocol === 'groth16') {
      return this.groth16Verify(quiz, solution, circuit);
    }

    throw new Error(`Unknown circuit protocol: ${circuit.protocol}`);
  }

  private async groth16Verify(
    quiz: any,
    solution: any,
    circuit: CircuitConfig
  ): Promise<boolean> {
    const {proof, publicSignals} = await snarkjs.groth16.fullProve(
      {
        ...quiz,
        ...solution,
      },
      `${this.settings.circuitsRoot}/${circuit.name}.wasm`,
      `${this.settings.circuitsRoot}/${circuit.name}.zkey`
    );

    const calldata = await snarkjs.groth16.exportSolidityCallData(
      proof,
      publicSignals
    );

    const argv = calldata
      .replace(/["[\]\s]/g, '')
      .split(',')
      .map((x: any) => BigInt(x).toString());

    const a = [argv[0], argv[1]];
    const b = [
      [argv[2], argv[3]],
      [argv[4], argv[5]],
    ];
    const c = [argv[6], argv[7]];
    const Input = [];

    for (let i = 8; i < argv.length; i++) {
      Input.push(argv[i]);
    }

    return new Contract(
      circuit.verifier,
      GROTH16_VERIFIER_ABI,
      this.provider
    ).verifyProof(a, b, c, Input);
  }

  private async plonkVerify(
    quiz: any,
    solution: any,
    circuit: CircuitConfig
  ): Promise<boolean> {
    const {proof: _proof, publicSignals: _publicSignals} =
      await snarkjs.plonk.fullProve(
        {
          ...quiz,
          ...solution,
        },
        `${this.settings.circuitsRoot}/${circuit.name}.wasm`,
        `${this.settings.circuitsRoot}/${circuit.name}.zkey`
      );

    const calldata = await snarkjs.plonk.exportSolidityCallData(
      _proof,
      _publicSignals
    );

    const calldataSplit = calldata.split(',');
    const [proof, ...rest] = calldataSplit;
    const publicSignals = JSON.parse(rest.join(',')).map((x: any) =>
      BigInt(x).toString()
    );

    return new Contract(
      circuit.verifier,
      PLONK_VERIFIER_ABI,
      this.provider
    ).verifyProof(proof, publicSignals);
  }
}
