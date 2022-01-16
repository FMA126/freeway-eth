// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract FreeWayRider is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    string private baseURI;
    

    constructor() ERC721("FreeWayRider", "Rider") {}

    function mintItem(address member)
        public
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(member, newItemId);

        return newItemId;
    }
        // ERC721Metadata related
    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string calldata baseURI_) external onlyOwner {
        baseURI = baseURI_;
    }
}