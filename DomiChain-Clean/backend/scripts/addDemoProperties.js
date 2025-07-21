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
  // BUY (5)
  {
    name: "Skyline Apartments",
    city: "Mumbai",
    price: "₹3.2 Cr",
   imageUrl: `https://source.unsplash.com/400x250/?villa,${p.city.toLowerCase()}`,

    description: "⚠️ 3BHK sea-facing apartment in Bandra with balcony views.",
    type: PROPERTY_TYPES.BUY,
  },
  {
    name: "Green Horizon Villas",
    city: "Pune",
    price: "₹2.7 Cr",
    imageUrl: `https://source.unsplash.com/400x250/?villa,${p.city.toLowerCase()}`,

    description: "⚠️ Premium villa in Koregaon Park, Pune with garden space.",
    type: PROPERTY_TYPES.BUY,
  },
  {
    name: "Luxury Sky Tower",
    city: "Delhi",
    price: "₹4 Cr",
    imageUrl: `https://source.unsplash.com/400x250/?villa,${p.city.toLowerCase()}`,

    description: "⚠️ 4BHK penthouse in South Delhi, fully furnished.",
    type: PROPERTY_TYPES.BUY,
  },
  {
    name: "Urban Nest",
    city: "Bangalore",
    price: "₹3 Cr",
    imageUrl: `https://source.unsplash.com/400x250/?villa,${p.city.toLowerCase()}`,

    description: "⚠️ Smart 3BHK flat in Whitefield, Bangalore.",
    type: PROPERTY_TYPES.BUY,
  },
  {
    name: "Kochi Waterfront Villa",
    city: "Kochi",
    price: "₹2.3 Cr",
   imageUrl: `https://source.unsplash.com/400x250/?villa,${p.city.toLowerCase()}`,

    description: "⚠️ 2-story villa facing Kochi backwaters.",
    type: PROPERTY_TYPES.BUY,
  },

  // SELL (5)
  {
    name: "Pink City Mansion",
    city: "Jaipur",
    price: "₹1.9 Cr",
  imageUrl: `https://source.unsplash.com/400x250/?villa,${p.city.toLowerCase()}`,

    description: "⚠️ Historic 5BHK haveli-style home in central Jaipur.",
    type: PROPERTY_TYPES.SELL,
  },
  {
    name: "Cyber Heights",
    city: "Hyderabad",
    price: "₹2.75 Cr",
  imageUrl: `https://source.unsplash.com/400x250/?villa,${p.city.toLowerCase()}`,

    description: "⚠️ High-rise 3BHK in Gachibowli tech zone.",
    type: PROPERTY_TYPES.SELL,
  },
  {
    name: "Riverfront Bungalow",
    city: "Surat",
    price: "₹1.8 Cr",
   imageUrl: `https://source.unsplash.com/400x250/?villa,${p.city.toLowerCase()}`,

    description: "⚠️ Independent 4BHK bungalow on Tapi riverbank.",
    type: PROPERTY_TYPES.SELL,
  },
  {
    name: "Indore Skyline View",
    city: "Indore",
    price: "₹1.65 Cr",
   imageUrl: `https://source.unsplash.com/400x250/?villa,${p.city.toLowerCase()}`,

    description: "⚠️ City view 2BHK near Vijay Nagar.",
    type: PROPERTY_TYPES.SELL,
  },
  {
    name: "Lakefront House",
    city: "Bhopal",
    price: "₹2.1 Cr",
    imageUrl: `https://source.unsplash.com/400x250/?villa,${p.city.toLowerCase()}`,

    description: "⚠️ Villa facing Upper Lake in Bhopal.",
    type: PROPERTY_TYPES.SELL,
  },

  // RENT (5)
  {
    name: "Beachside Studio",
    city: "Chennai",
    price: "₹35,000/month",
   imageUrl: `https://source.unsplash.com/400x250/?villa,${p.city.toLowerCase()}`,

    description: "⚠️ 1BHK rental near Marina Beach, Chennai.",
    type: PROPERTY_TYPES.RENT,
  },
  {
    name: "Smart Flat",
    city: "Chandigarh",
    price: "₹28,000/month",
   imageUrl: `https://source.unsplash.com/400x250/?villa,${p.city.toLowerCase()}`,

    description: "⚠️ Fully furnished 2BHK near Sukhna Lake.",
    type: PROPERTY_TYPES.RENT,
  },
  {
    name: "Goa Retreat Home",
    city: "Goa",
    price: "₹60,000/month",
    imageUrl: `https://source.unsplash.com/400x250/?villa,${p.city.toLowerCase()}`,

    description: "⚠️ Rentable villa in Candolim, perfect for beach lovers.",
    type: PROPERTY_TYPES.RENT,
  },
  {
    name: "Metro Studio",
    city: "Nagpur",
    price: "₹20,000/month",
    imageUrl: `https://source.unsplash.com/400x250/?villa,${p.city.toLowerCase()}`,

    description: "⚠️ Compact and modern studio in central Nagpur.",
    type: PROPERTY_TYPES.RENT,
  },
  {
    name: "Lucknow City View",
    city: "Lucknow",
    price: "₹22,000/month",
 imageUrl: `https://source.unsplash.com/400x250/?villa,${p.city.toLowerCase()}`,

    description: "⚠️ 2BHK with balcony in Gomti Nagar.",
    type: PROPERTY_TYPES.RENT,
  },

  // PLOT (5)
  {
    name: "Nashik Farm Plot",
    city: "Nashik",
    price: "₹60 Lakh",
    imageUrl: `https://source.unsplash.com/400x250/?villa,${p.city.toLowerCase()}`,

    description: "⚠️ Agricultural plot near Sinnar highway.",
    type: PROPERTY_TYPES.PLOT,
  },
  {
    name: "Raipur Residential Plot",
    city: "Raipur",
    price: "₹45 Lakh",
    imageUrl: `https://source.unsplash.com/400x250/?villa,${p.city.toLowerCase()}`,

    description: "⚠️ 2000 sq.ft. residential plot in Avanti Vihar.",
    type: PROPERTY_TYPES.PLOT,
  },
  {
    name: "Mysore Green Plot",
    city: "Mysore",
    price: "₹80 Lakh",
    imageUrl: `https://source.unsplash.com/400x250/?villa,${p.city.toLowerCase()}`,

    description: "⚠️ 3000 sq.ft plot near Chamundi Hills.",
    type: PROPERTY_TYPES.PLOT,
  },
  {
    name: "Varanasi Ganga View Plot",
    city: "Varanasi",
    price: "₹90 Lakh",
   imageUrl: `https://source.unsplash.com/400x250/?villa,${p.city.toLowerCase()}`,

    description: "⚠️ Plot with partial view of Ganges river.",
    type: PROPERTY_TYPES.PLOT,
  },
  {
    name: "Ranchi City Plot",
    city: "Ranchi",
    price: "₹50 Lakh",
    imageUrl: `https://source.unsplash.com/400x250/?villa,${p.city.toLowerCase()}`,

    description: "⚠️ Open plot near Hatia Railway Station.",
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
