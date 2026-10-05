import React, { useState } from 'react';
import { SymbolInfo } from '../types/market';

interface MarketSummaryProps {
  symbols: Record<string, SymbolInfo>;
  onSelectSymbol: (ticker: string) => void;
  activeTicker: string;
}

export const MarketSummary: React.FC<MarketSummaryProps> = ({
  symbols,
  onSelectSymbol,
  activeTicker,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    BTCUSD: true,
    SPX: true,
  });

  const categories = [
    { id: 'all', label: 'Major indices' },
    { id: 'crypto', label: 'Crypto' },
    { id: 'forex', label: 'Forex' },
    { id: 'commodities', label: 'Futures & Commodities' },
    { id: 'stocks', label: 'US Stocks' },
    { id: 'bonds', label: 'Bonds' },
  ];

  const defaultCards = [
    {
      ticker: 'SPX',
      title: 'S&P 500',
      symbolCode: 'SPX',
      price: '5,864.67',
      change: '+0.42%',
      isBullish: true,
      path: 'M0 24 L20 20 L40 22 L60 14 L80 16 L100 4',
      areaPath: 'M0 24 L20 20 L40 22 L60 14 L80 16 L100 4 L100 30 L0 30 Z',
      category: 'indices',
    },
    {
      ticker: 'NDX',
      title: 'Nasdaq 100',
      symbolCode: 'NDX',
      price: '20,412.30',
      change: '+0.85%',
      isBullish: true,
      path: 'M0 26 L18 24 L36 18 L54 19 L72 10 L100 3',
      areaPath: 'M0 26 L18 24 L36 18 L54 19 L72 10 L100 3 L100 30 L0 30 Z',
      category: 'indices',
    },
    {
      ticker: 'BTCUSD',
      title: 'Bitcoin',
      symbolCode: 'BTCUSD',
      price: '85,420.00',
      change: '+2.14%',
      isBullish: true,
      path: 'M0 25 L20 22 L35 24 L55 12 L75 14 L100 2',
      areaPath: 'M0 25 L20 22 L35 24 L55 12 L75 14 L100 2 L100 30 L0 30 Z',
      category: 'crypto',
    },
    {
      ticker: 'XAUUSD',
      title: 'Gold Spot',
      symbolCode: 'XAUUSD',
      price: '4,142.10',
      change: '-0.32%',
      isBullish: false,
      path: 'M0 8 L25 10 L50 18 L70 14 L85 24 L100 26',
      areaPath: 'M0 8 L25 10 L50 18 L70 14 L85 24 L100 26 L100 30 L0 30 Z',
      category: 'commodities',
    },
    {
      ticker: 'US10Y',
      title: 'US 10Y Yield',
      symbolCode: 'US10Y',
      price: '4.18%',
      change: '+0.03',
      isBullish: true,
      path: 'M0 20 L30 18 L55 21 L75 12 L100 8',
      areaPath: 'M0 20 L30 18 L55 21 L75 12 L100 8 L100 30 L0 30 Z',
      category: 'bonds',
    },
    {
      ticker: 'EURUSD',
      title: 'Euro / US Dollar',
      symbolCode: 'EURUSD',
      price: '1.0842',
      change: '-0.15%',
      isBullish: false,
      path: 'M0 12 L25 15 L50 14 L75 22 L100 24',
      areaPath: 'M0 12 L25 15 L50 14 L75 22 L100 24 L100 30 L0 30 Z',
      category: 'forex',
    },
  ];

  const toggleFavorite = (ticker: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => ({
      ...prev,
      [ticker]: !prev[ticker],
    }));
  };

  const filteredCards = selectedCategory === 'all'
    ? defaultCards
    : defaultCards.filter((card) => card.category === selectedCategory);

  return (
    <section className="w-full bg-[#0f131e] py-8 px-2 sm:px-4 lg:px-6 border-b border-[#1b1f2b]" id="market-summary">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-4">
        {/* Section Title & Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#f0f3fa]">
              Market summary
            </h3>
            <p className="text-xs sm:text-sm text-[#787b86]">
              Live streaming prices and key performance metrics across global asset classes.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#2a2e39] text-[#f0f3fa] shadow-sm ring-1 ring-[#363a45]'
                      : 'bg-[#1b1f2b] text-[#787b86] hover:text-[#f0f3fa] hover:bg-[#262a35]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Micro Sparkline Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {filteredCards.map((card) => {
            const isFav = !!favorites[card.ticker];
            const isSelected = activeTicker === card.ticker;
            const strokeColor = card.isBullish ? '#089981' : '#f23645';

            return (
              <div
                key={card.ticker}
                onClick={() => {
                  onSelectSymbol(card.ticker);
                  const el = document.getElementById('supercharts');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`bg-[#1e222d] p-3.5 rounded-lg border transition-all duration-200 flex flex-col justify-between cursor-pointer group hover:-translate-y-0.5 shadow-md ${
                  isSelected
                    ? 'border-[#2962ff] ring-1 ring-[#2962ff]'
                    : 'border-[#2a2e39] hover:border-[#363a45] hover:bg-[#262a35]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[11px] font-sans font-medium text-[#787b86] uppercase">
                      {card.title}
                    </span>
                    <div className="text-sm font-bold text-[#f0f3fa] group-hover:text-[#2962ff] transition-colors">
                      {card.symbolCode}
                    </div>
                  </div>
                  <button
                    onClick={(e) => toggleFavorite(card.ticker, e)}
                    className="text-[#787b86] hover:text-amber-400 p-0.5 transition-colors cursor-pointer"
                    title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <span
                      className={`material-symbols-outlined text-[16px] ${
                        isFav ? 'text-amber-400 font-bold' : ''
                      }`}
                    >
                      star
                    </span>
                  </button>
                </div>

                <div className="my-2 h-10 w-full flex items-center">
                  <svg className="w-full h-8" fill="none" viewBox="0 0 100 30">
                    <path
                      d={card.path}
                      stroke={strokeColor}
                      strokeLinecap="round"
                      strokeWidth="1.8"
                    />
                    <path
                      d={card.areaPath}
                      fill={strokeColor}
                      fillOpacity="0.1"
                    />
                  </svg>
                </div>

                <div className="flex items-baseline justify-between font-mono text-xs">
                  <span className="text-[#f0f3fa] font-semibold tabular-nums">
                    {card.price}
                  </span>
                  <span
                    className={`font-semibold tabular-nums ${
                      card.isBullish ? 'text-[#089981]' : 'text-[#f23645]'
                    }`}
                  >
                    {card.change}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
