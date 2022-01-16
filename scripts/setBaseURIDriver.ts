import { Contract } from 'ethers';
import { ethers } from 'hardhat';
import * as FreeWayRiderArtifact from '../artifacts/contracts/FreeWayRider.sol/FreeWayRider.json';
import * as FreeWayDriverArtifact from '../artifacts/contracts/FreeWayDriver.sol/FreeWayDriver.json';
import { FreeWayDriver, FreeWayRider } from '../typechain'; // eslint-disable-line node/no-missing-import
// eslint-disable-next-line node/no-missing-import
import { RIDER_MUMBAI_ADDRESS, DRIVER_MUMBAI_ADDRESS } from '../constants';

const riderMumbaiAddress = RIDER_MUMBAI_ADDRESS;
const driverMumbaiAddress = DRIVER_MUMBAI_ADDRESS;

const mintRiderNft = async () => {
  // const provider = new providers.AlchemyProvider(
  //   'rinkeby',
  //   process.env.ALCHEMY_KEY
  // );
  const [deployer] = await ethers.getSigners();
  const rider = new Contract(
    riderMumbaiAddress,
    FreeWayRiderArtifact.abi,
    deployer
  ) as FreeWayRider;
  await rider.setBaseURI(
    'https://cvwi19co5d.execute-api.us-west-1.amazonaws.com/dev/'
  );
};

const mintDriverNft = async () => {
  // const provider = new providers.AlchemyProvider(
  //   'rinkeby',
  //   process.env.ALCHEMY_KEY
  // );
  const [deployer] = await ethers.getSigners();
  const driver = new Contract(
    driverMumbaiAddress,
    FreeWayDriverArtifact.abi,
    deployer
  ) as FreeWayDriver;
  await driver.setBaseURI(
    'https://o0uf0gdj1c.execute-api.us-west-1.amazonaws.com/dev/'
  );
};

mintRiderNft().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});

mintDriverNft().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});
