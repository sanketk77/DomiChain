import { useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constants";

function PropertyForm({ onPropertyAdded }) {
  const [input, setInput] = useState("");

  const submitProperty = async () => {
    if (!input.trim()) return alert("Enter a property name");

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    const tx = await contract.setProperty(input);
    await tx.wait();

    setInput("");
    onPropertyAdded();
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-2 text-blue-700">📝 Add Property</h2>
      <input
        type="text"
        placeholder="Property Name"
        className="px-4 py-2 border border-gray-300 rounded mr-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={submitProperty}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
}

export default PropertyForm;
