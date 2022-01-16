/* eslint-disable no-unused-expressions */
import { ethers, waffle } from 'hardhat';
import chai from 'chai';

import FreeWayDriverArtifact from './../artifacts/contracts/FreeWayDriver.sol/FreeWayDriver.json';
import FreeWayRiderArtifact from './../artifacts/contracts/FreeWayRider.sol/FreeWayRider.json';
import { FreeWayRider, FreeWayDriver } from '../typechain'; // eslint-disable-line node/no-missing-import
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

const { deployContract } = waffle;
const { expect } = chai;

// https://ipfs.io/ipfs/Qmdkex1m9e3u2yqyqxCnoLvZMjsGGvLqZM6Go4UAewKqkz?filename=blue.jpg
let freeWayRider: FreeWayRider;
let freeWayDriver: FreeWayDriver;
let signers: SignerWithAddress[];

beforeEach(async () => {
  signers = await ethers.getSigners();

  freeWayRider = (await deployContract(
    <SignerWithAddress>signers[0],
    FreeWayRiderArtifact
  )) as FreeWayRider;

  freeWayDriver = (await deployContract(
    <SignerWithAddress>signers[0],
    FreeWayDriverArtifact
  )) as FreeWayDriver;

  expect(freeWayRider.address).to.properAddress;
  expect(freeWayDriver.address).to.properAddress;
});
describe('FreeWayRider Contract', function () {
  it('Should deploy succesfully', async function () {
    expect(freeWayRider).to.not.equal(undefined);
    expect(freeWayDriver).to.not.equal(undefined);
  });
});

describe('Set base uri', async () => {
  it('should set base uri and return correct token uri', async () => {
    await freeWayRider.setBaseURI('https://example.com/rider/');
    await freeWayRider.mintItem(signers[1].address);
    const riderNFTURI = await freeWayRider.tokenURI(1);

    await freeWayDriver.setBaseURI('https://example.com/driver/');
    await freeWayDriver.mintItem(signers[1].address);
    const driverNFTURI = await freeWayDriver.tokenURI(1);

    expect(riderNFTURI).to.equal('https://example.com/rider/1');
    expect(driverNFTURI).to.equal('https://example.com/driver/1');
  });
});

describe('Only owner can set base uri', async () => {
  it('should fail', async () => {
    const nonOwnerRider = freeWayRider.connect(signers[1]);
    const nonOwnerDriver = freeWayDriver.connect(signers[1]);
    await expect(
      nonOwnerRider.setBaseURI('https://example.com/rider/')
    ).to.be.revertedWith('Ownable: caller is not the owner');
    await expect(
      nonOwnerDriver.setBaseURI('https://example.com/driver/')
    ).to.be.revertedWith('Ownable: caller is not the owner');
  });
});
