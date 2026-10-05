import React, { useState } from 'react';

interface PineScriptSectionProps {
  pineScriptActive: boolean;
  onTogglePineScript: () => void;
}

export const PineScriptSection: React.FC<PineScriptSectionProps> = ({
  pineScriptActive,
  onTogglePineScript,
}) => {
  const [showScriptsLibrary, setShowScriptsLibrary] = useState(false);
  const [showDocsModal, setShowDocsModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const pineCode = `//@version=5
indicator("Trend Target Ribbon [BOSWaves]", overlay=true)

length = input.int(20, "Ribbon Period")
alma_val = ta.alma(close, length, 0.85, 6.0)
is_bullish = close > alma_val and ta.rising(alma_val, 2)

plot(alma_val, color=is_bullish ? #089981 : #f23645, linewidth=2)
plotshape(ta.crossover(close, alma_val), style=shape.triangleup, color=#089981)`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(pineCode);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const communityScripts = [
    {
      name: 'Smart Money Concepts (SMC) Pro',
      author: 'LuxAlgo',
      downloads: '142,500',
      description: 'Auto-detects BOS, CHoCH, Order Blocks, and Liquidity Pools across timeframes.',
    },
    {
      name: 'Machine Learning: Lorentzian Classifier',
      author: 'jdehorty',
      downloads: '98,200',
      description: 'Non-parametric classification of price action with kernel density estimations.',
    },
    {
      name: 'Supertrend Multi-Timeframe Matrix',
      author: 'KivancOzbilgic',
      downloads: '85,400',
      description: 'Dynamic volatility stops using ATR with cross-timeframe confirmation signals.',
    },
  ];

  return (
    <section className="w-full bg-[#0f131e] py-10 px-2 sm:px-4 lg:px-6 border-b border-[#1b1f2b]" id="pine-script">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-center">
        {/* Left Copy */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#1b1f2b] text-[11px] font-mono text-[#66dabf] uppercase font-bold mb-3 border border-[#2a2e39]">
            <span className="material-symbols-outlined text-[14px]">code</span>
            Pine Script® v5
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#f0f3fa] tracking-tight leading-snug">
            Write custom indicators. Backtest any strategy in seconds.
          </h3>

          <p className="text-xs sm:text-sm text-[#c3c5d8] mt-3 leading-relaxed">
            More than 100,000 community-built indicators and strategies available out of the box, or write your own recursive algorithms with institutional precision.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowScriptsLibrary(true)}
              className="px-4 py-2.5 rounded bg-[#1e222d] hover:bg-[#2a2e39] border border-[#363a45] text-[#f0f3fa] text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-md"
            >
              <span className="material-symbols-outlined text-[16px] text-[#2962ff]">
                library_books
              </span>
              Browse Community Scripts
            </button>

            <button
              onClick={onTogglePineScript}
              className={`px-4 py-2.5 rounded text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-md ${
                pineScriptActive
                  ? 'bg-[#089981] hover:bg-[#077a67] text-white ring-2 ring-[#089981]/50'
                  : 'bg-[#2962ff] hover:bg-[#004ee8] text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                {pineScriptActive ? 'check_circle' : 'play_arrow'}
              </span>
              {pineScriptActive ? 'Script Running on Superchart' : 'Run Script on Superchart'}
            </button>

            <button
              onClick={() => setShowDocsModal(true)}
              className="px-2 py-2 text-[#2962ff] hover:underline text-xs font-semibold cursor-pointer"
            >
              Read Pine Script documentation →
            </button>
          </div>
        </div>

        {/* Code Snippet Box */}
        <div className="bg-[#1e222d] rounded-xl border border-[#2a2e39] p-4 font-mono text-xs text-[#787b86] overflow-hidden shadow-2xl relative">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#2a2e39] text-xs">
            <span className="text-[#f0f3fa] font-bold flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#089981] animate-pulse"></span>
              TrendTargetRibbon.pine
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyCode}
                className="hover:text-white px-2 py-0.5 rounded bg-[#131722] text-[10px] cursor-pointer"
              >
                {copySuccess ? 'Copied ✓' : 'Copy'}
              </button>
              <span className="text-[#089981] text-[11px] font-semibold">
                v5 · Compiled OK
              </span>
            </div>
          </div>

          <pre className="overflow-x-auto text-[11px] sm:text-[12px] leading-relaxed text-[#dfe2f2] p-1 selection:bg-[#2962ff] selection:text-white">
            <code>
              <span className="text-blue-400">//@version=5</span>
              <br />
              <span className="text-purple-400">indicator</span>(
              <span className="text-emerald-400">"Trend Target Ribbon [BOSWaves]"</span>, overlay=
              <span className="text-amber-400">true</span>)
              <br />
              <br />
              length = <span className="text-amber-400">input.int</span>(
              <span className="text-blue-400">20</span>,{' '}
              <span className="text-emerald-400">"Ribbon Period"</span>)
              <br />
              alma_val = <span className="text-amber-400">ta.alma</span>(close, length,{' '}
              <span className="text-blue-400">0.85</span>, <span className="text-blue-400">6.0</span>)
              <br />
              is_bullish = close &gt; alma_val and <span className="text-amber-400">ta.rising</span>
              (alma_val, <span className="text-blue-400">2</span>)
              <br />
              <br />
              <span className="text-purple-400">plot</span>(alma_val, color=is_bullish ?{' '}
              <span className="text-[#089981] font-bold">#089981</span> :{' '}
              <span className="text-[#f23645] font-bold">#f23645</span>, linewidth=
              <span className="text-blue-400">2</span>)
              <br />
              <span className="text-purple-400">plotshape</span>(
              <span className="text-amber-400">ta.crossover</span>(close, alma_val), style=
              <span className="text-[#66dabf]">shape.triangleup</span>, color=
              <span className="text-[#089981] font-bold">#089981</span>)
            </code>
          </pre>

          {/* Quick status footer */}
          <div className="mt-3 pt-2 border-t border-[#2a2e39] flex items-center justify-between text-[10px] text-[#787b86]">
            <span>Calculation latency: 0.8ms</span>
            <span className={pineScriptActive ? 'text-[#089981] font-bold' : ''}>
              {pineScriptActive ? '● Overlay Attached to Chart' : '○ Standby'}
            </span>
          </div>
        </div>
      </div>

      {/* Community Scripts Modal */}
      {showScriptsLibrary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-2xl bg-[#1e222d] border border-[#363a45] rounded-xl p-6 shadow-2xl text-left">
            <div className="flex items-center justify-between pb-3 border-b border-[#2a2e39] mb-4">
              <h3 className="text-lg font-bold text-[#f0f3fa] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#2962ff]">library_books</span>
                Pine Script® Public Indicator Library
              </h3>
              <button
                onClick={() => setShowScriptsLibrary(false)}
                className="w-7 h-7 rounded-full bg-[#131722] text-[#787b86] hover:text-white flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              {communityScripts.map((script, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-[#131722] rounded-lg border border-[#2a2e39] hover:border-[#363a45] flex items-center justify-between gap-4"
                >
                  <div>
                    <h5 className="text-sm font-bold text-[#f0f3fa]">{script.name}</h5>
                    <p className="text-xs text-[#787b86] mt-0.5">{script.description}</p>
                    <div className="flex items-center gap-2 mt-1.5 text-[11px] text-[#2962ff]">
                      <span>by {script.author}</span>
                      <span>·</span>
                      <span className="text-[#787b86]">{script.downloads} traders</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onTogglePineScript();
                      setShowScriptsLibrary(false);
                    }}
                    className="px-3.5 py-1.5 bg-[#2962ff] hover:bg-[#004ee8] text-white text-xs font-semibold rounded shrink-0 cursor-pointer"
                  >
                    Add to Chart
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Docs Modal */}
      {showDocsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-xl bg-[#1e222d] border border-[#363a45] rounded-xl p-6 shadow-2xl text-left text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#2a2e39] mb-4">
              <h3 className="text-base font-bold text-[#f0f3fa]">
                Pine Script v5 Quick Reference
              </h3>
              <button
                onClick={() => setShowDocsModal(false)}
                className="w-7 h-7 rounded-full bg-[#131722] text-[#787b86] hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-[#dfe2f2]">
              <p>
                Pine Script is TradingView's proprietary domain-specific language designed for building technical indicators and backtesting quantitative trading strategies.
              </p>
              <div className="space-y-1 font-mono text-[11px] bg-[#131722] p-3 rounded border border-[#2a2e39]">
                <div><strong className="text-purple-400">ta.sma(src, len)</strong>: Simple moving average</div>
                <div><strong className="text-purple-400">ta.ema(src, len)</strong>: Exponential moving average</div>
                <div><strong className="text-purple-400">ta.rsi(src, len)</strong>: Relative strength index</div>
                <div><strong className="text-purple-400">strategy.entry(...)</strong>: Enter buy/sell order in backtest</div>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowDocsModal(false)}
                className="px-4 py-1.5 bg-[#2962ff] text-white font-semibold rounded"
              >
                Close Docs
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
