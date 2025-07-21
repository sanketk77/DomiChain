// scripts/deploy.js
const fs = require("fs");
const path = require("path");
const hre = require("hardhat");

async function main() {
  const RealEstate = await hre.ethers.getContractFactory("RealEstate");
  const realEstate = await RealEstate.deploy(); // ✅ No arguments

  await realEstate.waitForDeployment();
  const contractAddress = await realEstate.getAddress();

  console.log("Contract deployed to:", contractAddress);

  // ✅ Save contract address to frontend
  const addressContent = `export const CONTRACT_ADDRESS = "${contractAddress}";\n`;
  fs.writeFileSync(
    path.join(__dirname, "../../frontend/src/constants/contractAddress.js"),
    addressContent
  );

  // ✅ Save ABI to frontend
  const artifact = await hre.artifacts.readArtifact("RealEstate");
  fs.writeFileSync(
    path.join(__dirname, "../../frontend/src/constants/RealEstateABI.json"),
    JSON.stringify(artifact.abi, null, 2)
  );

  console.log("✅ ABI and address copied to frontend!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
