const hre = require("hardhat");
const { snarkjs, ethers } = hre;
const { assert } = require("chai");

let verifier;

describe("adder circuit solidity", () => {
  before(async () => {
    [admin] = await ethers.getSigners();
    const Verifier = (await ethers.getContractFactory("PlonkVerifier")).connect(
      admin
    );
    verifier = await Verifier.connect(admin).deploy();
    await verifier.deployed();
  });

  it("solidtiy can verify correct proof", async () => {
    const { proof: _proof, publicSignals: _publicSignals } =
      await snarkjs.plonk.fullProve(
        {
          a: 6,
          b: 6,
          c: 12,
        },
        "../api/circuits/adder.wasm",
        "../api/circuits/adder.zkey"
      );

    const calldata = await snarkjs.plonk.exportSolidityCallData(
      _proof,
      _publicSignals
    );

    const calldataSplit = calldata.split(",");
    const [proof, ...rest] = calldataSplit;
    const publicSignals = JSON.parse(rest.join(",")).map((x) =>
      BigInt(x).toString()
    );

    assert(await verifier.verifyProof(proof, publicSignals));
  });
});
