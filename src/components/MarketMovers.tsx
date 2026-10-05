import React, { useState } from 'react';
import { VOLUME_STOCKS, TOP_CRYPTO_GAINERS, EARNINGS_CALENDAR } from '../data/mockMarketData';

interface MarketMoversProps {
  onSelectSymbol: (ticker: string) => void;
}

export const MarketMovers: React.FC<MarketMoversProps> = ({ onSelectSymbol }) => {
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  return (
    <section className="w-full bg-[#0f131e] py-8 px-2 sm:px-4 lg:px-6 border-b border-[#1b1f2b]">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Column 1: Highest Volume Stocks */}
        <div className="bg-[#1e222d] p-4 rounded-lg border border-[#2a2e39] flex flex-col justify-between shadow-md">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#2a2e39]">
              <h4 className="text-sm font-bold text-[#f0f3fa] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#2962ff] text-[18px]">
                  equalizer
                </span>
                Highest volume stocks
              </h4>
              <button
                onClick={() => onSelectSymbol('NVDA')}
                className="text-[#2962ff] hover:underline text-xs font-semibold cursor-pointer"
              >
                See all
              </button>
            </div>

            <div className="space-y-1">
              {VOLUME_STOCKS.map((stock) => {
                const isBull = stock.change >= 0;
                return (
                  <div
                    key={stock.ticker}
                    onClick={() => onSelectSymbol(stock.ticker)}
                    className="flex items-center justify-between p-2 rounded-md hover:bg-[#2a2e39] transition-colors font-mono text-xs cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded bg-[#131722] border border-[#2a2e39] flex items-center justify-center font-bold text-[#f0f3fa] text-xs">
                        {stock.initials}
                      </div>
                      <div>
                        <div className="text-[#f0f3fa] font-bold group-hover:text-[#2962ff] transition-colors">
                          {stock.ticker}
                        </div>
                        <div className="text-[11px] text-[#787b86] font-sans">
                          {stock.name}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[#f0f3fa] font-semibold tabular-nums">
                        ${stock.price.toFixed(2)}
                      </div>
                      <div
                        className={`text-[11px] tabular-nums ${
                          isBull ? 'text-[#089981]' : 'text-[#f23645]'
                        }`}
                      >
                        {isBull ? '+' : ''}
                        {stock.change.toFixed(2)}% · {stock.vol}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Column 2: Top Crypto Gainers */}
        <div className="bg-[#1e222d] p-4 rounded-lg border border-[#2a2e39] flex flex-col justify-between shadow-md">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#2a2e39]">
              <h4 className="text-sm font-bold text-[#f0f3fa] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#089981] text-[18px]">
                  trending_up
                </span>
                Top crypto gainers
              </h4>
              <button
                onClick={() => onSelectSymbol('BTCUSD')}
                className="text-[#2962ff] hover:underline text-xs font-semibold cursor-pointer"
              >
                See all
              </button>
            </div>

            <div className="space-y-1">
              {TOP_CRYPTO_GAINERS.map((crypto) => (
                <div
                  key={crypto.ticker}
                  onClick={() => onSelectSymbol(crypto.ticker)}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-[#2a2e39] transition-colors font-mono text-xs cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded bg-[#089981]/10 text-[#089981] border border-[#089981]/20 flex items-center justify-center font-bold text-xs">
                      {crypto.initials}
                    </div>
                    <div>
                      <div className="text-[#f0f3fa] font-bold group-hover:text-[#2962ff] transition-colors">
                        {crypto.ticker}
                      </div>
                      <div className="text-[11px] text-[#787b86] font-sans">
                        {crypto.name}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[#f0f3fa] font-semibold tabular-nums">
                      ${crypto.price}
                    </div>
                    <div className="text-[#089981] font-semibold text-[11px] tabular-nums">
                      +{crypto.change.toFixed(2)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Column 3: Earnings & Economic Calendar */}
        <div className="bg-[#1e222d] p-4 rounded-lg border border-[#2a2e39] flex flex-col justify-between shadow-md">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#2a2e39]">
              <h4 className="text-sm font-bold text-[#f0f3fa] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#66dabf] text-[18px]">
                  calendar_today
                </span>
                Earnings & Economic Calendar
              </h4>
              <button
                onClick={() => setShowCalendarModal(true)}
                className="text-[#2962ff] hover:underline text-xs font-semibold cursor-pointer"
              >
                View full
              </button>
            </div>

            <div className="space-y-2">
              {/* Today */}
              <div className="p-2.5 rounded-md bg-[#131722] border border-[#2a2e39]">
                <div className="text-[10px] uppercase font-bold text-[#787b86] tracking-wider mb-2 font-mono">
                  Today's Earnings
                </div>
                {EARNINGS_CALENDAR.today.map((item) => (
                  <div
                    key={item.ticker}
                    className="flex items-center justify-between font-mono text-xs py-1"
                  >
                    <div>
                      <span className="text-[#f0f3fa] font-bold">{item.ticker}</span>
                      <span className="text-[#787b86] text-[11px] ml-1 font-sans">{item.name}</span>
                    </div>
                    <div className="text-right text-[11px]">
                      <span className="text-[#787b86]">Est:</span>{' '}
                      <span
                        className={`font-semibold tabular-nums ${
                          item.bullish ? 'text-[#089981]' : 'text-[#f23645]'
                        }`}
                      >
                        {item.est}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tomorrow */}
              <div className="p-2.5 rounded-md bg-[#131722] border border-[#2a2e39]">
                <div className="text-[10px] uppercase font-bold text-[#787b86] tracking-wider mb-2 font-mono">
                  Tomorrow
                </div>
                {EARNINGS_CALENDAR.tomorrow.map((item) => (
                  <div
                    key={item.ticker}
                    className="flex items-center justify-between font-mono text-xs py-1"
                  >
                    <div>
                      <span className="text-[#f0f3fa] font-bold">{item.ticker}</span>
                      <span className="text-[#787b86] text-[11px] ml-1 font-sans">{item.name}</span>
                    </div>
                    <div className="text-right text-[11px]">
                      <span className="text-[#787b86]">Est:</span>{' '}
                      <span
                        className={`font-semibold tabular-nums ${
                          item.bullish ? 'text-[#089981]' : 'text-[#f23645]'
                        }`}
                      >
                        {item.est}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Economic Calendar Modal */}
      {showCalendarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-xl bg-[#1e222d] border border-[#363a45] rounded-xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#2a2e39] mb-4">
              <h3 className="text-lg font-bold text-[#f0f3fa] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#2962ff]">event_note</span>
                Global Economic & Earnings Calendar
              </h3>
              <button
                onClick={() => setShowCalendarModal(false)}
                className="w-7 h-7 rounded-full bg-[#131722] text-[#787b86] hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-[#131722] rounded-lg border border-[#2a2e39]">
                <div className="text-[#089981] font-bold mb-1">Upcoming Fed Interest Rate Decision</div>
                <div className="text-[#787b86]">FOMC statement & press conference at 14:00 EDT. Expected 25bps cut.</div>
              </div>
              <div className="p-3 bg-[#131722] rounded-lg border border-[#2a2e39]">
                <div className="text-[#2962ff] font-bold mb-1">US Non-Farm Payrolls (NFP)</div>
                <div className="text-[#787b86]">Friday 08:30 EDT · Consensus: 145K jobs added. Prior: 142K.</div>
              </div>
              <div className="p-3 bg-[#131722] rounded-lg border border-[#2a2e39]">
                <div className="text-amber-400 font-bold mb-1">Consumer Price Index (CPI) YoY</div>
                <div className="text-[#787b86]">Next Tuesday · Consensus: 2.5% YoY inflation.</div>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setShowCalendarModal(false)}
                className="px-4 py-2 bg-[#2962ff] text-white text-xs font-semibold rounded cursor-pointer"
              >
                Close Calendar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
