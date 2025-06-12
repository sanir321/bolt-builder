import React from 'react';
import { Search, BarChart3, DollarSign, MessageSquare, Settings } from 'lucide-react';

interface BottomNavigationProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ currentTab, onTabChange }) => {
  const tabs = [
    { id: 'search', label: 'Search', icon: Search },
    { id: 'stats', label: 'Stats', icon: BarChart3 },
    { id: 'withdraw', label: 'Withdraw', icon: DollarSign },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg border-t border-white/20 px-4 py-2">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = currentTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all ${
                isActive
                  ? 'text-white bg-gradient-to-r from-purple-600/30 to-pink-600/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <IconComponent className={`w-5 h-5 mb-1 ${isActive ? 'text-white' : ''}`} />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};