import React from 'react';
import { Monitor, Moon, Sun, Volume2, Vibrate, Zap, Info, Bell } from 'lucide-react';
import { AppState } from '../types';

interface SettingsTabProps {
  state: AppState;
  onUpdateState: (updates: Partial<AppState>) => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({ state, onUpdateState }) => {
  const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
    const newTheme = theme === 'system' 
      ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      : theme;
    
    onUpdateState({ theme: newTheme });
    
    // Apply theme immediately
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(newTheme);
    
    // For system theme, listen for changes
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = (e: MediaQueryListEvent) => {
        const systemTheme = e.matches ? 'dark' : 'light';
        onUpdateState({ theme: systemTheme });
        root.classList.remove('light', 'dark');
        root.classList.add(systemTheme);
      };
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  };

  const requestNotificationPermission = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('Notifications Enabled!', {
            body: 'You will now receive alerts when wallets are found.',
            icon: '/vite.svg'
          });
        }
      });
    }
  };

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Settings</h2>
        <p className="text-gray-400">Customize your experience</p>
      </div>

      {/* Theme Selection */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h3 className="text-white font-semibold mb-4 flex items-center">
          <Monitor className="w-5 h-5 mr-2" />
          Theme Options
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {themeOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <button
                key={option.value}
                onClick={() => handleThemeChange(option.value as any)}
                className={`p-4 rounded-xl border transition-all ${
                  state.theme === option.value
                    ? 'bg-gradient-to-r from-purple-600/30 to-pink-600/30 border-purple-500/50 text-white'
                    : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:border-white/30'
                }`}
              >
                <IconComponent className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm font-medium">{option.label}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h3 className="text-white font-semibold mb-4 flex items-center">
          <Bell className="w-5 h-5 mr-2" />
          Notifications
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Wallet Found Alerts</p>
              <p className="text-gray-400 text-sm">Get notified when wallets are discovered</p>
            </div>
            <button
              onClick={requestNotificationPermission}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              Enable
            </button>
          </div>
        </div>
      </div>

      {/* Additional Settings */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h3 className="text-white font-semibold mb-4">Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Volume2 className="w-5 h-5 text-purple-400 mr-3" />
              <div>
                <p className="text-white font-medium">Sound Effects</p>
                <p className="text-gray-400 text-sm">Enable audio feedback</p>
              </div>
            </div>
            <div className="w-12 h-6 bg-purple-600 rounded-full relative cursor-pointer">
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Vibrate className="w-5 h-5 text-pink-400 mr-3" />
              <div>
                <p className="text-white font-medium">Vibration</p>
                <p className="text-gray-400 text-sm">Haptic feedback</p>
              </div>
            </div>
            <div className="w-12 h-6 bg-pink-600 rounded-full relative cursor-pointer">
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Zap className="w-5 h-5 text-yellow-400 mr-3" />
              <div>
                <p className="text-white font-medium">Animations</p>
                <p className="text-gray-400 text-sm">UI transitions and effects</p>
              </div>
            </div>
            <div className="w-12 h-6 bg-yellow-600 rounded-full relative cursor-pointer">
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
            </div>
          </div>
        </div>
      </div>

      {/* App Info */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <div className="flex items-center mb-4">
          <Info className="w-5 h-5 text-blue-400 mr-2" />
          <h3 className="text-white font-semibold">App Information</h3>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Version</span>
            <span className="text-white font-mono">1.0.0</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Build</span>
            <span className="text-white font-mono">2024.1.1</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Status</span>
            <span className="text-green-400 font-semibold">Active</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Selected Chains</span>
            <span className="text-purple-400 font-semibold">
              {state.selectedBlockchains.length > 0 ? state.selectedBlockchains.length : 'None'}
            </span>
          </div>
        </div>
      </div>

      {/* Developer Info */}
      <div className="text-center pt-4">
        <p className="text-gray-500 text-sm">
          Wallet Scanner Pro
        </p>
        <p className="text-gray-600 text-xs mt-1">
          Professional Cryptocurrency Tool
        </p>
      </div>
    </div>
  );
};