const hre = require("hardhat");
const { assert } = require("chai");

describe("multiplier circuit", () => {
  let circuit;

  const sampleInput = {
    a: 11,
    b: 3,
    c: 33,
  };
  const sanityCheck = true;

  before(async () => {
    circuit = await hre.circuitTest.setup("multiplier");
  });

  it("produces a witness with valid constraints", async () => {
    const witness = await circuit.calculateWitness(sampleInput, sanityCheck);
    await circuit.checkConstraints(witness);
  });

  it("has expected witness values", async () => {
    const witness = await circuit.calculateLabeledWitness(
      sampleInput,
      sanityCheck
    );
    assert.propertyVal(witness, "main.a", `${sampleInput.a}`);
    assert.propertyVal(witness, "main.b", `${sampleInput.b}`);
    assert.propertyVal(witness, "main.c", undefined);
    assert.propertyVal(witness, "main.quiz", `${sampleInput.c}`);
  });

  it("has the correct output", async () => {
    const expected = { quiz: 33 };
    const witness = await circuit.calculateWitness(sampleInput, sanityCheck);
    await circuit.assertOut(witness, expected);
  });
});
