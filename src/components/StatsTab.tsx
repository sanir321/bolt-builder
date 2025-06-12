import React, { useState } from 'react';
import { TrendingUp, Calendar, DollarSign } from 'lucide-react';
import { AppState } from '../types';
import { FAKE_STATS_DATA } from '../utils/constants';

interface StatsTabProps {
  state: AppState;
}

export const StatsTab: React.FC<StatsTabProps> = ({ state }) => {
  const [activeTab, setActiveTab] = useState<'today' | 'week' | 'month' | 'all'>('today');

  const todayTotal = state.foundWallets.length > 0 ? state.totalFound : 0;
  const weekTotal = state.foundWallets.length > 0 ? FAKE_STATS_DATA.lastWeek.reduce((a, b) => a + b, 0) : 0;
  const monthTotal = state.foundWallets.length > 0 ? FAKE_STATS_DATA.lastMonth.reduce((a, b) => a + b, 0) : 0;
  const allTimeTotal = state.foundWallets.length > 0 ? FAKE_STATS_DATA.allTime.reduce((a, b) => a + b, 0) : 0;

  const getChartData = () => {
    switch (activeTab) {
      case 'today':
        return [todayTotal];
      case 'week':
        return FAKE_STATS_DATA.lastWeek;
      case 'month':
        return FAKE_STATS_DATA.lastMonth.slice(-7);
      case 'all':
        return FAKE_STATS_DATA.allTime.slice(-7);
      default:
        return [0];
    }
  };

  const getTotal = () => {
    switch (activeTab) {
      case 'today':
        return todayTotal;
      case 'week':
        return weekTotal;
      case 'month':
        return monthTotal;
      case 'all':
        return allTimeTotal;
      default:
        return 0;
    }
  };

  const chartData = getChartData();
  const maxValue = Math.max(...chartData);

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Statistics</h2>
        <p className="text-gray-400">Your wallet discovery performance</p>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-400 text-sm font-semibold">Total Found</p>
            <p className="text-3xl font-bold text-white">${getTotal().toFixed(2)}</p>
            <p className="text-gray-300 text-sm">{activeTab === 'today' ? 'Today' : `Last ${activeTab}`}</p>
          </div>
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <DollarSign className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      {/* Time Period Tabs */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-2 border border-white/20">
        <div className="grid grid-cols-4 gap-1">
          {[
            { key: 'today', label: 'Today' },
            { key: 'week', label: 'Week' },
            { key: 'month', label: 'Month' },
            { key: 'all', label: 'All Time' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <div className="flex items-center mb-4">
          <TrendingUp className="w-5 h-5 text-purple-400 mr-2" />
          <h3 className="text-white font-semibold">Performance Chart</h3>
        </div>
        
        <div className="flex items-end space-x-2 h-32">
          {chartData.map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="bg-gradient-to-t from-purple-600 to-pink-500 rounded-t w-full transition-all duration-300 hover:from-purple-500 hover:to-pink-400"
                style={{
                  height: `${maxValue > 0 ? (value / maxValue) * 100 : 0}%`,
                  minHeight: value > 0 ? '4px' : '2px',
                }}
              />
              <span className="text-xs text-gray-400 mt-1">
                {activeTab === 'today' ? 'Now' : index + 1}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Finds */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <div className="flex items-center mb-4">
          <Calendar className="w-5 h-5 text-green-400 mr-2" />
          <h3 className="text-white font-semibold">Recent Finds</h3>
        </div>
        
        <div className="space-y-3 max-h-48 overflow-y-auto">
          {state.foundWallets.slice(-10).reverse().map((wallet) => (
            <div key={wallet.id} className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0">
              <div>
                <p className="text-white font-medium">
                  {wallet.amount.toFixed(6)} {wallet.symbol}
                </p>
                <p className="text-gray-400 text-sm">{wallet.words.join(' ')}</p>
              </div>
              <div className="text-right">
                <p className="text-green-400 font-semibold">${wallet.usdValue.toFixed(2)}</p>
                <p className="text-gray-400 text-xs">
                  {wallet.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          {state.foundWallets.length === 0 && (
            <p className="text-gray-500 text-sm italic text-center py-4">
              No wallet finds yet...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};