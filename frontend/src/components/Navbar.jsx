import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [account, setAccount] = useState("");

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
    const checkConnection = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) setAccount(accounts[0]);
      }
    };
    checkConnection();
  }, []);

  return (
    <nav className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-50">
      <h1 className="text-2xl font-bold text-blue-700">🏠 DomiChain</h1>

      <ul className="flex space-x-6 text-gray-700 font-medium">
        <li className="hover:text-blue-600 cursor-pointer">Buy</li>
        <li className="hover:text-blue-600 cursor-pointer">Rent</li>
        <li className="hover:text-blue-600 cursor-pointer">Sell</li>
      </ul>

      {account ? (
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded font-semibold">
          Connected: {account.slice(0, 6)}...{account.slice(-4)}
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Connect Wallet
        </button>
      )}
    </nav>
  );
};

export default Navbar;
