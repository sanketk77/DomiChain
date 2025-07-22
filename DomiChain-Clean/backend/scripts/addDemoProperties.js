require("dotenv").config();
const { ethers } = require("hardhat");

// PropertyType Enum Mapping


const PROPERTY_TYPES = {
  BUY: 0,
  SELL: 1,
  RENT: 2,
  PLOT: 3,
};

const demoProperties = [
  // --- BUY ---
  {
    name: "Palm Breeze Villa",
    city: "Mumbai",
    price: "₹3.5 Cr",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    description: "Sea-facing 4BHK villa in South Mumbai.",
    type: PROPERTY_TYPES.BUY,
  },
  {
    name: "Emerald Heights",
    city: "Bangalore",
    price: "₹2.8 Cr",
    imageUrl: "https://images.unsplash.com/photo-1572120360610-d971b9b78825",
    description: "Modern luxury apartment in Indiranagar.",
    type: PROPERTY_TYPES.BUY,
  },
  {
    name: "Golden Meadows",
    city: "Delhi",
    price: "₹4.2 Cr",
    imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
    description: "Luxurious 5BHK farmhouse near Chattarpur.",
    type: PROPERTY_TYPES.BUY,
  },
  {
    name: "Urban Pearl",
    city: "Pune",
    price: "₹2.1 Cr",
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    description: "Premium 3BHK apartment in Baner.",
    type: PROPERTY_TYPES.BUY,
  },
  {
    name: "Hillview Residence",
    city: "Shimla",
    price: "₹1.8 Cr",
    imageUrl: "https://images.unsplash.com/photo-1586105251261-72a756497a12",
    description: "3BHK hillside bungalow with scenic views.",
    type: PROPERTY_TYPES.BUY,
  },

  // --- SELL ---
  {
    name: "Royal Enclave",
    city: "Jaipur",
    price: "₹2.3 Cr",
    imageUrl: "https://images.unsplash.com/photo-1554995207-c18c203602cb",
    description: "Classic haveli-style home near city palace.",
    type: PROPERTY_TYPES.SELL,
  },
  {
    name: "Skyline Tower",
    city: "Hyderabad",
    price: "₹3.1 Cr",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    description: "4BHK high-rise apartment in HiTech City.",
    type: PROPERTY_TYPES.SELL,
  },
  {
    name: "Lakewood Estate",
    city: "Bhopal",
    price: "₹1.9 Cr",
    imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
    description: "Lakefront independent house near Upper Lake.",
    type: PROPERTY_TYPES.SELL,
  },
  {
    name: "Maple Gardens",
    city: "Lucknow",
    price: "₹1.6 Cr",
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    description: "3BHK villa with private garden in Gomti Nagar.",
    type: PROPERTY_TYPES.SELL,
  },
  {
    name: "Riverstone Villa",
    city: "Surat",
    price: "₹2.0 Cr",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    description: "Premium 4BHK house near Tapi river.",
    type: PROPERTY_TYPES.SELL,
  },

  // --- RENT ---
  {
    name: "Studio Luxe",
    city: "Chennai",
    price: "₹35,000/month",
    imageUrl: "https://images.unsplash.com/photo-1598928506311-c55dedb8aa0e",
    description: "Stylish 1BHK studio near Marina Beach.",
    type: PROPERTY_TYPES.RENT,
  },
  {
    name: "Central Flat",
    city: "Nagpur",
    price: "₹22,000/month",
    imageUrl: "https://images.unsplash.com/photo-1572120360610-d971b9b78825",
    description: "Compact 2BHK near Sitabuldi Metro.",
    type: PROPERTY_TYPES.RENT,
  },
  {
    name: "Goa Holiday Home",
    city: "Goa",
    price: "₹45,000/month",
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    description: "2BHK villa with private pool in Calangute.",
    type: PROPERTY_TYPES.RENT,
  },
  {
    name: "Smart City Pad",
    city: "Ahmedabad",
    price: "₹25,000/month",
    imageUrl: "https://images.unsplash.com/photo-1586105251261-72a756497a12",
    description: "Smart-enabled 2BHK near SG Highway.",
    type: PROPERTY_TYPES.RENT,
  },
  {
    name: "Udaipur Hillside Flat",
    city: "Udaipur",
    price: "₹30,000/month",
    imageUrl: "https://images.unsplash.com/photo-1598928506311-c55dedb8aa0e",
    description: "Beautiful apartment with Aravalli views.",
    type: PROPERTY_TYPES.RENT,
  },

  // --- PLOT ---
  {
    name: "Green Acres Plot",
    city: "Nashik",
    price: "₹55 Lakh",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    description: "Residential plot near Gangapur Road.",
    type: PROPERTY_TYPES.PLOT,
  },
  {
    name: "Sunset Fields",
    city: "Raipur",
    price: "₹40 Lakh",
    imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
    description: "Open plot in developing residential zone.",
    type: PROPERTY_TYPES.PLOT,
  },
  {
    name: "Mysore Retreat Plot",
    city: "Mysore",
    price: "₹75 Lakh",
    imageUrl: "https://images.unsplash.com/photo-1586105251261-72a756497a12",
    description: "Ideal plot for villa near Chamundi Hills.",
    type: PROPERTY_TYPES.PLOT,
  },
  {
    name: "Ganga View Land",
    city: "Varanasi",
    price: "₹95 Lakh",
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    description: "Plot with Ganga-facing panoramic view.",
    type: PROPERTY_TYPES.PLOT,
  },
  {
    name: "Ranchi Meadows",
    city: "Ranchi",
    price: "₹48 Lakh",
    imageUrl: "https://images.unsplash.com/photo-1598928506311-c55dedb8aa0e",
    description: "Plot near Hatia Airport, fully fenced.",
    type: PROPERTY_TYPES.PLOT,
  },
];


async function main() {
  const contractAddress = process.env.CONTRACT_ADDRESS || "0x6b1aBFc124b4Ac379F16Dd5792D81732fbB2F0Ed";
  const contract = await ethers.getContractAt("RealEstate", contractAddress);

  for (let i = 0; i < demoProperties.length; i++) {
    const p = demoProperties[i];
    try {
      console.log(`⏳ Adding property ${i + 1}: ${p.name} (${p.city})`);
      const tx = await contract.addProperty(
        p.name,
        p.city,
        p.price,
        p.imageUrl,
        p.description,
        p.type
      );
      await tx.wait();
      console.log(`✅ Added: ${p.name}`);
    } catch (err) {
      console.error(`❌ Failed to add ${p.name}:`, err.message);
    }
  }

  console.log("🏁 All properties processed.");
}

main().catch((error) => {
  console.error("🚨 Script failed:", error);
  process.exitCode = 1;
});
