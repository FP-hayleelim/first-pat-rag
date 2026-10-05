import React from 'react';
import { SymbolInfo } from '../types/market';

interface TickerMarqueeProps {
  symbols: Record<string, SymbolInfo>;
  onSelectSymbol: (ticker: string) => void;
  activeTicker: string;
}

export const TickerMarquee: React.FC<TickerMarqueeProps> = ({
  symbols,
  onSelectSymbol,
  activeTicker,
}) => {
  const marqueeList = [
    { ticker: 'SPX', label: 'S&P 500' },
    { ticker: 'NDX', label: 'NASDAQ 100' },
    { ticker: 'BTCUSD', label: 'BTC/USD' },
    { ticker: 'ETHUSD', label: 'ETH/USD' },
    { ticker: 'XAUUSD', label: 'GOLD' },
    { ticker: 'CRUDE', label: 'CRUDE OIL', customPrice: '71.80', customChange: '+0.90%', isBull: true },
    { ticker: 'EURUSD', label: 'EUR/USD' },
    { ticker: 'NVDA', label: 'NVDA' },
    { ticker: 'TSLA', label: 'TSLA' },
  ];

  return (
    <div className="fixed top-14 left-0 right-0 z-40 h-8 w-full bg-[#131722] border-b border-[#2a2e39] overflow-x-auto overflow-y-hidden flex items-center gap-6 px-3 sm:px-4 whitespace-nowrap shadow-inner select-none scrollbar-none">
      {marqueeList.map((item) => {
        const symbolData = symbols[item.ticker];
        const isCustom = !!item.customPrice;

        const price = isCustom
          ? item.customPrice
          : symbolData
          ? symbolData.price.toLocaleString(undefined, {
              minimumFractionDigits: symbolData.decimals,
              maximumFractionDigits: symbolData.decimals,
            })
          : '—';

        const isPositive = isCustom ? item.isBull : (symbolData ? symbolData.change >= 0 : true);
        const changeStr = isCustom
          ? item.customChange
          : symbolData
          ? `${isPositive ? '+' : ''}${symbolData.changePercent.toFixed(2)}%`
          : '+0.00%';

        const isCurrentActive = activeTicker === item.ticker;

        return (
          <button
            key={item.ticker}
            onClick={() => onSelectSymbol(item.ticker)}
            className={`flex items-center gap-2 font-mono text-xs cursor-pointer py-1 px-1.5 rounded transition-all ${
              isCurrentActive ? 'bg-[#2a2e39] ring-1 ring-[#2962ff]' : 'hover:bg-[#1e222d]'
            }`}
          >
            <span className="text-[#787b86] text-[11px] font-semibold tracking-wider uppercase font-sans">
              {item.label}
            </span>
            <span className="text-[#f0f3fa] font-bold tabular-nums">
              {price}
            </span>
            <span
              className={`flex items-center text-[11px] font-semibold tabular-nums ${
                isPositive ? 'text-[#089981]' : 'text-[#f23645]'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">
                {isPositive ? 'arrow_drop_up' : 'arrow_drop_down'}
              </span>
              {changeStr}
            </span>
          </button>
        );
      })}
    </div>
  );
};
