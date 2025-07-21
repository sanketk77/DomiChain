// src/components/Navbar.jsx

import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [account, setAccount] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      setMenuOpen(false);
    } else {
      alert("Please install MetaMask!");
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
        if (accounts.length > 0) setAccount(accounts[0]);
      });
    }
  }, []);

  const isActive = (path) =>
    location.pathname === path
      ? "bg-gold text-white shadow"
      : "text-gold hover:text-white hover:bg-gold-light";

  return (
    <nav className="w-full sticky top-0 z-50 bg-charcoal border-b border-gold px-6 py-4 flex justify-between items-center flex-wrap">
      {/* Brand */}
      <Link
        to="/"
        className="text-2xl font-extrabold text-gold tracking-tight"
        onClick={() => setMenuOpen(false)}
      >
        🏠 DomiChain
      </Link>

      {/* Hamburger Icon */}
      <button
        className="md:hidden text-gold"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Navigation Links */}
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } md:flex md:items-center md:space-x-4 w-full md:w-auto mt-4 md:mt-0`}
      >
        {["/buy", "/rent", "/sell", "/plots"].map((route) => (
          <Link
            key={route}
            to={route}
            onClick={() => setMenuOpen(false)}
            className={`block md:inline-block text-sm font-medium tracking-wide px-4 py-2 rounded-lg transition duration-200 ${isActive(
              route
            )}`}
          >
            {route.replace("/", "").toUpperCase()}
          </Link>
        ))}

        {/* Wallet Section */}
        {account ? (
          <div className="mt-3 md:mt-0 bg-gold-light text-charcoal px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-2 shadow">
            <span className="text-xs font-medium">Connected Wallet:</span>
            <span className="font-bold">
              {account.slice(0, 6)}...{account.slice(-4)}
            </span>
            <button
              onClick={connectWallet}
              className="ml-2 text-xs px-2 py-1 border border-charcoal rounded hover:bg-charcoal hover:text-white transition"
            >
              Change
            </button>
          </div>
        ) : (
          <button
            onClick={connectWallet}
            className="mt-3 md:mt-0 px-5 py-2 bg-gold hover:bg-gold-dark text-white font-semibold rounded-lg transition"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
}
