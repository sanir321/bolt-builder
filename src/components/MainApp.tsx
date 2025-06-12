import React, { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { BottomNavigation } from './BottomNavigation';
import { SearchTab } from './SearchTab';
import { StatsTab } from './StatsTab';
import { WithdrawTab } from './WithdrawTab';
import { MessagesTab } from './MessagesTab';
import { SettingsTab } from './SettingsTab';
import { AppState } from '../types';

interface MainAppProps {
  state: AppState;
  onUpdateState: (updates: Partial<AppState>) => void;
  onStartSearch: () => void;
  onPauseSearch: () => void;
  onSendMessage: (message: string) => void;
}

export const MainApp: React.FC<MainAppProps> = ({
  state,
  onUpdateState,
  onStartSearch,
  onPauseSearch,
  onSendMessage
}) => {
  const handleTabChange = (tab: string) => {
    onUpdateState({ currentTab: tab as any });
  };

  // Apply theme on component mount and when theme changes
  useEffect(() => {
    const root = document.documentElement;

    if (state.theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else if (state.theme === 'dark') {
      root.classList.remove('light');
      root.classList.add('dark');
    } else {
      // System theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.remove('light', 'dark');
      root.classList.add(prefersDark ? 'dark' : 'light');

      // Listen for system theme changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        root.classList.remove('light', 'dark');
        root.classList.add(e.matches ? 'dark' : 'light');
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [state.theme]);

  const renderCurrentTab = () => {
    switch (state.currentTab) {
      case 'search':
        return <SearchTab state={state} onStartSearch={onStartSearch} onPauseSearch={onPauseSearch} />;
      case 'stats':
        return <StatsTab state={state} />;
      case 'withdraw':
        return <WithdrawTab state={state} />;
      case 'messages':
        return <MessagesTab state={state} onSendMessage={onSendMessage} />;
      case 'settings':
        return <SettingsTab state={state} onUpdateState={onUpdateState} />;
      default:
        return <SearchTab state={state} onStartSearch={onStartSearch} onPauseSearch={onPauseSearch} />;
    }
  };



  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {!state.isOnline && (
        <div className="bg-red-600 text-white p-2 flex items-center justify-center text-sm">
          <AlertCircle className="w-4 h-4 mr-2" />
          No Internet Connection
        </div>
      )}
      <div className="max-w-md mx-auto">
        <div className="min-h-screen">
          {renderCurrentTab()}
        </div>
        <BottomNavigation currentTab={state.currentTab} onTabChange={handleTabChange} />
      </div>
    </div>
  );
};