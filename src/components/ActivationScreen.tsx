import React, { useState } from 'react';
import { ExternalLink, AlertCircle } from 'lucide-react';
import { VALID_ACTIVATION_KEYS, TELEGRAM_LINK } from '../utils/constants';

interface ActivationScreenProps {
  onActivate: () => void;
}

export const ActivationScreen: React.FC<ActivationScreenProps> = ({ onActivate }) => {
  const [activationKey, setActivationKey] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (VALID_ACTIVATION_KEYS.includes(activationKey)) {
      setError('');
      onActivate();
    } else {
      setError('Invalid activation key');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img 
                src="/assets/logo.png" 
                alt="Crypto app Logo"
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
           <h1 className="text-2xl font-bold text-white mb-2 text-center">
  Crypto app <span className="text-xs font-normal align-bottom translate-y-1">v2.1</span>
</h1>


            <p className="text-gray-300">Enter your activation key to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Activation Key
              </label>
              <input
                type="text"
                value={activationKey}
                onChange={(e) => setActivationKey(e.target.value)}
                className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                  error ? 'border-red-500' : 'border-white/20'
                } ${isShaking ? 'animate-pulse' : ''}`}
                placeholder="Enter activation key"
                required
              />
              {error && (
                <div className="flex items-center mt-2 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {error}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Continue
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-gray-400 text-sm text-center mb-3">
              Don't have an activation key?
            </p>
            <a
              href={TELEGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span className="mr-2">Get it now</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
