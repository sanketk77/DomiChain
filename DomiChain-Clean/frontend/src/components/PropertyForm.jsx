import { useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constants";

function PropertyForm({ onPropertyAdded }) {
  const [form, setForm] = useState({
    name: "",
    city: "",
    price: "",
    imageUrl: "",
    description: "",
    propertyType: "0", // default to "Buy"
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    const { name, city, price, imageUrl, description, propertyType } = form;

    if (!name || !city || !price || !imageUrl || !description) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      if (!window.ethereum) return alert("Install MetaMask");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const tx = await contract.addProperty(name, city, price, imageUrl, description, parseInt(propertyType));
      await tx.wait();

      alert("✅ Property added successfully!");
      setForm({
        name: "",
        city: "",
        price: "",
        imageUrl: "",
        description: "",
        propertyType: "0",
      });

      onPropertyAdded && onPropertyAdded();
    } catch (error) {
      console.error("❌ Failed to add property:", error);
      alert("Transaction failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-gold mb-4">📝 Add New Property</h2>

      <div className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Property Name"
          className="input-style"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          className="input-style"
          value={form.city}
          onChange={handleChange}
        />
        <input
          type="text"
          name="price"
          placeholder="Price (e.g. ₹2.5 Cr)"
          className="input-style"
          value={form.price}
          onChange={handleChange}
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          className="input-style"
          value={form.imageUrl}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          rows={3}
          className="input-style"
          value={form.description}
          onChange={handleChange}
        />
        <select
          name="propertyType"
          className="input-style"
          value={form.propertyType}
          onChange={handleChange}
        >
          <option value="0">Buy</option>
          <option value="1">Sell</option>
          <option value="2">Rent</option>
          <option value="3">Plot</option>
        </select>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-gold hover:bg-gold-dark text-white font-semibold py-2 px-6 rounded-lg w-full"
        >
          {loading ? "⏳ Adding..." : "Add Property"}
        </button>
      </div>
    </div>
  );
}

export default PropertyForm;
