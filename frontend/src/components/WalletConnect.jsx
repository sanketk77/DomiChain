function WalletConnect({ account }) {
  return (
    <div className="bg-white shadow p-4 rounded mb-6">
      <p className="text-gray-700">
        Connected Wallet: <span className="font-semibold">{account || "Not connected"}</span>
      </p>
    </div>
  );
}

export default WalletConnect;
