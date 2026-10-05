import React, { useState } from 'react';
import { Position } from '../types/market';

interface PositionsDrawerProps {
  positions: Position[];
  onClosePosition: (id: string) => void;
  balance: number;
}

export const PositionsDrawer: React.FC<PositionsDrawerProps> = ({
  positions,
  onClosePosition,
  balance,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const totalUnrealizedPnl = positions.reduce((acc, pos) => acc + pos.pnl, 0);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 select-none">
      {/* Floating Toggle Bar */}
      <div className="bg-[#1e222d] border-t border-[#2a2e39] px-4 py-2 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-4 text-xs font-mono">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1.5 font-bold text-[#f0f3fa] hover:text-[#2962ff] cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-[#089981] animate-pulse"></span>
            <span>Paper Trading Account</span>
            <span className="material-symbols-outlined text-[16px]">
              {isOpen ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}
            </span>
          </button>

          <div className="hidden sm:flex items-center gap-3 text-[#787b86]">
            <span>
              Equity: <strong className="text-white">${balance.toLocaleString()}</strong>
            </span>
            <span>·</span>
            <span>
              Active Positions: <strong className="text-[#2962ff]">{positions.length}</strong>
            </span>
            <span>·</span>
            <span>
              Unrealized P&L:{' '}
              <strong
                className={`tabular-nums ${
                  totalUnrealizedPnl >= 0 ? 'text-[#089981]' : 'text-[#f23645]'
                }`}
              >
                {totalUnrealizedPnl >= 0 ? '+' : ''}${totalUnrealizedPnl.toFixed(2)}
              </strong>
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs text-[#787b86] hover:text-white px-2 py-1 rounded bg-[#131722] border border-[#2a2e39] cursor-pointer"
        >
          {isOpen ? 'Hide Panel' : `View Positions (${positions.length})`}
        </button>
      </div>

      {/* Expanded Table Drawer */}
      {isOpen && (
        <div className="bg-[#131722] border-t border-[#2a2e39] p-4 max-h-60 overflow-y-auto font-mono text-xs">
          {positions.length === 0 ? (
            <div className="text-center py-6 text-[#787b86]">
              <p>No open positions currently active.</p>
              <p className="text-[11px] mt-1 font-sans">
                Use the SELL or BUY buttons on Supercharts to simulate institutional order execution.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[#787b86] border-b border-[#2a2e39] text-[11px] pb-1">
                    <th className="py-1">Symbol</th>
                    <th className="py-1">Side</th>
                    <th className="py-1">Size</th>
                    <th className="py-1">Entry Price</th>
                    <th className="py-1">Mark Price</th>
                    <th className="py-1">TP / SL</th>
                    <th className="py-1 text-right">P&L ($)</th>
                    <th className="py-1 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e222d]">
                  {positions.map((pos) => {
                    const isProfit = pos.pnl >= 0;
                    return (
                      <tr key={pos.id} className="hover:bg-[#1e222d]/60">
                        <td className="py-2 font-bold text-white">{pos.symbol}</td>
                        <td className="py-2">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              pos.side === 'BUY'
                                ? 'bg-[#089981]/20 text-[#089981]'
                                : 'bg-[#f23645]/20 text-[#f23645]'
                            }`}
                          >
                            {pos.side}
                          </span>
                        </td>
                        <td className="py-2 text-[#dfe2f2]">{pos.size}</td>
                        <td className="py-2 text-[#dfe2f2]">${pos.entryPrice.toFixed(2)}</td>
                        <td className="py-2 text-[#dfe2f2]">${pos.currentPrice.toFixed(2)}</td>
                        <td className="py-2 text-[#787b86] text-[10px]">
                          {pos.takeProfit ? `TP: ${pos.takeProfit.toFixed(1)}` : '—'} /{' '}
                          {pos.stopLoss ? `SL: ${pos.stopLoss.toFixed(1)}` : '—'}
                        </td>
                        <td
                          className={`py-2 text-right font-bold tabular-nums ${
                            isProfit ? 'text-[#089981]' : 'text-[#f23645]'
                          }`}
                        >
                          {isProfit ? '+' : ''}${pos.pnl.toFixed(2)}
                        </td>
                        <td className="py-2 text-right">
                          <button
                            onClick={() => onClosePosition(pos.id)}
                            className="px-2 py-0.5 rounded bg-[#2a2e39] hover:bg-[#f23645] hover:text-white text-[#dfe2f2] text-[10px] transition-colors cursor-pointer"
                          >
                            Close
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
