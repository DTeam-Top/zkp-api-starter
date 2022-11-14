const hre = require("hardhat");
const { snarkjs, ethers } = hre;
const { assert } = require("chai");

let multiplierVerifier;

describe("multiplier circuit solidity", () => {
  before(async () => {
    [admin] = await ethers.getSigners();
    const Verifier = (
      await ethers.getContractFactory(
        "contracts/MultiplierVerifier.sol:Verifier"
      )
    ).connect(admin);
    multiplierVerifier = await Verifier.connect(admin).deploy();
    await multiplierVerifier.deployed();
  });

  it("solidtiy can verify correct proof", async () => {
    const { proof, publicSignals } = await snarkjs.groth16.fullProve(
      {
        a: 11,
        b: 3,
        c: 33,
      },
      "../api/circuits/multiplier.wasm",
      "../api/circuits/multiplier.zkey"
    );

    const calldata = await snarkjs.groth16.exportSolidityCallData(
      proof,
      publicSignals
    );

    const argv = calldata
      .replace(/["[\]\s]/g, "")
      .split(",")
      .map((x) => BigInt(x).toString());

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

    assert(await multiplierVerifier.verifyProof(a, b, c, Input));
  });
});
