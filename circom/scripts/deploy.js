const hre = require("hardhat");

async function main() {
  const PlonkVerifier = await hre.ethers.getContractFactory("PlonkVerifier");
  const plonkVerify = await PlonkVerifier.deploy();
  await plonkVerify.deployed();
  console.log(`PlonkVerifier deployed to ${plonkVerify.address}`);

  const Verifier = await hre.ethers.getContractFactory("Verifier");
  const verifier = await Verifier.deploy();
  await verifier.deployed();
  console.log(`Verifier deployed to ${verifier.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
