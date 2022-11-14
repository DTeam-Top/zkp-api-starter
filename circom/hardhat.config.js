require("@nomiclabs/hardhat-ethers");
require("hardhat-circom");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",
  solidity: {
    compilers: [
      {
        version: "0.6.11",
      },
      {
        version: "0.8.9",
      },
    ],
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
  },
  circom: {
    inputBasePath: "./circuits",
    outputBasePath: "../api/circuits",
    ptau: "../powersOfTau28_hez_final_15.ptau",
    // ptau: "https://hermezptau.blob.core.windows.net/ptau/powersOfTau28_hez_final_15.ptau",
    circuits: [
      {
        name: "adder",
        protocol: "plonk",
      },
      {
        name: "multiplier",
        protocol: "groth16",
      },
    ],
  },
};
