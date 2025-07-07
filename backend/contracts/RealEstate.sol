// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RealEstate {
    struct Property {
        string name;
        string city;
        string price;
        string imageUrl;
    }

    Property[] public properties;

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    function addProperty(string memory name, string memory city, string memory price, string memory imageUrl) public onlyOwner {
        Property memory newProperty = Property(name, city, price, imageUrl);
        properties.push(newProperty);
    }

    function getAllProperties() public view returns (Property[] memory) {
        return properties;
    }

    function getPropertyCount() public view returns (uint256) {
        return properties.length;
    }
}
