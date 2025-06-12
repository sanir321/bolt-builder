import React, { useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { AppState } from '../types';

interface SearchTabProps {
  state: AppState;
  onStartSearch: () => void;
  onPauseSearch: () => void;
}

export const SearchTab: React.FC<SearchTabProps> = ({ state, onStartSearch, onPauseSearch }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastFoundWallet = state.foundWallets[state.foundWallets.length - 1];

  useEffect(() => {
    if (scrollRef.current && state.isSearching) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [state.walletsChecked, state.isSearching]);

  return (
    <div className="p-6 pt-4 pb-20 h-screen flex flex-col">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-white mb-2">Wallet Search</h2>
        <p className="text-gray-400">Real-time blockchain wallet discovery</p>
      </div>

      {/* Last Found Wallet */}
      {lastFoundWallet && (
        <div className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-lg rounded-xl p-4 border border-purple-500/50 mb-4">
          <p className="text-purple-400 text-sm font-semibold mb-2">Last founded</p>
          <div className="bg-black/30 rounded-lg p-3 flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
              {lastFoundWallet.symbol[0]}
            </div>
            <div>
              <p className="text-white font-bold">
                {lastFoundWallet.amount.toFixed(3)} {lastFoundWallet.symbol}
              </p>
              <p className="text-green-400 font-semibold">${lastFoundWallet.usdValue.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}

      {/* Scrollable Wallet Checks */}
      <div className="flex-1 overflow-y-auto mb-4">
        <div
          ref={scrollRef}
          className="bg-black/40 backdrop-blur-lg rounded-xl border border-white/20 p-4 space-y-1 h-[45vh] overflow-y-auto"
          style={{ scrollBehavior: state.isSearching ? 'auto' : 'smooth' }}
        >
          {state.searchEntries.map((entry) => (
            <div
              key={entry.id}
              className={`text-sm font-mono transition-all duration-200 ${
                entry.hasBalance
                  ? 'text-green-400 bg-green-400/10 px-2 py-1 rounded'
                  : 'text-gray-400'
              }`}
            >
              <span className="text-gray-500">Balance: </span>
              <span className={entry.hasBalance ? 'text-green-400' : 'text-white'}>
                {entry.hasBalance ? entry.balance : '0'}
              </span>
              <span className="text-gray-500"> | Wallet check: </span>
              <span className="text-gray-300">{entry.phrase}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-black/40 backdrop-blur-lg rounded-xl p-4 border border-white/20">
          <p className="text-gray-400 text-sm">Wallets checked:</p>
          <p className="text-2xl font-bold text-white">{state.walletsChecked.toLocaleString()}</p>
        </div>

        <div className="bg-black/40 backdrop-blur-lg rounded-xl p-4 border border-white/20">
          <p className="text-gray-400 text-sm">Found:</p>
          <p className="text-2xl font-bold text-green-400">${state.totalFound.toFixed(2)}</p>
        </div>
      </div>

      {/* START/PAUSE BUTTON */}
      <div className="text-center mb-4">
        <button
          onClick={state.isSearching ? onPauseSearch : onStartSearch}
          className={`w-full py-4 px-6 rounded-xl font-semibold text-black transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center ${
            state.isSearching
              ? 'bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600'
              : 'bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500'
          }`}
        >
          {state.isSearching ? (
            <>
              <Pause className="w-6 h-6 mr-2" />
              PAUSE
            </>
          ) : (
            <>
              <Play className="w-6 h-6 mr-2" />
              START
            </>
          )}
        </button>
      </div>
    </div>
  );
};
