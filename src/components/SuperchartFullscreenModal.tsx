import React, { useState } from 'react';
import { SymbolInfo, Position } from '../types/market';
import { Superchart } from './Superchart';
import { INITIAL_SYMBOLS } from '../data/mockMarketData';

interface SuperchartFullscreenModalProps {
  currentSymbol: SymbolInfo;
  onClose: () => void;
  onSelectSymbol: (ticker: string) => void;
  onOpenOrderTicket: (side: 'BUY' | 'SELL', price: number, size: number) => void;
  pineScriptActive: boolean;
}

export const SuperchartFullscreenModal: React.FC<SuperchartFullscreenModalProps> = ({
  currentSymbol,
  onClose,
  onSelectSymbol,
  onOpenOrderTicket,
  pineScriptActive,
}) => {
  const [showWatchlist, setShowWatchlist] = useState(true);

  const symbolsList = Object.values(INITIAL_SYMBOLS);

  return (
    <div className="fixed inset-0 z-50 bg-[#0f131e] flex flex-col overflow-hidden animate-in fade-in">
      {/* Institutional Top Control Bar */}
      <div className="h-12 bg-[#1e222d] border-b border-[#2a2e39] px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#089981] animate-ping"></span>
            <span className="font-bold text-white text-sm">Supercharts Pro Terminal</span>
          </div>
          <span className="text-[#787b86] text-xs">|</span>
          <span className="font-mono text-xs text-[#2962ff] font-bold">{currentSymbol.ticker}</span>
          <span className="text-xs text-[#787b86]">{currentSymbol.name}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowWatchlist(!showWatchlist)}
            className={`px-3 py-1 rounded text-xs font-semibold border transition-colors cursor-pointer ${
              showWatchlist
                ? 'bg-[#2a2e39] text-white border-[#363a45]'
                : 'bg-[#131722] text-[#787b86] border-[#2a2e39]'
            }`}
          >
            {showWatchlist ? 'Hide Watchlist' : 'Show Watchlist'}
          </button>

          <button
            onClick={onClose}
            className="px-3.5 py-1 rounded bg-[#2a2e39] hover:bg-[#f23645] text-white text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
            Exit Terminal (ESC)
          </button>
        </div>
      </div>

      {/* Main Terminal Viewport */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Watchlist Sidebar */}
        {showWatchlist && (
          <div className="w-64 bg-[#1e222d] border-r border-[#2a2e39] flex flex-col shrink-0">
            <div className="p-3 border-b border-[#2a2e39] text-xs font-bold text-[#787b86] uppercase tracking-wider flex justify-between items-center">
              <span>Watchlist</span>
              <span className="text-[10px] text-[#2962ff]">Real-Time</span>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-[#2a2e39]">
              {symbolsList.map((item) => {
                const isSelected = item.ticker === currentSymbol.ticker;
                const isBull = item.change >= 0;

                return (
                  <button
                    key={item.ticker}
                    onClick={() => onSelectSymbol(item.ticker)}
                    className={`w-full p-2.5 flex items-center justify-between text-left transition-colors cursor-pointer font-mono text-xs ${
                      isSelected ? 'bg-[#2962ff]/20 text-white' : 'hover:bg-[#2a2e39]'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-[#f0f3fa]">{item.ticker}</div>
                      <div className="text-[10px] text-[#787b86] font-sans truncate max-w-[120px]">
                        {item.name}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold tabular-nums text-white">
                        ${item.price.toFixed(item.decimals)}
                      </div>
                      <div
                        className={`text-[10px] tabular-nums ${
                          isBull ? 'text-[#089981]' : 'text-[#f23645]'
                        }`}
                      >
                        {isBull ? '+' : ''}{item.changePercent.toFixed(2)}%
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Center Main Superchart */}
        <div className="flex-1 flex flex-col overflow-y-auto bg-[#131722] p-2">
          <Superchart
            currentSymbol={currentSymbol}
            onOpenOrderTicket={onOpenOrderTicket}
            onOpenSearch={() => {}}
            onExpandLayout={onClose}
            pineScriptActive={pineScriptActive}
          />
        </div>
      </div>
    </div>
  );
};
