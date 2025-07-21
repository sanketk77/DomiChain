import React from "react";
import { motion, AnimatePresence } from "framer-motion";

// Helper to map enum value to readable type
const getPropertyType = (type) => {
  switch (type) {
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

const truncateAddress = (address) =>
  address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Unknown";

const PropertyModal = ({ property, onClose }) => {
  return (
    <AnimatePresence>
      {property && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-full relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={property.image || "https://via.placeholder.com/400x250?text=Property"}
              alt={property.name}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 className="text-2xl font-bold text-gold mb-2">{property.name}</h3>
            <p className="text-sm text-charcoal mb-1">📍 {property.city}</p>
            <p className="text-xl font-semibold text-gold-dark mb-2">
              ₹ {property.price}
            </p>
            <p className="text-gray-600 text-sm mb-2">{property.description}</p>

            <div className="flex justify-between items-center mt-4">
              <span className="text-xs font-medium bg-gold-light text-charcoal px-3 py-1 rounded-full">
                Type: {getPropertyType(property.propertyType)}
              </span>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                Owner: {truncateAddress(property.owner)}
              </span>
            </div>

            <button
              onClick={onClose}
              className="mt-6 w-full bg-gold text-white font-bold py-2 rounded-lg hover:bg-gold-dark transition"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PropertyModal;
