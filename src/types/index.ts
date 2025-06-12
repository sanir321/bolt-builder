export interface Blockchain {
  id: string;
  name: string;
  symbol: string;
  enabled: boolean;
  icon: string;
}

export interface FoundWallet {
  id: string;
  crypto: string;
  symbol: string;
  amount: number;
  usdValue: number;
  timestamp: Date;
  words: string[];
}

export interface SearchEntry {
  id: string;
  phrase: string;
  hasBalance: boolean;
  balance?: string;
  timestamp: Date;
}

export interface WithdrawData {
  crypto: string;
  address: string;
  amount: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
}

export interface AppState {
  currentScreen: 'activation' | 'blockchains' | 'main';
  isActivated: boolean;
  selectedBlockchains: string[];
  foundWallets: FoundWallet[];
  searchEntries: SearchEntry[];
  isSearching: boolean;
  walletsChecked: number;
  totalFound: number;
  currentTab: 'search' | 'stats' | 'withdraw' | 'messages' | 'settings';
  theme: 'light' | 'dark' | 'system';
  messages: Message[];
  isOnline: boolean;
}