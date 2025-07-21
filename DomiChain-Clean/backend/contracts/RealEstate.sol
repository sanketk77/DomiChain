// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RealEstate {
    enum PropertyType { BUY, SELL, RENT, PLOT }

    struct Property {
        string name;
        string city;
        string price;
        string imageUrl;
        string description;
        PropertyType propertyType;
        address owner;
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

    function addProperty(
        string memory name,
        string memory city,
        string memory price,
        string memory imageUrl,
        string memory description,
        uint8 propertyType
    ) public onlyOwner {
        require(propertyType <= uint8(PropertyType.PLOT), "Invalid property type");

        Property memory newProperty = Property({
            name: name,
            city: city,
            price: price,
            imageUrl: imageUrl,
            description: description,
            propertyType: PropertyType(propertyType),
            owner: msg.sender
        });

        properties.push(newProperty);
    }

    function getAllProperties() public view returns (Property[] memory) {
        return properties;
    }

    function getPropertyCount() public view returns (uint256) {
        return properties.length;
    }
}
