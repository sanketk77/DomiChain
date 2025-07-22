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
