// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);

  console.log('Account balance:', (await deployer.getBalance()).toString());

  // We get the contract to deploy
  const FreeWayDriver = await ethers.getContractFactory('FreeWayDriver');
  const freeWayDriver = await FreeWayDriver.deploy();

  await freeWayDriver.deployed();

  const FreeWayRider = await ethers.getContractFactory('FreeWayRider');
  const freeWayRider = await FreeWayRider.deploy();

  await freeWayRider.deployed();

  console.log('FreeWayDriver deployed to:', freeWayDriver.address);
  console.log('FreeWayRider deployed to:', freeWayRider.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
