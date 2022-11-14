export const PLONK_VERIFIER_ABI = [
  'function verifyProof(bytes, uint[]) public view returns (bool)',
];

export const GROTH16_VERIFIER_ABI = [
  'function verifyProof(uint[2],uint[2][2],uint[2],uint[1]) public view returns (bool)',
];
