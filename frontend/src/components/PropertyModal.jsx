// PropertyModal.jsx
import React from "react";

const PropertyModal = ({ property, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-blue-700 mb-2">{property.name}</h3>
          <p className="text-gray-600 mb-1">📍 {property.city}</p>
          <p className="text-green-600 font-semibold text-lg mb-3">{property.price}</p>
          <img
            src={property.imageUrl}
            alt={property.name}
            className="w-full h-48 object-cover rounded mb-4"
          />
          <button
            onClick={onClose}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PropertyModal;
