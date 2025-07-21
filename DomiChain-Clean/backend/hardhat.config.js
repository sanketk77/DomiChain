require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

const { PRIVATE_KEY, ALCHEMY_API_KEY_SEPOLIA } = process.env;

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY_SEPOLIA}`,
      accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
    },
  },
};
