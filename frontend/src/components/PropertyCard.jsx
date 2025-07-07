function PropertyCard({ name, city, price, imageUrl, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden mb-6 hover:shadow-lg transition duration-300 cursor-pointer"
    >
      <img
        src={imageUrl || "https://source.unsplash.com/featured/?house"}
        alt="Property"
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{name}</h3>
        <p className="text-gray-600 mb-1">📍 {city}</p>
        <p className="text-green-600 font-semibold text-lg">{price}</p>
      </div>
    </div>
  );
}

export default PropertyCard;
