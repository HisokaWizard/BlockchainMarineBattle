//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MarineBattleToken is ERC20 {
    constructor() ERC20("MarineBattle", "MBT") {
        _mint(msg.sender, 1000000000 * 10**decimals());
    }
}
