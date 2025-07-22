import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { motion } from "framer-motion";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../constants";
import PropertyCard from "../components/PropertyCard";
import PropertyForm from "../components/PropertyForm";
import demoProperties from "../data/addDemoProperties"; // Ensure this file exists and exports an array

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const buttonHover = {
  scale: 1.05,
  transition: { type: "spring", stiffness: 300, damping: 20 },
};

export default function Home() {
  const [account, setAccount] = useState("");
  const [propertyList, setPropertyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(3);
  const [showAll, setShowAll] = useState(false);

  const connectWallet = useCallback(async () => {
    if (!window.ethereum) return alert("Please install MetaMask!");
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
      const address = await signer.getAddress();

      if (!properties || properties.length === 0) {
        setPropertyList(demoProperties); // fallback to static data
        return;
      }

      const formatted = properties.map((p, i) => ({
        id: i,
        name: p.name,
        city: p.city,
        price: p.price,
        image: p.imageUrl || "https://via.placeholder.com/400x250?text=House",
        description: p.description,
        owner: p.owner || address,
      }));

      setPropertyList(formatted);
    } catch (error) {
      console.error("Blockchain fetch error:", error);
      setPropertyList(demoProperties); // fallback on error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    connectWallet();
    fetchProperties();
  }, [connectWallet, fetchProperties]);

  const filteredProperties = propertyList.filter((p) =>
    `${p.name} ${p.city}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-offwhite px-4 sm:px-10 lg:px-20 py-10">
      <motion.section
        className="text-center mb-12"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
      >
        <motion.h1
          className="text-4xl sm:text-5xl font-bold text-gold mb-4"
          variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
        >
          🏠 Welcome to DomiChain
        </motion.h1>
        <motion.p
          className="text-gray-700 text-lg max-w-2xl mx-auto"
          variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
        >
          India's secure and transparent blockchain real estate exchange platform.
        </motion.p>
      </motion.section>

      <section className="bg-white border border-gold-light shadow-md rounded-xl p-6 sm:p-10 mb-12">
        <h2 className="text-2xl font-bold text-gold mb-4">📝 Add a New Property</h2>
        <PropertyForm onPropertyAdded={fetchProperties} />
      </section>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search by name or city..."
          className="px-5 py-3 border border-gold rounded-lg w-full max-w-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gold-light text-black placeholder:text-gray-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gold mb-4">📍 Listed Properties</h2>

        {loading ? (
          <p className="text-gray-600">Fetching properties from blockchain...</p>
        ) : filteredProperties.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProperties.slice(0, visibleCount).map((p) => (
              <motion.div key={p.id} variants={cardVariants}>
                <PropertyCard id={p.id} property={p} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-gray-600">No matching properties found.</p>
        )}

        {filteredProperties.length > visibleCount && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center gap-4 mt-8"
          >
            <motion.button
              whileHover={buttonHover}
              onClick={() => {
                setShowAll(!showAll);
                setVisibleCount(showAll ? 3 : filteredProperties.length);
              }}
              className="bg-gold hover:bg-gold-dark text-white font-medium px-6 py-2 rounded-full transition"
            >
              {showAll ? "Show Less" : "Show All"}
            </motion.button>

            {!showAll && (
              <motion.button
                whileHover={buttonHover}
                onClick={() => setVisibleCount((prev) => prev + 3)}
                className="bg-white text-gold border border-gold hover:bg-gold hover:text-white font-medium px-6 py-2 rounded-full transition"
              >
                Load More
              </motion.button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
