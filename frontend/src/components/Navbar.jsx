// src/components/Navbar.jsx

import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [account, setAccount] = useState("");
  const location = useLocation();

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    } else {
      alert("Please install MetaMask!");
    }
  };

  useEffect(() => {
    const checkWallet = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) setAccount(accounts[0]);
      }
    };
    checkWallet();
  }, []);

  const isActive = (path) =>
    location.pathname === path ? "text-indigo-600 font-semibold" : "text-gray-700";

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md px-6 py-4 w-full flex justify-between items-center">

      <Link to="/" className="text-2xl font-bold text-indigo-700 tracking-tight">
        🏠 DomiChain
      </Link>

      <div className="flex space-x-6 items-center">
        <Link to="/" className={`${isActive("/")} hover:text-indigo-600 transition`}>
          Home
        </Link>
        <Link to="/add-property" className={`${isActive("/add-property")} hover:text-indigo-600 transition`}>
          Add Property
        </Link>

        {account ? (
          <span className="bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-medium">
            {account.slice(0, 6)}...{account.slice(-4)}
          </span>
        ) : (
          <button
            onClick={connectWallet}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm font-medium"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
}
