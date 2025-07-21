// src/components/Footer.jsx

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-gold-light py-10 px-6 mt-20 border-t border-gold">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
        {/* Brand + Slogan */}
        <div>
          <h2 className="text-xl font-bold text-gold mb-1">🏠 DomiChain</h2>
          <p className="text-sm text-gold-light">Empowering real estate on the blockchain.</p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-5 text-sm font-medium">
          <Link to="/buy" className="hover:text-white transition">Buy</Link>
          <Link to="/rent" className="hover:text-white transition">Rent</Link>
          <Link to="/sell" className="hover:text-white transition">Sell</Link>
          <Link to="/plots" className="hover:text-white transition">Plots</Link>
          <Link to="/" className="hover:text-white transition">Home</Link>
        </div>

        {/* Legal Note */}
        <div className="text-xs text-gold-light mt-4 md:mt-0">
          &copy; {new Date().getFullYear()} DomiChain. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
