// src/components/WalletConnect.jsx

function WalletConnect({ account, onChangeWallet }) {
  return (
    <div className="bg-charcoal text-gold-light border border-gold rounded-xl shadow p-4 mb-6 flex items-center justify-between">
      {account ? (
        <>
          <p className="text-sm font-medium">
            Connected Wallet:{" "}
            <span className="text-white font-bold">
              {account.slice(0, 6)}...{account.slice(-4)}
            </span>
          </p>

          <button
            onClick={onChangeWallet}
            className="text-xs px-3 py-1 border border-gold-light text-white rounded hover:bg-gold hover:text-black transition"
          >
            Change
          </button>
        </>
      ) : (
        <p className="text-sm text-gray-300">Wallet not connected</p>
      )}
    </div>
  );
}

export default WalletConnect;
