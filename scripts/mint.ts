import { Contract } from 'ethers';
import { ethers } from 'hardhat';
import * as FreeWayRiderArtifact from '../artifacts/contracts/FreeWayRider.sol/FreeWayRider.json';
import { FreeWayRider } from '../typechain'; // eslint-disable-line node/no-missing-import
// eslint-disable-next-line node/no-missing-import
import { RIDER_MUMBAI_ADDRESS } from '../constants';

const riderAddress = RIDER_MUMBAI_ADDRESS;

const mintColorNft = async () => {
  // const provider = new providers.AlchemyProvider(
  //   'rinkeby',
  //   process.env.ALCHEMY_KEY
  // );
  const [deployer] = await ethers.getSigners();
  const rider = new Contract(
    riderAddress,
    FreeWayRiderArtifact.abi,
    deployer
  ) as FreeWayRider;
  await rider.mintItem(deployer.address);
  const bal = await rider.balanceOf(deployer.address);
  console.log(bal);
};

mintColorNft().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});
