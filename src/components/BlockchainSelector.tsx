import React, { useState } from 'react';
import { ChevronRight, Check } from 'lucide-react';
import { AVAILABLE_BLOCKCHAINS } from '../utils/constants';

interface BlockchainSelectorProps {
  onContinue: (selected: string[]) => void;
}

export const BlockchainSelector: React.FC<BlockchainSelectorProps> = ({ onContinue }) => {
  const [selectedChains, setSelectedChains] = useState<string[]>([]);

  const toggleChain = (chainId: string, enabled: boolean) => {
    if (!enabled) return;
    
    if (selectedChains.includes(chainId)) {
      setSelectedChains(prev => prev.filter(id => id !== chainId));
    } else if (selectedChains.length < 3) {
      setSelectedChains(prev => [...prev, chainId]);
    }
  };

  const handleContinue = () => {
    onContinue(selectedChains);
  };

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-md mx-auto pt-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Select Blockchains</h1>
          <p className="text-gray-300">Choose up to 3 blockchains to scan</p>
          <div className="text-sm text-purple-400 mt-2">
            {selectedChains.length}/3 selected
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
          <div className="space-y-3">
            {AVAILABLE_BLOCKCHAINS.map((chain) => (
              <div
                key={chain.id}
                onClick={() => toggleChain(chain.id, chain.enabled)}
                className={`flex items-center justify-between p-4 rounded-xl transition-all cursor-pointer ${
                  !chain.enabled
                    ? 'bg-gray-800/50 opacity-50 cursor-not-allowed'
                    : selectedChains.includes(chain.id)
                    ? 'bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/50'
                    : 'bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/20'
                }`}
              >
                <div className="flex items-center">
                  {chain.image ? (
                    <img 
                      src={chain.image}
                      alt={chain.name}
                      className="w-10 h-10 rounded-full mr-3"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.src = '';
                        img.alt = chain.icon;
                        img.className = 'w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold mr-3';
                      }}
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                      {chain.icon}
                    </div>
                  )}
                  <div>
                    <div className="text-white font-semibold">{chain.name}</div>
                    <div className="text-gray-400 text-sm">{chain.symbol}</div>
                  </div>
                </div>
                
                {chain.enabled && (
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedChains.includes(chain.id)
                      ? 'bg-purple-500 border-purple-500'
                      : 'border-gray-400'
                  }`}>
                    {selectedChains.includes(chain.id) && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={handleContinue}
            disabled={selectedChains.length === 0}
            className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
          >
            Continue
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlockchainSelector;