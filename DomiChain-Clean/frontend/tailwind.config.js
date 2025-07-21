// tailwind.config.js

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          light: "#f0e6d2",     // Gold variant for hover or accents
          DEFAULT: "#bfa76f",   // Primary gold
          dark: "#9e864a",      // Deeper gold for emphasis
        },
        charcoal: {
          light: "#2a2a2a",     // For cards and subtle backgrounds
          DEFAULT: "#1f1f1f",   // Header/Footer dark
          dark: "#151515",      // Optional deeper
        },
        offwhite: "#f9f6f1",     // Creamy UI background
      },
      fontFamily: {
        headline: ["'Poppins'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
