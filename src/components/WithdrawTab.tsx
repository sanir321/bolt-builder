import React, { useState } from 'react';
import { DollarSign, CheckCircle, ArrowRight } from 'lucide-react';
import { AppState, WithdrawData } from '../types';

interface WithdrawTabProps {
  state: AppState;
}

export const WithdrawTab: React.FC<WithdrawTabProps> = ({ state }) => {
  const [withdrawData, setWithdrawData] = useState<{ [key: string]: WithdrawData }>({});
  const [showSuccess, setShowSuccess] = useState<string | null>(null);

  if (state.foundWallets.length === 0) {
    return (
      <div className="p-6 text-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
          <DollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Funds Available</h3>
          <p className="text-gray-400">Start scanning to find wallets first</p>
          {state.selectedBlockchains.length > 0 && (
            <div className="mt-4">
              <p className="text-purple-400 text-sm">Scanning for:</p>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {state.selectedBlockchains.map(chain => (
                  <span key={chain} className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded text-xs">
                    {chain.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Group wallets by crypto type based on selected blockchains
  const cryptoBalances = state.foundWallets.reduce((acc, wallet) => {
    if (!acc[wallet.symbol]) {
      acc[wallet.symbol] = { amount: 0, usdValue: 0 };
    }
    acc[wallet.symbol].amount += wallet.amount;
    acc[wallet.symbol].usdValue += wallet.usdValue;
    return acc;
  }, {} as { [key: string]: { amount: number; usdValue: number } });

  const handleWithdraw = (crypto: string) => {
    const data = withdrawData[crypto];
    if (data && data.address && parseFloat(data.amount) > 0) {
      setShowSuccess(crypto);
      setTimeout(() => setShowSuccess(null), 3000);
      
      // Clear form
      setWithdrawData(prev => ({
        ...prev,
        [crypto]: { crypto, address: '', amount: '' }
      }));
    }
  };

  const updateWithdrawData = (crypto: string, field: keyof WithdrawData, value: string) => {
    setWithdrawData(prev => ({
      ...prev,
      [crypto]: { ...prev[crypto], [field]: value, crypto }
    }));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Withdraw Funds</h2>
        <p className="text-gray-400">Transfer your found cryptocurrency</p>
        {state.selectedBlockchains.length > 0 && (
          <div className="mt-2">
            <p className="text-purple-400 text-sm">From selected chains:</p>
            <div className="flex flex-wrap justify-center gap-2 mt-1">
              {state.selectedBlockchains.map(chain => (
                <span key={chain} className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded text-xs">
                  {chain.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {Object.entries(cryptoBalances).map(([crypto, balance]) => (
        <div key={crypto} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-white">{crypto}</h3>
              <p className="text-gray-400">Available: {balance.amount.toFixed(6)} {crypto}</p>
              <p className="text-green-400 font-semibold">${balance.usdValue.toFixed(2)}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
              {crypto[0]}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Receiving {crypto} Address
              </label>
              <input
                type="text"
                value={withdrawData[crypto]?.address || ''}
                onChange={(e) => updateWithdrawData(crypto, 'address', e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder={`Enter ${crypto} wallet address`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Amount to Withdraw
              </label>
              <input
                type="number"
                step="0.000001"
                max={balance.amount}
                value={withdrawData[crypto]?.amount || ''}
                onChange={(e) => updateWithdrawData(crypto, 'amount', e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder="0.000000"
              />
            </div>

            <button
              onClick={() => handleWithdraw(crypto)}
              disabled={
                !withdrawData[crypto]?.address || 
                !withdrawData[crypto]?.amount || 
                parseFloat(withdrawData[crypto]?.amount || '0') <= 0
              }
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
            >
              Withdraw {crypto}
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>

          {/* Success Message */}
          {showSuccess === crypto && (
            <div className="mt-4 bg-green-600/20 border border-green-500/30 rounded-xl p-4 flex items-center">
              <CheckCircle className="w-6 h-6 text-green-400 mr-3" />
              <div>
                <p className="text-green-400 font-semibold">Withdraw Successful!</p>
                <p className="text-gray-300 text-sm">Your {crypto} has been sent to the specified address</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};