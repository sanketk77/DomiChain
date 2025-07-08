// src/pages/Home.jsx

import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../constants";
import PropertyCard from "../components/PropertyCard";
import PropertyForm from "../components/PropertyForm";
import WalletConnect from "../components/WalletConnect";

function Home() {
  const [account, setAccount] = useState("");
  const [propertyList, setPropertyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(3);
  const [showAll, setShowAll] = useState(false);

  const connectWallet = useCallback(async () => {
    if (!window.ethereum) return alert("Please install MetaMask to use DomiChain");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    setAccount(accounts[0]);
  }, []);

  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const properties = await contract.getAllProperties();

      const formatted = properties.map((p, i) => ({
        id: i,
        name: p.name,
        city: p.city,
        price: p.price,
        image: p.imageUrl,
        owner: signer.address,
      }));

      setPropertyList(formatted);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    connectWallet();
    fetchProperties();
  }, [connectWallet, fetchProperties]);

  const filteredProperties = propertyList.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery) ||
      p.city.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="w-full">
      {/* Top Banner */}
      <div className="bg-blue-50 py-12 px-6 text-center shadow-inner w-full">
        <h1 className="text-4xl font-bold text-blue-700 mb-2">🏠 Welcome to DomiChain</h1>
        <p className="text-gray-700 text-lg max-w-3xl mx-auto">
          A decentralized real estate platform where you can list, view, and manage properties securely on the blockchain.
        </p>
      </div>

      {/* Content Section */}
      <div className="bg-gray-100 px-6 py-10 w-full min-h-screen">
        <WalletConnect account={account} />
        <PropertyForm onPropertyAdded={fetchProperties} />

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name or city..."
          className="px-4 py-2 border border-gray-300 rounded w-full max-w-md mb-6 mt-4"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
        />

        {/* Property List */}
        <h2 className="text-2xl font-bold mb-4 text-blue-700">📍 Listed Properties</h2>

        {loading ? (
          <p className="text-gray-600">Loading properties from blockchain...</p>
        ) : filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProperties.slice(0, visibleCount).map((p) => (
              <PropertyCard key={p.id} id={p.id} property={p} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No matching properties found.</p>
        )}

        {/* Load More / Show All */}
        {filteredProperties.length > visibleCount && (
          <div className="flex justify-center mt-6 gap-4">
            <button
              onClick={() => {
                setShowAll(!showAll);
                setVisibleCount(showAll ? 3 : filteredProperties.length);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
            >
              {showAll ? "Show Less" : "Show All"}
            </button>

            {!showAll && (
              <button
                onClick={() => setVisibleCount((prev) => prev + 3)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
              >
                Load More
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
