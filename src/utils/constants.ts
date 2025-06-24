export const VALID_ACTIVATION_KEYS = ['735853', '638239', '979070'];

// Remove duplicate declaration since TELEGRAM_LINK is already defined at the bottom of the file

export const AVAILABLE_BLOCKCHAINS = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    ticker: 'BTC',
    enabled: true,
    icon: '₿',
    image: '/assets/crypto/bitcoin.png'
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    ticker: 'ETH',
    enabled: true,
    icon: 'Ξ',
    image: '/assets/crypto/ethereum.png'
  },
  { id: 'binance', name: 'Binance Coin', symbol: 'BNB', enabled: true, icon: 'B', image: '/assets/crypto/binance.png' },
  { id: 'usdt', name: 'USDT', symbol: 'USDT', enabled: true, icon: '₮', image: '/assets/crypto/usdt.png' },
  { id: 'solana', name: 'Solana', symbol: 'SOL', enabled: true, icon: 'S', image: '/assets/crypto/solana.png' },
  { id: 'litecoin', name: 'Litecoin', symbol: 'LTC', enabled: true, icon: 'Ł', image: '/assets/crypto/litecoin.png' },
  { id: 'toncoin', name: 'Toncoin', symbol: 'TON', enabled: false, icon: 'T', image: '/assets/crypto/toncoin.png' },
  { id: 'polygon', name: 'Polygon', symbol: 'MATIC', enabled: false, icon: 'P', image: '/assets/crypto/polygon.png' },
  { id: 'avalanche', name: 'Avalanche', symbol: 'AVAX', enabled: false, icon: 'A', image: '/assets/crypto/avalanche.png' },
];

export const CRYPTO_RATES = {
  BTC: 60000,
  ETH: 3000,
  USDT: 1,
  BNB: 300,
  SOL: 100,
  LTC: 90,
};

export const WALLET_WORDS = [
  'scarecrow', 'fruit', 'flow', 'prune', 'cultivat', 'root', 'bud', 'farm', 'plant',
  'irrigation', 'field', 'scare', 'sun', 'roots', 'leaf', 'tractor', 'garden',
  'blossom', 'green', 'pesticide', 'stem', 'earth', 'harvest', 'pollinate', 'shade',
  'permaculture', 'moon', 'star', 'sky', 'ocean', 'mountain', 'forest', 'river',
  'lion', 'tiger', 'eagle', 'wolf', 'bear', 'shark', 'dolphin', 'spider',
  'fire', 'water', 'wind', 'thunder', 'lightning', 'storm', 'snow', 'rain',
  'gold', 'silver', 'copper', 'iron', 'steel', 'diamond', 'crystal', 'pearl',
  'ancient', 'mystic', 'cosmic', 'stellar', 'lunar', 'solar', 'quantum', 'digital',
  'crypto', 'blockchain', 'network', 'protocol', 'algorithm', 'cipher', 'token', 'wallet'
];

export const FAKE_STATS_DATA = {
  lastWeek: [120, 340, 890, 450, 670, 320, 540],
  lastMonth: Array.from({ length: 30 }, () => Math.floor(Math.random() * 1000) + 100),
  allTime: Array.from({ length: 90 }, () => Math.floor(Math.random() * 2000) + 200),
};
export const TELEGRAM_LINK = 'https://t.me/adrean0sx';
