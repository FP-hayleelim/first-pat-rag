import React, { useState } from 'react';
import { SymbolInfo, Position } from '../types/market';

interface OrderTicketModalProps {
  symbol: SymbolInfo;
  initialSide: 'BUY' | 'SELL';
  initialPrice: number;
  initialSize: number;
  onClose: () => void;
  onSubmitOrder: (position: Position) => void;
}

export const OrderTicketModal: React.FC<OrderTicketModalProps> = ({
  symbol,
  initialSide,
  initialPrice,
  initialSize,
  onClose,
  onSubmitOrder,
}) => {
  const [side, setSide] = useState<'BUY' | 'SELL'>(initialSide);
  const [orderType, setOrderType] = useState<'Market' | 'Limit' | 'Stop'>('Market');
  const [quantity, setQuantity] = useState<number>(initialSize || 1.0);
  const [price, setPrice] = useState<number>(initialPrice);
  const [leverage, setLeverage] = useState<number>(10);
  const [hasTakeProfit, setHasTakeProfit] = useState<boolean>(true);
  const [takeProfitPrice, setTakeProfitPrice] = useState<number>(
    initialSide === 'BUY' ? initialPrice * 1.05 : initialPrice * 0.95
  );
  const [hasStopLoss, setHasStopLoss] = useState<boolean>(true);
  const [stopLossPrice, setStopLossPrice] = useState<number>(
    initialSide === 'BUY' ? initialPrice * 0.97 : initialPrice * 1.03
  );

  const notionalValue = quantity * (orderType === 'Market' ? symbol.price : price);
  const marginRequired = notionalValue / leverage;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPosition: Position = {
      id: `pos-${Date.now()}`,
      symbol: symbol.ticker,
      side,
      entryPrice: orderType === 'Market' ? symbol.price : price,
      currentPrice: symbol.price,
      size: quantity,
      pnl: 0,
      pnlPercent: 0,
      takeProfit: hasTakeProfit ? takeProfitPrice : undefined,
      stopLoss: hasStopLoss ? stopLossPrice : undefined,
      openTime: new Date().toLocaleTimeString(),
    };

    onSubmitOrder(newPosition);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md bg-[#1e222d] border border-[#363a45] rounded-xl shadow-2xl overflow-hidden text-left">
        {/* Header */}
        <div className="p-4 border-b border-[#2a2e39] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
              {symbol.ticker.charAt(0)}
            </span>
            <div>
              <h3 className="font-bold text-[#f0f3fa] text-sm">
                Place Order · {symbol.ticker}
              </h3>
              <div className="text-[11px] text-[#787b86] font-mono">
                Last: ${symbol.price.toFixed(2)}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#131722] hover:bg-[#2a2e39] text-[#787b86] hover:text-white flex items-center justify-center cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Order Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4 text-xs font-sans">
          {/* Side Toggle: BUY / SELL */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-[#131722] rounded-lg border border-[#2a2e39]">
            <button
              type="button"
              onClick={() => {
                setSide('BUY');
                setTakeProfitPrice(symbol.price * 1.05);
                setStopLossPrice(symbol.price * 0.97);
              }}
              className={`py-2 rounded font-bold font-mono transition-all cursor-pointer ${
                side === 'BUY'
                  ? 'bg-[#089981] text-white shadow-md'
                  : 'text-[#787b86] hover:text-[#f0f3fa]'
              }`}
            >
              BUY / LONG
            </button>
            <button
              type="button"
              onClick={() => {
                setSide('SELL');
                setTakeProfitPrice(symbol.price * 0.95);
                setStopLossPrice(symbol.price * 1.03);
              }}
              className={`py-2 rounded font-bold font-mono transition-all cursor-pointer ${
                side === 'SELL'
                  ? 'bg-[#f23645] text-white shadow-md'
                  : 'text-[#787b86] hover:text-[#f0f3fa]'
              }`}
            >
              SELL / SHORT
            </button>
          </div>

          {/* Order Type Chips */}
          <div className="flex gap-2">
            {(['Market', 'Limit', 'Stop'] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setOrderType(type)}
                className={`flex-1 py-1.5 rounded text-xs font-semibold cursor-pointer border transition-colors ${
                  orderType === type
                    ? 'bg-[#2a2e39] text-[#2962ff] border-[#2962ff]'
                    : 'bg-[#131722] text-[#787b86] border-[#2a2e39] hover:text-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Price (if limit/stop) */}
          {orderType !== 'Market' && (
            <div>
              <label className="block text-[#787b86] mb-1 font-semibold">
                Order Price ({symbol.currency})
              </label>
              <input
                type="number"
                step="any"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full bg-[#131722] border border-[#2a2e39] rounded px-3 py-1.5 text-[#f0f3fa] font-mono focus:outline-none focus:border-[#2962ff]"
              />
            </div>
          )}

          {/* Quantity & Quick Size Percentages */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[#787b86] font-semibold">Quantity / Units</label>
              <span className="text-[11px] text-[#787b86] font-mono">
                Notional: ${notionalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </span>
            </div>
            <input
              type="number"
              step="0.1"
              min="0.01"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(0.01, Number(e.target.value)))}
              className="w-full bg-[#131722] border border-[#2a2e39] rounded px-3 py-1.5 text-[#f0f3fa] font-mono focus:outline-none focus:border-[#2962ff]"
            />
            <div className="grid grid-cols-4 gap-1.5 mt-1.5">
              {[0.5, 1.0, 2.0, 5.0].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setQuantity(amt)}
                  className="py-1 bg-[#131722] hover:bg-[#2a2e39] text-[#787b86] hover:text-white rounded text-[11px] font-mono border border-[#2a2e39] transition-colors"
                >
                  {amt}x
                </button>
              ))}
            </div>
          </div>

          {/* Leverage Slider */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#787b86] font-semibold">Leverage</span>
              <span className="text-[#2962ff] font-bold font-mono">{leverage}x</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              value={leverage}
              onChange={(e) => setLeverage(Number(e.target.value))}
              className="w-full accent-[#2962ff] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#787b86] mt-0.5">
              <span>1x (Spot)</span>
              <span>10x</span>
              <span>25x</span>
              <span>50x (Max)</span>
            </div>
          </div>

          {/* Take Profit & Stop Loss */}
          <div className="space-y-2 pt-2 border-t border-[#2a2e39]">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-1.5 text-xs text-[#089981] font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasTakeProfit}
                  onChange={(e) => setHasTakeProfit(e.target.checked)}
                  className="accent-[#089981]"
                />
                Take Profit (TP)
              </label>
              {hasTakeProfit && (
                <input
                  type="number"
                  step="any"
                  value={takeProfitPrice}
                  onChange={(e) => setTakeProfitPrice(Number(e.target.value))}
                  className="w-32 bg-[#131722] border border-[#2a2e39] rounded px-2 py-1 text-right text-[#089981] font-mono text-xs focus:outline-none"
                />
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-1.5 text-xs text-[#f23645] font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasStopLoss}
                  onChange={(e) => setHasStopLoss(e.target.checked)}
                  className="accent-[#f23645]"
                />
                Stop Loss (SL)
              </label>
              {hasStopLoss && (
                <input
                  type="number"
                  step="any"
                  value={stopLossPrice}
                  onChange={(e) => setStopLossPrice(Number(e.target.value))}
                  className="w-32 bg-[#131722] border border-[#2a2e39] rounded px-2 py-1 text-right text-[#f23645] font-mono text-xs focus:outline-none"
                />
              )}
            </div>
          </div>

          {/* Order Summary Box */}
          <div className="p-3 bg-[#131722] rounded-lg border border-[#2a2e39] text-[11px] font-mono space-y-1">
            <div className="flex justify-between text-[#787b86]">
              <span>Required Margin:</span>
              <span className="text-white">${marginRequired.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[#787b86]">
              <span>Estimated Execution Fee:</span>
              <span className="text-[#089981]">0.00 USD (Paper Free)</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 rounded-lg text-white font-bold font-mono text-sm shadow-lg transition-all active:scale-98 cursor-pointer ${
              side === 'BUY'
                ? 'bg-[#089981] hover:bg-[#077a67]'
                : 'bg-[#f23645] hover:bg-[#d62837]'
            }`}
          >
            Submit {side} Order ({quantity} {symbol.ticker})
          </button>
        </form>
      </div>
    </div>
  );
};
