<div align="center">

# 🏡 DomiChain

### Decentralized Real Estate Exchange Platform

Buy, Sell, Rent, or List property plots securely on the Ethereum Blockchain.

<br/>

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Click%20Here-0A66C2?style=for-the-badge&logo=vercel&logoColor=white)](https://domi-chain.vercel.app)
[![GitHub Stars](https://img.shields.io/github/stars/sanketk77/DomiChain?style=for-the-badge)](https://github.com/sanketk77/DomiChain/stargazers)
[![License](https://img.shields.io/github/license/sanketk77/DomiChain?style=for-the-badge)](./LICENSE)

</div>

---

## 📸 Live Preview

👉 **[Click here to try the app](https://domi-chain.vercel.app)**

<img src="https://github.com/user-attachments/assets/dc97c7cc-f20a-40a0-bf99-ed6135fa3345" alt="DomiChain Preview" width="100%" />

---

## 🧠 Overview

**DomiChain** is a fully decentralized real estate platform built using blockchain technology to enable transparent property transactions — including buying, selling, renting, and managing land plots.  
This project uses **React.js**, **Solidity smart contracts**, and **MetaMask integration** for a smooth and trustless experience.

---

## 🎯 Key Features

- 🏘️ **Property Listings:** Buy, Sell, Rent, and Plot listing options.
- 🔐 **Blockchain Integration:** Smart contract handles ownership and data.
- 🦊 **MetaMask Wallet Integration:** Easy connect/disconnect with wallet.
- 🧾 **On-chain Property Storage:** Data stored and accessed via smart contracts.
- ⚡ **Fast UI:** Built with React + Tailwind + Framer Motion animations.
- 📊 **Portfolio View:** See all listed and owned properties.
- 🔍 **Property Details Page:** Click to expand and view detailed property metadata.

---

## 🧱 Tech Stack

| Layer              | Tech                                                                 |
|--------------------|----------------------------------------------------------------------|
| **Frontend**        | React.js, Tailwind CSS, Framer Motion, Recharts                     |
| **Smart Contracts** | Solidity, Hardhat, Ethers.js                                         |
| **Blockchain**      | Ethereum (Testnet), MetaMask Integration                             |
| **Backend**         | No traditional backend (everything on-chain via smart contracts)     |
| **Deployment**      | Vercel for frontend, GitHub for version control                      |

---

## 📁 Folder Structure

```bash
DomiChain-Clean/
│
├── backend/                   # Hardhat + Solidity contracts
│   ├── contracts/
│   │   └── RealEstate.sol     # Smart contract for property management
│   ├── scripts/               # Deployment scripts
│   └── hardhat.config.js      # Hardhat config file
│
├── frontend/                  # React + Tailwind frontend
│   ├── src/
│   │   ├── components/        # All reusable UI components
│   │   ├── pages/             # Route-level


🛠️ Getting Started Locally
📦 Clone the Repository
bash
Copy
Edit
git clone https://github.com/sanketk77/DomiChain.git
cd DomiChain
⚙️ Frontend Setup
bash
Copy
Edit
cd DomiChain-Clean/frontend
npm install
npm run dev
Visit: http://localhost:5173 in your browser.

🔨 Compile Smart Contracts (Optional)
bash
Copy
Edit
cd ../backend
npm install
npx hardhat compile
🧾 Smart Contract Overview
The RealEstate.sol smart contract enables:

Adding new properties (buy/sell/rent/plot)

Tracking property metadata

Returning full property list to the UI

Ownership verification via connected wallet

🦊 MetaMask Integration
🧠 Auto-detect and connect MetaMask wallet

⛔ Block contract interactions when wallet is not connected

✅ Shows current connected account

Works on Sepolia or any Ethereum-compatible testnet

🧪 Testing
You can test smart contract logic locally using Hardhat and interact with deployed contracts on Sepolia testnet.

📜 License
This project is licensed under the MIT License – see the LICENSE file for details.

🙋‍♂️ Author
Sanket Kingaonkar
🔗 GitHub

yaml
Copy
Edit

---

### ✅ What to do next:

1. Copy the above content into your `README.md` file.
2. Make sure to replace the preview image if needed.
3. Then push:

```bash
git add README.md
git commit -m "Updated and polished README for DomiChain"
git push origin main
