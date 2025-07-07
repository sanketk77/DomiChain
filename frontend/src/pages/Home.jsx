import { useState, useEffect, useCallback } from "react";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../constants";
import Navbar from "../components/Navbar";
import PropertyCard from "../components/PropertyCard";
import PropertyForm from "../components/PropertyForm";
import WalletConnect from "../components/WalletConnect";
import PropertyModal from "../components/PropertyModal";

function Home() {
  const [visibleCount, setVisibleCount] = useState(3);
  const [showAll, setShowAll] = useState(false);
  const [account, setAccount] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProperty, setSelectedProperty] = useState(null);

  const connectWallet = useCallback(async () => {
    if (!window.ethereum) return alert("Please install MetaMask to use DomiChain");
    if (account) return alert("Wallet already connected");
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    setAccount(accounts[0]);
  }, [account]);

  const getProperty = useCallback(async () => {
    // Property fetch logic here
  }, []);

  useEffect(() => {
    connectWallet();
    getProperty();
  }, [connectWallet, getProperty]);

  const propertyList = [
    {
      name: "Skyline Apartment",
      city: "Mumbai",
      price: "₹1.2 Cr",
      imageUrl: "https://source.unsplash.com/featured/?mumbai,house",
    },
    {
      name: "Dream Villa",
      city: "Pune",
      price: "₹2.5 Cr",
      imageUrl: "https://source.unsplash.com/featured/?villa",
    },
    {
      name: "Ocean View Apartment",
      city: "Goa",
      price: "₹3 Cr",
      imageUrl: "https://source.unsplash.com/featured/?beach,apartment",
    },
    {
      name: "Luxury Condo",
      city: "Bangalore",
      price: "₹1.8 Cr",
      imageUrl: "https://source.unsplash.com/featured/?condo",
    },
    {
      name: "Modern House",
      city: "Hyderabad",
      price: "₹2 Cr",
      imageUrl: "https://source.unsplash.com/featured/?modern,house",
    },
    {
      name: "Beachfront Property",
      city: "Chennai",
      price: "₹2.2 Cr",
      imageUrl: "https://source.unsplash.com/featured/?beach,home",
    },
  ];

  const filteredProperties = propertyList.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar />

      <div className="bg-blue-50 py-12 px-6 text-center shadow-inner">
        <h1 className="text-4xl font-bold text-blue-700 mb-2">🏠 Welcome to DomiChain</h1>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
          A decentralized real estate platform where you can list, view, and manage properties securely on the blockchain.
        </p>
      </div>

      <div className="min-h-screen bg-gray-100 p-6">
        <WalletConnect account={account} />

        <div className="max-w-4xl mx-auto">
          <PropertyForm onPropertyAdded={getProperty} />

          <input
            type="text"
            placeholder="Search by name or city..."
            className="px-4 py-2 border border-gray-300 rounded w-full max-w-md mb-6"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
          />

          <h2 className="text-2xl font-bold mb-4 text-blue-700">📍 Listed Property on DomiChain</h2>

          {selectedProperty && (
            <PropertyModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />
          )}

          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProperties.slice(0, visibleCount).map((p, index) => (
                <PropertyCard
                  key={index}
                  name={p.name}
                  city={p.city}
                  price={p.price}
                  imageUrl={p.imageUrl}
                  onClick={() => setSelectedProperty(p)}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No matching properties found.</p>
          )}

          <div className="mt-6">
            {filteredProperties.length > visibleCount && (
              <div className="flex justify-center mt-6 space-x-4">
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
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Load More
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
