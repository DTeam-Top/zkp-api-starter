# circom-starter

A basic circom project using [Hardhat](https://github.com/nomiclabs/hardhat) and [hardhat-circom](https://github.com/projectsophon/hardhat-circom). This combines the multiple steps of the [Circom](https://github.com/iden3/circom) and [SnarkJS](https://github.com/iden3/snarkjs) workflow into your [Hardhat](https://hardhat.org) workflow.

By providing configuration containing your Phase 1 Powers of Tau and circuits, this plugin will:

## How To Run

### Workflow

1. `npm i` to install dependencies
1. `npm run circom:dev` to build deterministic development circuits.

   - To build a single circuit during development, you can use the `--circuit` CLI parameter. For example, if you make a change to `hash.circom` and you want to _only_ rebuild that, you can run `yarn circom:dev --circuit hash`.

1. `npm test` to test circuits and verifier contracts.

When all tests passed, you can run `npm run circom:prod` for production builds (using `Date.now()` as entropy).

### Output Location

1. circuits: ./api/circuits
1. contracts: ./circom/contracts
