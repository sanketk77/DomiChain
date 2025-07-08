// src/components/PropertyCard.jsx

import { Link } from "react-router-dom";

export default function PropertyCard({ property, id }) {
  const truncateAddress = (address) =>
    `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <Link to={`/property/${id}`}>
      <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
        <img
          src={property.image || "https://via.placeholder.com/400x250?text=Property"}
          alt={property.name}
          className="w-full h-48 object-cover"
        />

        <div className="p-4">
          <h2 className="text-xl font-semibold text-indigo-700">{property.name}</h2>
          <p className="text-sm text-gray-600">{property.city}</p>
          <p className="mt-2 text-lg font-bold text-green-700">₹ {property.price}</p>
          <p className="text-xs text-gray-400 mt-1">
            Owner: {truncateAddress(property.owner)}
          </p>
        </div>
      </div>
    </Link>
  );
}
