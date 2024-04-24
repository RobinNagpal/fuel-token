import { createConfig } from 'fuels';

export default createConfig({
  workspace: './',
  useBuiltinForc: false,
  useBuiltinFuelCore: true,
  autoStartFuelCore: true,
  contracts: ['./contracts/fuel-token'],
  output: './src/contract-types',
  chainConfig: './chainConfig.json',
});

/**
 * Check the docs:
 * https://fuellabs.github.io/fuels-ts/tooling/cli/fuels/config-file
 */
