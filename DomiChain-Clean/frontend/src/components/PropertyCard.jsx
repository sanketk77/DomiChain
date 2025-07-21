import { Link } from "react-router-dom";

export default function PropertyCard({ property, id }) {
  const truncateAddress = (address) =>
    `${address?.slice(0, 6)}...${address?.slice(-4)}`;

  // Convert enum (uint8) to readable category
  const getPropertyType = (type) => {
    switch (Number(type)) {
      case 0:
        return "Buy";
      case 1:
        return "Sell";
      case 2:
        return "Rent";
      case 3:
        return "Plot";
      default:
        return "Unknown";
    }
  };

  return (
    <Link to={`/property/${id}`} aria-label={`View details for ${property.name}`}>
      <div className="bg-white rounded-3xl border border-gold-light shadow-md hover:shadow-xl hover:scale-[1.03] transition-transform duration-300 ease-in-out overflow-hidden">
        {/* Image */}
        <img
          src={property.image || "https://via.placeholder.com/400x250?text=House"}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x250?text=House";
          }}
          alt={property.name}
          className="w-full h-48 object-cover rounded-t-xl"
        />

        {/* Info */}
        <div className="p-5">
          <h2 className="text-xl font-bold text-gold mb-1 tracking-wide">
            {property.name}
          </h2>

          <p className="flex items-center text-sm text-charcoal mb-1">
            <span className="mr-1 text-gold">📍</span> {property.city}
          </p>

          <p className="text-2xl font-bold text-gold-dark mb-2 tracking-tight">
            ₹ {property.price}
          </p>

          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {property.description || "No description provided."}
          </p>

          {/* Tags */}
          <div className="flex justify-between items-center mt-4">
            <span className="inline-flex items-center gap-2 bg-gold-light text-charcoal text-xs font-medium px-3 py-1 rounded-full">
              Owner: {truncateAddress(property.owner)}
            </span>

            <span className="text-xs px-2 py-1 rounded-full bg-gold-dark text-white font-semibold">
              {getPropertyType(property.propertyType)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
