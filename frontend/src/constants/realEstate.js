import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "./contractAddress";
import RealEstateABI from "./RealEstateABI.json"; // we will create this next

// Get provider from MetaMask
const getEthereumObject = () => window.ethereum;

const getContract = () => {
  const ethereum = getEthereumObject();

  if (!ethereum) {
    alert("Make sure you have MetaMask!");
    return null;
  }

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, RealEstateABI, signer);

  return contract;
};

export default getContract;
