import { ethers } from "hardhat";
import { MarineBattleToken__factory } from "../typechain";

async function main() {
  const [owner] = await ethers.getSigners();
  const marineBattleContract = await new MarineBattleToken__factory(
    owner
  ).deploy();
  await marineBattleContract.deployed();

  console.log(
    "MarineBattleContract deployed to:",
    marineBattleContract.address
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
