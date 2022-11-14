const hre = require("hardhat");
const { assert } = require("chai");

describe("adder circuit", () => {
  let circuit;

  const sampleInput = {
    a: 5,
    b: 6,
    c: 11,
  };
  const sanityCheck = true;

  before(async () => {
    circuit = await hre.circuitTest.setup("adder");
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
    assert.propertyVal(witness, "main.a", undefined);
    assert.propertyVal(witness, "main.b", undefined);
    assert.propertyVal(witness, "main.c", undefined);
    assert.propertyVal(witness, "main.quiz", `${sampleInput.c}`);
  });

  it("has the correct output", async () => {
    const expected = { quiz: 11 };
    const witness = await circuit.calculateWitness(sampleInput, sanityCheck);
    await circuit.assertOut(witness, expected);
  });
});
