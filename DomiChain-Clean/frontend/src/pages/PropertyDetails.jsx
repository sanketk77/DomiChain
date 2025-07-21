// src/pages/PropertyDetails.jsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../constants";
import { FiArrowLeft } from "react-icons/fi";

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  const getPropertyType = (type) => {
    switch (type) {
      case 0: return "Buy";
      case 1: return "Sell";
      case 2: return "Rent";
      case 3: return "Plot";
      default: return "Unknown";
    }
  };

  const fetchProperty = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const properties = await contract.getAllProperties();
      const prop = properties[id];

      if (!prop) {
        alert("Property not found");
        return;
      }

      setProperty({
        name: prop.name,
        city: prop.city,
        price: prop.price,
        image: prop.imageUrl || "https://via.placeholder.com/400x250?text=Property",
        description: prop.description || "No description provided.",
        propertyType: getPropertyType(prop.propertyType),
        owner: prop.owner,
      });

    } catch (error) {
      console.error("Error loading property:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Loading property details...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-600 text-lg">Property not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16 px-6 pt-10 max-w-5xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-indigo-600 mb-6 hover:underline"
      >
        <FiArrowLeft className="mr-2" /> Back
      </button>

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        <img
          src={property.image}
          alt={property.name}
          className="w-full md:w-1/2 h-72 md:h-auto object-cover"
        />

        <div className="p-6 space-y-4">
          <h1 className="text-3xl font-bold text-charcoal">{property.name}</h1>

          <p className="text-lg text-slate-600">
            <span className="font-medium text-charcoal">📍 City:</span> {property.city}
          </p>

          <p className="text-2xl font-bold text-green-700">₹ {property.price}</p>

          <p className="text-sm text-gray-700 mt-2">{property.description}</p>

          <div className="text-sm text-gray-500">
            <span className="font-medium text-charcoal">Type:</span> {property.propertyType}
          </div>

          <div className="text-sm text-gray-500">
            <span className="font-medium text-charcoal">Owner:</span>{" "}
            {property.owner ? `${property.owner.slice(0, 6)}...${property.owner.slice(-4)}` : "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
}
