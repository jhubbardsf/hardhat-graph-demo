//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "hardhat/console.sol";

contract DemoNFT is ERC721, Ownable {
    address private authorizedAuction;

    modifier onlyAuction() {
        require (_msgSender() == authorizedAuction, "Only authorized auctions can mint");
        _;
    }

    constructor() ERC721("DemoNFT", "DNFT") {}

    function authorizeAuction(address _auction) onlyOwner() public {
        authorizedAuction = _auction;
        setApprovalForAll(_auction, true);
    }

    function mintDemo(uint256 _tokenId) onlyAuction() public {
        console.log("Messsage sender...");
        console.log(msg.sender);
        // require(_msgSender() == authorizedAuction, "Only authorized address can mint!");

        _safeMint(_msgSender(), _tokenId);
    }
}
