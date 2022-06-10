import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { MarineBattleToken, MarineBattleToken__factory } from "../typechain";

// Scenario
// 1. I have a game, where playes can play. They have opportunity to mining tokens by marine
// battles.
// 2. I need to have this immitation - pool of playes, with their static structure
// 3. I need to create a function "CheckGameTokens"
// 4. Players have to connect their wallet to our application and we add new account with new
// wallet address - in the future, right now we only connect 2 and 3 addresses from Handhat pool
// 5. "CheckGameTokens" - check all players from usual database with blockchain database, and if user have value > 0 in the usual database, these tokens added to the allowance in the token contract

interface Player {
  address: string;
  balance: number;
  blockchainBalance: number;
}

const checkGameTokens = async (
  owner: SignerWithAddress,
  token: MarineBattleToken,
  player: Player
) => {
  if (player.balance === 0) return;
  const balance = player.balance;
  player.balance = 0;
  player.blockchainBalance = balance;
  await token.connect(owner).approve(player.address, balance);
};

describe("MarineBattle token general scenario", function () {
  let token: MarineBattleToken;
  let owner: SignerWithAddress;
  let player1: SignerWithAddress;
  let player2: SignerWithAddress;
  const players: Player[] = [];

  beforeEach(async () => {
    [owner, player1, player2] = await ethers.getSigners();
    token = await new MarineBattleToken__factory(owner).deploy();
    await token.deployed();
    players.push({
      address: player1.address,
      balance: 15000,
      blockchainBalance: 0,
    });
    players.push({
      address: player2.address,
      balance: 12600,
      blockchainBalance: 0,
    });
  });

  it("Common scenario", async function () {
    console.log("Start operation: ", new Date(Date.now()).toDateString());
    // add cycle for more users and filter this user list with 0 balance - in real code
    await checkGameTokens(owner, token, players[0]);
    await checkGameTokens(owner, token, players[1]);
    console.log(
      "Check all players and add allowance: ",
      new Date(Date.now()).toDateString()
    );
    const allowanceP1 = await token
      .connect(player1)
      .allowance(owner.address, player1.address);
    const allowanceP2 = await token
      .connect(player2)
      .allowance(owner.address, player2.address);
    console.log("Allowance player1: ", allowanceP1);
    console.log("Allowance player2: ", allowanceP2);
    expect(allowanceP1.toNumber()).to.eq(15000);
    expect(allowanceP2.toNumber()).to.eq(12600);
    //
    await token
      .connect(player1)
      .transferFrom(owner.address, player1.address, allowanceP1);
    await token
      .connect(player2)
      .transferFrom(owner.address, player2.address, allowanceP2);

    const balanceP1 = await token.balanceOf(player1.address);
    const balanceP2 = await token.balanceOf(player2.address);
    console.log("Balance player1: ", balanceP1);
    console.log("Balance player2: ", balanceP2);

    expect(balanceP1).to.eq(15000);
    expect(balanceP2).to.eq(12600);
  });
});
