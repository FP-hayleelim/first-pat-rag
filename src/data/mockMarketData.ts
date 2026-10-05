import { SymbolInfo, CommunityIdea, Broker, Candle } from '../types/market';

export const INITIAL_SYMBOLS: Record<string, SymbolInfo> = {
  BTCUSD: {
    ticker: 'BTCUSD',
    name: 'Bitcoin / US Dollar',
    exchange: 'BITSTAMP',
    category: 'crypto',
    price: 85420.50,
    change: 1842.10,
    changePercent: 2.20,
    high24h: 86120.00,
    low24h: 83500.00,
    volume24h: '34.2K BTC',
    decimals: 2,
    currency: 'USD',
    sparkline: [82100, 82400, 83200, 82900, 84100, 83800, 84900, 85420.50],
  },
  ETHUSD: {
    ticker: 'ETHUSD',
    name: 'Ethereum / US Dollar',
    exchange: 'COINBASE',
    category: 'crypto',
    price: 3120.50,
    change: 44.60,
    changePercent: 1.45,
    high24h: 3180.00,
    low24h: 3040.20,
    volume24h: '182.4K ETH',
    decimals: 2,
    currency: 'USD',
    sparkline: [3010, 3040, 3020, 3080, 3110, 3090, 3140, 3120.50],
  },
  SPX: {
    ticker: 'SPX',
    name: 'S&P 500 Index',
    exchange: 'INDEX',
    category: 'indices',
    price: 5983.25,
    change: 25.12,
    changePercent: 0.42,
    high24h: 5998.40,
    low24h: 5942.10,
    volume24h: '2.4B USD',
    decimals: 2,
    currency: 'USD',
    sparkline: [5840, 5860, 5890, 5910, 5900, 5950, 5970, 5983.25],
  },
  NDX: {
    ticker: 'NDX',
    name: 'Nasdaq 100 Index',
    exchange: 'NASDAQ',
    category: 'indices',
    price: 20892.10,
    change: 176.30,
    changePercent: 0.85,
    high24h: 20950.00,
    low24h: 20680.50,
    volume24h: '4.8B USD',
    decimals: 2,
    currency: 'USD',
    sparkline: [20400, 20480, 20550, 20620, 20710, 20830, 20892.10],
  },
  XAUUSD: {
    ticker: 'XAUUSD',
    name: 'Gold Spot / US Dollar',
    exchange: 'OANDA',
    category: 'commodities',
    price: 4142.10,
    change: -13.20,
    changePercent: -0.32,
    high24h: 4175.00,
    low24h: 4120.50,
    volume24h: '89.5K oz',
    decimals: 2,
    currency: 'USD',
    sparkline: [4190, 4180, 4165, 4170, 4150, 4135, 4142.10],
  },
  US10Y: {
    ticker: 'US10Y',
    name: 'US 10 Year Treasury Yield',
    exchange: 'CBOT',
    category: 'bonds',
    price: 4.18,
    change: 0.03,
    changePercent: 0.72,
    high24h: 4.22,
    low24h: 4.12,
    volume24h: '1.2M Contracts',
    decimals: 2,
    currency: '%',
    sparkline: [4.11, 4.13, 4.15, 4.14, 4.17, 4.18],
  },
  EURUSD: {
    ticker: 'EURUSD',
    name: 'Euro / US Dollar',
    exchange: 'FX_IDC',
    category: 'forex',
    price: 1.0842,
    change: -0.0013,
    changePercent: -0.15,
    high24h: 1.0880,
    low24h: 1.0825,
    volume24h: '124B EUR',
    decimals: 4,
    currency: 'USD',
    sparkline: [1.089, 1.087, 1.086, 1.0875, 1.085, 1.0842],
  },
  NVDA: {
    ticker: 'NVDA',
    name: 'NVIDIA Corporation',
    exchange: 'NASDAQ',
    category: 'stocks',
    price: 142.80,
    change: 4.40,
    changePercent: 3.18,
    high24h: 144.50,
    low24h: 138.20,
    volume24h: '78.4M',
    decimals: 2,
    currency: 'USD',
    sparkline: [136, 137.5, 139, 138, 141, 142.80],
  },
  TSLA: {
    ticker: 'TSLA',
    name: 'Tesla, Inc.',
    exchange: 'NASDAQ',
    category: 'stocks',
    price: 221.40,
    change: -3.19,
    changePercent: -1.42,
    high24h: 226.50,
    low24h: 219.80,
    volume24h: '54.2M',
    decimals: 2,
    currency: 'USD',
    sparkline: [228, 226, 224, 225, 220, 221.40],
  },
  AMD: {
    ticker: 'AMD',
    name: 'Advanced Micro Devices',
    exchange: 'NASDAQ',
    category: 'stocks',
    price: 164.25,
    change: 7.15,
    changePercent: 4.55,
    high24h: 166.00,
    low24h: 157.80,
    volume24h: '49.1M',
    decimals: 2,
    currency: 'USD',
    sparkline: [154, 156, 159, 158, 162, 164.25],
  }
};

export const COMMUNITY_IDEAS: CommunityIdea[] = [
  {
    id: 'idea-1',
    title: 'Bitcoin: Wave 2 Could Target $75,000',
    description: 'Bitcoin appears to have completed a five-wave advance in wave 1. The current pullback is developing as wave 2 downward double zigzag.',
    author: 'Roman_Pavelko',
    authorAvatar: '',
    authorInitials: 'RP',
    symbol: 'CRYPTO:BTCUSD',
    type: 'Short',
    likes: 1420,
    comments: 84,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBywpaF4emVcxL8YkEEqYlrU7C-tRNsj7u16ChqclOckERTYTEd8Zz4g_WvscbjTfnXg3qHoPNqdd-Yntzh0R5zixurrED2XWWW2I1Ab31xdmcCmWymRsVlPX1SK4jnoSBMASFKVC4lOHtHpcjJpDNXTO4IkUl8sDFgSS9U8K_qQThFHOs-G0rs5nCoqyveMpaQLQ1cUH81oMp94G0OTdd-rShCqQBJe9PQsOZHDp0f31zgmxvJqMrZQg',
    alt: 'Elliott wave technical cryptocurrency analysis chart preview showing Bitcoin BTCUSD wave 2 corrective downward zigzag projections',
    tags: ['ElliottWave', 'Bitcoin', 'Crypto'],
    timeAgo: '2h ago'
  },
  {
    id: 'idea-2',
    title: 'AAPL | Flexible Time Frames, Clearer Entries',
    description: 'Focused on being flexible when your edge doesn\'t appear on higher timeframes. Using multiple charts together before deciding on entry.',
    author: 'davekclinton',
    authorAvatar: '',
    authorInitials: 'DC',
    symbol: 'NASDAQ:AAPL',
    type: 'Long',
    likes: 920,
    comments: 31,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBne7GU6YFNT79ZCST8JP5UAwxcxZl-BK27AQV17SdW-3YdTXxDFVbt2-EqtqDKyTn9y2o89plr2Dwh8wErzPrIKLdvTVnjffE2btH5zc2iUfm4bgUa3K__yrYdIxkEiIduOUPMAnCJEGQuW9N4LZwW8RB0uJ0gsEHt5U0pAkhM_W8AdxDw7-9Q0obdA7uVhNwjttoLzt2C3X0DYUncOADUvZgqsVU9eLsqL_QQl9jMWnCaNJvY1RfUw',
    alt: 'Multi-timeframe technical stock chart preview of Apple AAPL showing clean demand breakout zones and moving average crosses',
    tags: ['Breakout', 'Equities', 'Tech'],
    timeAgo: '4h ago'
  },
  {
    id: 'idea-3',
    title: 'Gold Trapped in Key Fibonacci Zone',
    description: 'Gold experiencing a strong corrective wave after hitting macro highs. Currently showing subtle stabilization inside institutional demand.',
    author: 'marisakel',
    authorAvatar: '',
    authorInitials: 'MK',
    symbol: 'OANDA:XAUUSD',
    type: 'Long',
    likes: 1100,
    comments: 56,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBT4dJUTNfhfSepg0wDoJbfrF4KRhxRKJdFHiuhFTtx7YW7YIENl2e_bIjp-XlJyc1oFUEJhsr2NusjbxT5ol1q_TLA2rjdNYREg9kGhgLOK8_6XHhO3RrLoJcLeche_-AIPHgr6_l8i-8xtAkStfH543wFvTjhWrL248WvEDXlwkPifMuPSD0cKtqD65RBUcCEN8TUIsCDJmNdAS7WEPoHq5QMRzdb2lJ4eoFmh9ySlBxNzIO7fkaI0w',
    alt: 'Gold commodity XAUUSD technical analysis chart preview displaying golden Fibonacci retracement bands and liquidity sweep clusters',
    tags: ['Commodities', 'Fibonacci', 'Gold'],
    timeAgo: '6h ago'
  },
  {
    id: 'idea-4',
    title: 'AMD | The FVG Is The Entry, Not The Chase',
    description: 'Broke structure upward in an ascending channel, now resting directly into the primary 4H Fair Value Gap liquidity support.',
    author: 'BigBeluga',
    authorAvatar: '',
    authorInitials: 'BB',
    symbol: 'NASDAQ:AMD',
    type: 'Long',
    likes: 784,
    comments: 43,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqmxaLvkCFbFWrTLYZry6ZsHJi_MvvFOlqLrz5P9uzqDLeMDruroZvVmemRyE3LP_upLgOTjs3gm29eloLy-4d4iN-824AdPMH3GdBHYrec6x9QNF0Nw44u814BNOGMeQ6ki2Wsg3EwLzrVkLfqRfqXRfCfbtxK3p_mA5oeU1TgRy-oeKaH-RhmK02AhMe5zrYkpuKcIBd2NMDHkrQnJHS3m_N87tF5Q7yS4ku5ltJyPKs7shuDv3W6w',
    alt: 'AMD stock chart technical setup preview highlighting Fair Value Gap FVG green shaded box on four-hour candlestick layout',
    tags: ['ICT', 'FVG', 'OrderBlocks'],
    timeAgo: '8h ago'
  }
];

export const BROKERS: Broker[] = [
  {
    id: 'ninjatrader',
    name: 'NinjaTrader',
    category: 'Futures',
    rating: 4.5,
    tag: 'Great',
    connected: false,
    minDeposit: '$400',
    features: ['Micro E-mini contracts', 'Automated strategy execution', 'Deep order book']
  },
  {
    id: 'oanda',
    name: 'OANDA',
    category: 'Forex / CFDs',
    rating: 4.5,
    tag: "Best '23",
    connected: false,
    minDeposit: '$0',
    features: ['Competitive FX spreads', 'Fast order routing', 'Global regulatory coverage']
  },
  {
    id: 'forexcom',
    name: 'FOREX.com',
    category: 'Currencies',
    rating: 4.5,
    tag: 'Great',
    connected: false,
    minDeposit: '$100',
    features: ['Over 80 currency pairs', 'Advanced order types', 'Direct API access']
  },
  {
    id: 'okx',
    name: 'OKX',
    category: 'Crypto Spot/Perps',
    rating: 4.4,
    tag: 'Very Good',
    connected: false,
    minDeposit: '$10',
    features: ['Tier-1 liquidity', 'Up to 100x leverage', 'Unified trading account']
  }
];

export const VOLUME_STOCKS = [
  { ticker: 'NVDA', name: 'NVIDIA Corporation', initials: 'NV', price: 142.80, change: 3.18, vol: '78.4M' },
  { ticker: 'TSLA', name: 'Tesla, Inc.', initials: 'TS', price: 221.40, change: -1.42, vol: '54.2M' },
  { ticker: 'AMD', name: 'Advanced Micro Devices', initials: 'AM', price: 164.25, change: 4.55, vol: '49.1M' },
  { ticker: 'SPCX', name: 'Space Exploration Tech', initials: 'SP', price: 158.96, change: 7.35, vol: '38.6M' },
  { ticker: 'MSTR', name: 'Strategy Inc', initials: 'MS', price: 248.50, change: 6.10, vol: '24.8M' }
];

export const TOP_CRYPTO_GAINERS = [
  { ticker: 'FETUSD', name: 'Artificial Superintelligence', initials: 'FE', price: 1.48, change: 16.38 },
  { ticker: 'AKTUSD', name: 'Akash Network', initials: 'AK', price: 3.84, change: 14.09 },
  { ticker: 'HNTUSD', name: 'Helium', initials: 'HN', price: 7.21, change: 11.55 },
  { ticker: 'BEAM2USD', name: 'Beam Network', initials: 'BM', price: 0.021, change: 9.93 },
  { ticker: 'ADAUSD', name: 'Cardano', initials: 'AD', price: 0.428, change: 9.72 }
];

export const EARNINGS_CALENDAR = {
  today: [
    { ticker: 'VFS', name: 'VinFast Auto', est: '-0.27 USD', bullish: false },
    { ticker: 'PKE', name: 'Park Aerospace', est: '0.16 USD', bullish: true }
  ],
  tomorrow: [
    { ticker: 'RPM', name: 'RPM International', est: '1.95 USD', bullish: true },
    { ticker: 'LW', name: 'Lamb Weston Hldgs', est: '0.59 USD', bullish: true },
    { ticker: 'CMTL', name: 'Comtech Telecom', est: '-0.51 USD', bullish: false }
  ]
};

// Generates realistic candlestick sequences for charting
export function generateCandles(basePrice: number, count: number = 46, volatilityPercent: number = 0.012): Candle[] {
  const candles: Candle[] = [];
  let currentPrice = basePrice * 0.88; // start lower so it trends upward to basePrice
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;

  for (let i = count; i >= 0; i--) {
    const timestamp = now - i * dayMs;
    const dateObj = new Date(timestamp);
    const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    // Upward bias with random micro-swings
    const trendFactor = (count - i) / count;
    const randomShift = (Math.random() - 0.46) * volatilityPercent * currentPrice;
    const targetPrice = basePrice * (0.88 + trendFactor * 0.12);
    const open = currentPrice;
    const close = Math.max(open * 0.8, open + (targetPrice - open) * 0.15 + randomShift);
    const high = Math.max(open, close) + Math.random() * volatilityPercent * currentPrice * 0.8;
    const low = Math.min(open, close) - Math.random() * volatilityPercent * currentPrice * 0.8;
    const volume = Math.floor(1000 + Math.random() * 8000 + (high - low) * 50);

    candles.push({
      time: dateStr,
      timestamp,
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume
    });

    currentPrice = close;
  }

  // Ensure last candle closes near basePrice
  if (candles.length > 0) {
    candles[candles.length - 1].close = basePrice;
    candles[candles.length - 1].high = Math.max(candles[candles.length - 1].high, basePrice + 120);
  }

  return candles;
}
