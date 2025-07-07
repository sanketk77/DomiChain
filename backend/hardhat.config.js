console.log("🛠️ Hardhat config loaded from backend!");

require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

const { PRIVATE_KEY, ALCHEMY_API_KEY_MUMBAI, ALCHEMY_API_KEY_SEPOLIA, ALCHEMY_API_KEY_MAINNET } = process.env;

module.exports = {
  solidity: "0.8.20",
  networks: {
  mumbai: {
   url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY_MUMBAI}`,

    accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
  },
  sepolia: {
    url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY_SEPOLIA}`,
    accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
  },
  mainnet: {
    url: `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY_MAINNET}`,
    accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
  },
}

};
