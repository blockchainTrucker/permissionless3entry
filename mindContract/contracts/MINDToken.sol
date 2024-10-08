// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract MINDToken is ERC20, Ownable, ReentrancyGuard {
    using SafeMath for uint256;

    uint256 public constant MAX_SUPPLY = 21 * 10**9 * 10**18; // 21 billion tokens

    constructor() ERC20("MIND", "MIND") Ownable(msg.sender) {
        // No tokens minted at launch
        // Owner is set to msg.sender (the deployer of the contract)
    }

    // Function to mint new tokens, only the owner can call this function
    function mint(address to, uint256 amount) external onlyOwner nonReentrant {
        require(totalSupply().add(amount) <= MAX_SUPPLY, "Cannot mint more than max supply");
        _mint(to, amount);
    }

    // Optionally, you can implement a burn function if needed
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
}
