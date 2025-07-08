// src/pages/PropertyDetails.jsx

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../constants";

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPropertyById = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const prop = await contract.properties(id); // public array access
      setProperty({
        id,
        name: prop.name,
        city: prop.city,
        price: prop.price,
        image: prop.imageUrl,
        owner: await signer.getAddress(),
      });
    } catch (err) {
      console.error("Error fetching property:", err);
      setProperty(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPropertyById();
  }, [id]);

  if (loading) {
    return <div className="p-10 text-center">Loading property details...</div>;
  }

  if (!property) {
    return (
      <div className="p-10 text-center text-red-600 font-semibold text-xl">
        Property not found.
        <br />
        <Link to="/" className="text-blue-600 underline">← Go back to home</Link>
      </div>
    );
  }

  return (
    <div className="p-10 w-full flex flex-col items-center">
      <img
        src={property.image || "https://via.placeholder.com/600x400?text=Property"}
        alt={property.name}
        className="rounded-xl shadow-lg w-full max-w-2xl h-[400px] object-cover mb-8"
      />

      <div className="text-center max-w-2xl">
        <h2 className="text-3xl font-bold text-indigo-700 mb-2">{property.name}</h2>
        <p className="text-gray-600 text-lg mb-1">📍 City: {property.city}</p>
        <p className="text-green-600 text-xl font-semibold mb-3">₹ {property.price}</p>
        <p className="text-sm text-gray-500">🏠 Owner: {property.owner}</p>

        <Link
          to="/"
          className="mt-6 inline-block bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
        >
          ← Back to Properties
        </Link>
      </div>
    </div>
  );
}
