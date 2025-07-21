// src/pages/AddProperty.jsx

import { useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constants";

// ✅ Unsplash image fetcher
const fetchRandomImage = async () => {
  try {
    const res = await fetch(
      `https://api.unsplash.com/photos/random?query=house&orientation=landscape&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
    );
    const data = await res.json();
    return data?.urls?.regular || "https://via.placeholder.com/400x250?text=House";
  } catch (error) {
    console.error("Unsplash image fetch failed:", error);
    return "https://via.placeholder.com/400x250?text=House";
  }
};

export default function AddProperty() {
  const [form, setForm] = useState({
    name: "",
    city: "",
    price: "",
    image: "",
    description: "",
    propertyType: "0", // Default to 'Buy'
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      if (!window.ethereum) return alert("Install MetaMask!");

      // ✅ Auto-fetch image if not given
      let imageUrl = form.image;
      if (!imageUrl.trim()) {
        imageUrl = await fetchRandomImage();
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const tx = await contract.addProperty(
        form.name,
        form.city,
        form.price,
        imageUrl,
        form.description,
        parseInt(form.propertyType)
      );
      await tx.wait();

      setSuccess("✅ Property added successfully!");
      setForm({
        name: "",
        city: "",
        price: "",
        image: "",
        description: "",
        propertyType: "0",
      });
    } catch (error) {
      console.error("Property add error:", error);
      alert("❌ Failed to add property.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-offwhite px-6 py-12 flex flex-col items-center">
      <h1 className="text-3xl font-headline font-extrabold text-gold mb-6">
        ➕ Add New Property
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl space-y-6"
      >
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Property Name"
            value={form.name}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold w-full"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold w-full"
          />
          <input
            type="text"
            name="price"
            placeholder="Price (e.g., ₹1.5 Cr)"
            value={form.price}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold w-full"
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL (leave blank for random)"
            value={form.image}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold w-full"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold w-full resize-none"
          />
          <select
            name="propertyType"
            value={form.propertyType}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold w-full"
          >
            <option value="0">🏠 Buy</option>
            <option value="1">🏡 Sell</option>
            <option value="2">🏘️ Rent</option>
            <option value="3">🧱 Plot</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gold hover:bg-gold-dark text-white font-bold py-3 rounded-lg shadow transition-transform transform hover:scale-105"
        >
          {loading ? "⏳ Adding..." : "Add Property"}
        </button>

        {success && (
          <p className="text-green-700 font-medium text-center mt-2">
            {success}
          </p>
        )}
      </form>
    </div>
  );
}
