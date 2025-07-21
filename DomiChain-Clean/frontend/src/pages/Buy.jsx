// src/pages/Buy.jsx

import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../constants";
import PropertyCard from "../components/PropertyCard";
import { motion } from "framer-motion";

export default function Buy() {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      const data = await contract.getAllProperties();

      const formatted = properties.map((p, i) => ({
  id: i,
  name: p.name,
  city: p.city,
  price: p.price,
  image: p.imageUrl,
  description: p.description,
  owner: signer.address,
}));


      setProperties(formatted);
    } catch (error) {
      console.error("Blockchain fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const filtered = properties.filter((p) => {
    const matchesSearch =
      `${p.name} ${p.city}`.toLowerCase().includes(search.toLowerCase());
    const matchesCity = cityFilter ? p.city.toLowerCase() === cityFilter : true;
    return matchesSearch && matchesCity;
  });

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      <section className="bg-charcoal text-gold-light py-16 text-center">
        <h1 className="text-4xl font-extrabold text-gold mb-2">🏘️ Buy Property</h1>
        <p className="max-w-2xl mx-auto text-gold-light">Explore blockchain-listed properties to buy across India.</p>
      </section>

      {/* Filters */}
      <div className="max-w-6xl mx-auto px-6 pt-10 space-y-6">
        <div className="flex flex-wrap gap-4 justify-start">
          <input
            type="text"
            placeholder="Search by name or city"
            className="px-4 py-2 border border-gray-300 rounded shadow-sm w-full sm:w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            onChange={(e) => setCityFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded shadow-sm w-full sm:w-52"
          >
            <option value="">All Cities</option>
            {[...new Set(properties.map((p) => p.city))].map((city, i) => (
              <option key={i} value={city.toLowerCase()}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Grid */}
        {loading ? (
          <p className="text-gray-500 text-center mt-10">Loading properties...</p>
        ) : filtered.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            {filtered.map((property) => (
              <motion.div
                key={property.id}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              >
                <PropertyCard id={property.id} property={property} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-gray-500 text-center mt-6">No matching properties found.</p>
        )}
      </div>
    </div>
  );
}
