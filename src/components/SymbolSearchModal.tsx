import React, { useState, useEffect } from 'react';
import { SymbolInfo } from '../types/market';
import { INITIAL_SYMBOLS, VOLUME_STOCKS, TOP_CRYPTO_GAINERS } from '../data/mockMarketData';

interface SymbolSearchModalProps {
  onClose: () => void;
  onSelectSymbol: (ticker: string) => void;
  currentTicker: string;
}

export const SymbolSearchModal: React.FC<SymbolSearchModalProps> = ({
  onClose,
  onSelectSymbol,
  currentTicker,
}) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Combine symbols
  const allSymbolsList: SymbolInfo[] = Object.values(INITIAL_SYMBOLS);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'crypto', label: 'Crypto' },
    { id: 'stocks', label: 'Stocks' },
    { id: 'indices', label: 'Indices' },
    { id: 'forex', label: 'Forex' },
    { id: 'commodities', label: 'Commodities' },
  ];

  const filtered = allSymbolsList.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesQuery =
      item.ticker.toLowerCase().includes(query.toLowerCase()) ||
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.exchange.toLowerCase().includes(query.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-3 sm:px-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-2xl bg-[#1e222d] border border-[#363a45] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] text-left">
        {/* Search Input Bar */}
        <div className="p-3 sm:p-4 border-b border-[#2a2e39] flex items-center gap-3 bg-[#131722]">
          <span className="material-symbols-outlined text-[20px] text-[#787b86]">
            search
          </span>
          <input
            type="text"
            autoFocus
            placeholder="Search markets, symbols, ideas (e.g. BTCUSD, NVDA, AAPL)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm sm:text-base text-[#f0f3fa] placeholder-[#787b86] focus:outline-none font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#787b86] hover:text-white px-1.5 py-0.5"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 rounded bg-[#2a2e39] hover:bg-[#363a45] text-white text-xs font-mono"
          >
            ESC
          </button>
        </div>

        {/* Filter Categories */}
        <div className="px-4 py-2 border-b border-[#2a2e39] flex items-center gap-1.5 overflow-x-auto scrollbar-none bg-[#1e222d]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#2962ff] text-white'
                  : 'bg-[#131722] text-[#787b86] hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-[#787b86] text-xs">
              No matching instruments found for "{query}".
            </div>
          ) : (
            filtered.map((item) => {
              const isSelected = currentTicker === item.ticker;
              const isBull = item.change >= 0;

              return (
                <button
                  key={item.ticker}
                  onClick={() => {
                    onSelectSymbol(item.ticker);
                    onClose();
                  }}
                  className={`w-full p-2.5 rounded-lg flex items-center justify-between text-left transition-all cursor-pointer font-mono text-xs ${
                    isSelected
                      ? 'bg-[#2962ff]/20 border border-[#2962ff]'
                      : 'hover:bg-[#2a2e39]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded bg-[#131722] border border-[#2a2e39] flex items-center justify-center font-bold text-white text-xs">
                      {item.ticker.charAt(0)}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#f0f3fa] font-bold text-sm">
                          {item.ticker}
                        </span>
                        <span className="text-[10px] bg-[#131722] text-[#787b86] px-1.5 py-0.5 rounded font-sans uppercase">
                          {item.exchange}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#787b86] font-sans">
                        {item.name}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[#f0f3fa] font-bold tabular-nums">
                      ${item.price.toFixed(item.decimals)}
                    </div>
                    <div
                      className={`text-[11px] tabular-nums ${
                        isBull ? 'text-[#089981]' : 'text-[#f23645]'
                      }`}
                    >
                      {isBull ? '+' : ''}
                      {item.changePercent.toFixed(2)}%
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-[#131722] border-t border-[#2a2e39] flex items-center justify-between text-[11px] text-[#787b86]">
          <span>Tip: Press <strong>↑</strong> <strong>↓</strong> to navigate, <strong>Enter</strong> to select</span>
          <span>Global real-time data</span>
        </div>
      </div>
    </div>
  );
};
