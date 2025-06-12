import { useState, useCallback, useEffect } from 'react';
import { AppState, FoundWallet, Message, SearchEntry } from '../types';
import { CRYPTO_RATES, WALLET_WORDS } from '../utils/constants';

const initialState: AppState = {
  currentScreen: 'activation',
  isActivated: false,
  selectedBlockchains: [],
  foundWallets: [],
  searchEntries: [],
  isSearching: false,
  walletsChecked: 0,
  isOnline: navigator.onLine,
  totalFound: 0,
  currentTab: 'search',
  theme: 'dark',
  messages: [
    {
      id: '1',
      text: 'Welcome! How can we help you today?',
      sender: 'support',
      timestamp: new Date(),
    },
  ],
};

export const useAppState = () => {
  const [state, setState] = useState<AppState>(initialState);
  const [searchStartTime, setSearchStartTime] = useState<number | null>(null);

  const updateState = useCallback((updates: Partial<AppState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  useEffect(() => {
    const handleOnline = () => setState(prev => ({ ...prev, isOnline: true }));
    const handleOffline = () => setState(prev => ({ ...prev, isOnline: false }));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const generateRandomPhrase = useCallback((): string => {
    // Generate realistic BIP39 phrases (12 words)
    const words = Array.from({ length: 12 }, () => 
      WALLET_WORDS[Math.floor(Math.random() * WALLET_WORDS.length)]
    );
    return words.join(' ');
  }, []);

  const showNotification = useCallback((title: string, body: string) => {
    // Check if notifications are supported
    if ('Notification' in window) {
      // Request permission if not already granted
      if (Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification(title, { body, icon: '/vite.svg' });
          }
        });
      } else if (Notification.permission === 'granted') {
        new Notification(title, { body, icon: '/vite.svg' });
      }
    }
    
    // Fallback: Browser alert for better visibility
    alert(`${title}\n${body}`);
  }, []);

  const generateRandomWallet = useCallback((): FoundWallet => {
    // Use selected blockchains or fallback to default cryptos
    const availableCryptos = state.selectedBlockchains.length > 0 
      ? state.selectedBlockchains.map(chain => {
          switch(chain) {
            case 'bitcoin': return 'BTC';
            case 'ethereum': return 'ETH';
            case 'binance': return 'BNB';
            case 'usdt': return 'USDT';
            case 'solana': return 'SOL';
            case 'litecoin': return 'LTC';
            default: return 'BTC';
          }
        })
      : ['BTC', 'ETH', 'USDT'];

    const crypto = availableCryptos[Math.floor(Math.random() * availableCryptos.length)];
    const amount = Math.random() * 0.049 + 0.001; // 0.001 to 0.05
    const usdValue = amount * CRYPTO_RATES[crypto as keyof typeof CRYPTO_RATES];
    
    const words = Array.from({ length: 12 }, () => 
      WALLET_WORDS[Math.floor(Math.random() * WALLET_WORDS.length)]
    );

    return {
      id: Date.now().toString(),
      crypto,
      symbol: crypto,
      amount,
      usdValue,
      timestamp: new Date(),
      words,
    };
  }, [state.selectedBlockchains]);

  const addSearchEntry = useCallback((hasBalance: boolean = false, wallet?: FoundWallet) => {
    const entry: SearchEntry = {
      id: Date.now().toString() + Math.random(),
      phrase: generateRandomPhrase(),
      hasBalance,
      balance: hasBalance && wallet ? `${wallet.amount.toFixed(3)} ${wallet.symbol}` : undefined,
      timestamp: new Date(),
    };

    setState(prev => ({
      ...prev,
      searchEntries: [...prev.searchEntries.slice(-50), entry], // Keep only last 50 entries for performance
    }));
  }, [generateRandomPhrase]);

  const startSearch = useCallback(() => {
    // Reset all stats
    const startTime = Date.now();
    setSearchStartTime(startTime);
    setState(prev => ({
      ...prev,
      isSearching: true,
      walletsChecked: 0,
      totalFound: 0,
      foundWallets: [],
      searchEntries: []
    }));

    // Simulate finding wallet within 1 hour
    const findDelay = Math.random() * 60 * 60 * 1000;
    
    setTimeout(() => {
      const newWallet = generateRandomWallet();
      setState(prev => ({
        ...prev,
        foundWallets: [...prev.foundWallets, newWallet],
        totalFound: prev.totalFound + newWallet.usdValue,
        searchEntries: [...prev.searchEntries, {
          id: 'entry-' + Date.now(),
          phrase: generateRandomPhrase(),
          hasBalance: true,
          balance: `${newWallet.amount.toFixed(3)} ${newWallet.symbol}`,
          timestamp: new Date()
        }]
      }));
      
      showNotification('Wallet Found!', `Found ${newWallet.amount.toFixed(6)} ${newWallet.symbol} worth $${newWallet.usdValue.toFixed(2)}`);
    }, findDelay);
  }, [generateRandomWallet, showNotification, generateRandomPhrase]);

  const pauseSearch = useCallback(() => {
    updateState({ isSearching: false });
    setSearchStartTime(null);
  }, [updateState]);

  const addFoundWallet = useCallback((wallet: FoundWallet) => {
    setState(prev => ({
      ...prev,
      foundWallets: [...prev.foundWallets, wallet],
      totalFound: prev.totalFound + wallet.usdValue,
    }));
    
    // Show notification when wallet is found
    showNotification(
      '🎉 Wallet Found!',
      `Found ${wallet.amount.toFixed(6)} ${wallet.symbol} worth $${wallet.usdValue.toFixed(2)}`
    );
    
    // Add search entry with balance
    addSearchEntry(true, wallet);
  }, [addSearchEntry, showNotification]);

  const incrementWalletsChecked = useCallback(() => {
    setState(prev => ({
      ...prev,
      walletsChecked: prev.walletsChecked + 1,
    }));
  }, []);

  const addMessage = useCallback((text: string, sender: 'user' | 'support' = 'user') => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
    };
    
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, message],
    }));

    // Auto-reply from support
    if (sender === 'user') {
      setTimeout(() => {
        const supportReply: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Thank you for your message. Our team will review your feedback and get back to you soon.',
          sender: 'support',
          timestamp: new Date(),
        };
        setState(prev => ({
          ...prev,
          messages: [...prev.messages, supportReply],
        }));
      }, 1500);
    }
  }, []);

  // High-speed search simulation effect
  useEffect(() => {
    if (!state.isSearching || !searchStartTime) return;

    const interval = setInterval(() => {
      incrementWalletsChecked();
      
      // 95% chance to show balance 0 entry (more realistic)
      if (Math.random() < 0.95) {
        addSearchEntry(false);
      }
      
      // Calculate time-based probability for finding wallets
      const elapsedMinutes = (Date.now() - searchStartTime) / (1000 * 60);
      
      // More realistic probability curve
      let findProbability = 0.0005; // Base chance
      
      if (elapsedMinutes > 2) {
        findProbability = 0.001; // Higher chance after 2 minutes
      }
      if (elapsedMinutes > 5) {
        findProbability = 0.002; // Even higher chance after 5 minutes
      }
      if (elapsedMinutes > 10) {
        findProbability = 0.005; // Significant chance after 10 minutes
      }
      if (elapsedMinutes > 20) {
        findProbability = 0.01; // Very likely after 20 minutes
      }
      
      // Check if wallet should be found
      if (Math.random() < findProbability) {
        const wallet = generateRandomWallet();
        addFoundWallet(wallet);
      }
    }, 200); // Adjusted to 200ms for more realistic pacing

    return () => clearInterval(interval);
  }, [state.isSearching, searchStartTime, incrementWalletsChecked, generateRandomWallet, addFoundWallet, addSearchEntry]);

  // Request notification permission on app start
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const toggleTheme = useCallback(() => {
    updateState({
      theme: state.theme === 'dark' ? 'light' : 'dark'
    });
  }, [state.theme, updateState]);

  return {
    state,
    updateState,
    startSearch: () => startSearch(),
    pauseSearch,
    addMessage,
    toggleTheme,
  };
};