export interface Candle {
  time: string;
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface SymbolInfo {
  ticker: string;
  name: string;
  exchange: string;
  category: 'crypto' | 'indices' | 'forex' | 'stocks' | 'commodities' | 'bonds';
  price: number;
  change: number;
  changePercent: number;
  high24h: number;
  low24h: number;
  volume24h: string;
  decimals: number;
  currency: string;
  sparkline: number[];
}

export interface CommunityIdea {
  id: string;
  title: string;
  description: string;
  author: string;
  authorAvatar: string;
  authorInitials: string;
  symbol: string;
  type: 'Long' | 'Short';
  likes: number;
  comments: number;
  image: string;
  alt: string;
  tags: string[];
  timeAgo: string;
}

export interface Position {
  id: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  entryPrice: number;
  currentPrice: number;
  size: number;
  pnl: number;
  pnlPercent: number;
  takeProfit?: number;
  stopLoss?: number;
  openTime: string;
}

export interface Broker {
  id: string;
  name: string;
  category: string;
  rating: number;
  tag: string;
  connected: boolean;
  minDeposit: string;
  features: string[];
}
