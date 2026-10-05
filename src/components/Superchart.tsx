import React, { useState, useEffect, useRef } from 'react';
import { SymbolInfo, Candle } from '../types/market';
import { generateCandles } from '../data/mockMarketData';

interface SuperchartProps {
  currentSymbol: SymbolInfo;
  onOpenOrderTicket: (side: 'BUY' | 'SELL', price: number, size: number) => void;
  onOpenSearch: () => void;
  onExpandLayout: () => void;
  pineScriptActive?: boolean;
}

interface DrawnItem {
  id: string;
  type: 'line' | 'fib' | 'text' | 'rect';
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label?: string;
  color: string;
}

export const Superchart: React.FC<SuperchartProps> = ({
  currentSymbol,
  onOpenOrderTicket,
  onOpenSearch,
  onExpandLayout,
  pineScriptActive = false,
}) => {
  const [timeframe, setTimeframe] = useState<string>('1D');
  const [range, setRange] = useState<string>('YTD');
  const [activeTool, setActiveTool] = useState<string>('crosshair');
  const [orderQuantity, setOrderQuantity] = useState<number>(2.0);
  
  // Indicator toggles
  const [showEMA20, setShowEMA20] = useState<boolean>(true);
  const [showEMA50, setShowEMA50] = useState<boolean>(true);
  const [showRSI, setShowRSI] = useState<boolean>(true);
  const [showVolume, setShowVolume] = useState<boolean>(true);
  const [showFVG, setShowFVG] = useState<boolean>(true);

  // Candlestick data state
  const [candles, setCandles] = useState<Candle[]>([]);
  const [liveCandleTick, setLiveCandleTick] = useState<number>(0);

  // Drawings state
  const [drawings, setDrawings] = useState<DrawnItem[]>([
    {
      id: 'default-trend',
      type: 'line',
      x1: 280,
      y1: 270,
      x2: 880,
      y2: 70,
      color: '#2962ff',
    },
  ]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentDraw, setCurrentDraw] = useState<DrawnItem | null>(null);

  // Crosshair state
  const [crosshairPos, setCrosshairPos] = useState<{ x: number; y: number } | null>(null);
  const [hoveredCandle, setHoveredCandle] = useState<Candle | null>(null);

  // Clock state
  const [utcTime, setUtcTime] = useState<string>('');

  const svgRef = useRef<SVGSVGElement | null>(null);

  // Generate candles whenever symbol or timeframe changes
  useEffect(() => {
    const multiplier = timeframe === '1m' ? 0.003 : timeframe === '5m' ? 0.006 : timeframe === '1h' ? 0.01 : 0.015;
    const generated = generateCandles(currentSymbol.price, 45, multiplier);
    setCandles(generated);
  }, [currentSymbol.ticker, timeframe]);

  // Live price & clock tick
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(
        now.toTimeString().split(' ')[0] + ' (UTC' + (now.getTimezoneOffset() > 0 ? '-' : '+') + Math.abs(now.getTimezoneOffset() / 60) + ')'
      );
    };
    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    // Micro tick simulation on latest candle
    const tickInterval = setInterval(() => {
      setLiveCandleTick((prev) => prev + 1);
      setCandles((prevCandles) => {
        if (!prevCandles.length) return prevCandles;
        const lastIndex = prevCandles.length - 1;
        const last = { ...prevCandles[lastIndex] };
        const delta = (Math.random() - 0.48) * (last.close * 0.0006);
        last.close = Number((last.close + delta).toFixed(2));
        last.high = Math.max(last.high, last.close);
        last.low = Math.min(last.low, last.close);
        const newArr = [...prevCandles];
        newArr[lastIndex] = last;
        return newArr;
      });
    }, 2000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(tickInterval);
    };
  }, []);

  // Compute coordinate geometry
  const width = 1000;
  const height = 480;
  const chartRightPadding = 60;
  const chartBottomPadding = 30;
  const chartWidth = width - chartRightPadding;
  const chartHeight = height - chartBottomPadding;

  const minPrice = candles.length > 0 ? Math.min(...candles.map((c) => c.low)) * 0.985 : 1;
  const maxPrice = candles.length > 0 ? Math.max(...candles.map((c) => c.high)) * 1.015 : 2;
  const priceRange = Math.max(maxPrice - minPrice, 0.0001);

  const getY = (price: number) => {
    return chartHeight - ((price - minPrice) / priceRange) * (chartHeight - 40) - 20;
  };

  const getPriceFromY = (y: number) => {
    const ratio = (chartHeight - 20 - y) / (chartHeight - 40);
    return minPrice + ratio * priceRange;
  };

  // SVG Mouse handlers for drawing & crosshair
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * width;
    const svgY = ((e.clientY - rect.top) / rect.height) * height;

    if (svgX <= chartWidth && svgY <= chartHeight) {
      setCrosshairPos({ x: svgX, y: svgY });

      // Find nearest candle
      const candleWidth = chartWidth / (candles.length || 1);
      const index = Math.floor(svgX / candleWidth);
      if (index >= 0 && index < candles.length) {
        setHoveredCandle(candles[index]);
      }
    } else {
      setCrosshairPos(null);
      setHoveredCandle(null);
    }

    if (isDrawing && currentDraw) {
      setCurrentDraw({
        ...currentDraw,
        x2: svgX,
        y2: svgY,
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    if (activeTool === 'crosshair' || activeTool === 'magnet') return;

    const rect = svgRef.current.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * width;
    const svgY = ((e.clientY - rect.top) / rect.height) * height;

    if (svgX <= chartWidth && svgY <= chartHeight) {
      setIsDrawing(true);
      const newDraw: DrawnItem = {
        id: `draw-${Date.now()}`,
        type: activeTool === 'fib' ? 'fib' : activeTool === 'text' ? 'text' : 'line',
        x1: svgX,
        y1: svgY,
        x2: svgX,
        y2: svgY,
        label: activeTool === 'text' ? 'Support / Retest Zone' : undefined,
        color: activeTool === 'fib' ? '#f59e0b' : '#2962ff',
      };
      setCurrentDraw(newDraw);
    }
  };

  const handleMouseUp = () => {
    if (isDrawing && currentDraw) {
      setDrawings((prev) => [...prev, currentDraw]);
      setCurrentDraw(null);
      setIsDrawing(false);
    }
  };

  const clearDrawings = () => {
    setDrawings([]);
    setCurrentDraw(null);
  };

  // EMA calculations
  const ema20Points = candles.map((c, i) => {
    const x = (i + 0.5) * (chartWidth / candles.length);
    const approxEma = c.close * 0.992;
    const y = getY(approxEma);
    return `${x},${y}`;
  }).join(' ');

  const ema50Points = candles.map((c, i) => {
    const x = (i + 0.5) * (chartWidth / candles.length);
    const approxEma = c.close * 0.975;
    const y = getY(approxEma);
    return `${x},${y}`;
  }).join(' ');

  const currentCandle = candles[candles.length - 1];
  const activePrice = currentCandle ? currentCandle.close : currentSymbol.price;
  const isPositive = currentSymbol.change >= 0;

  return (
    <section className="w-full bg-[#131722] px-2 sm:px-4 lg:px-6 py-6" id="supercharts">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-3">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-1">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-[18px] text-[#2962ff]">
                candlestick_chart
              </span>
              <span className="text-[11px] uppercase text-[#b6c4ff] font-bold tracking-widest font-mono">
                Industry Standard Architecture
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#f0f3fa] tracking-tight">
              Supercharged Supercharts
            </h2>
            <p className="text-xs sm:text-sm text-[#c3c5d8]">
              Explore all features for every level of analysis — ultra-low latency, institutional toolsets.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onExpandLayout}
              className="px-3.5 py-1.5 rounded bg-[#1e222d] hover:bg-[#2a2e39] border border-[#2a2e39] text-[#f0f3fa] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">fullscreen</span>
              Expand Layout
            </button>
            <button
              onClick={onExpandLayout}
              className="px-3.5 py-1.5 rounded bg-[#2962ff] hover:bg-[#004ee8] text-[#f0f3fa] text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">play_circle</span>
              Launch Superchart
            </button>
          </div>
        </div>

        {/* Superchart Terminal Window */}
        <div className="w-full rounded-md bg-[#1e222d] border border-[#2a2e39] shadow-2xl overflow-hidden flex flex-col">
          {/* Top Toolbar / Symbol Ribbon */}
          <div className="min-h-12 bg-[#1e222d] px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-3 border-b border-[#2a2e39]">
            {/* Left Cluster */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Symbol Selector */}
              <button
                onClick={onOpenSearch}
                className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#131722] hover:bg-[#2a2e39] border border-[#2a2e39] transition-colors cursor-pointer group"
                title="Change active symbol"
              >
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-[11px]">
                  {currentSymbol.ticker.charAt(0)}
                </span>
                <span className="font-mono text-xs font-bold text-[#f0f3fa] group-hover:text-[#2962ff]">
                  {currentSymbol.ticker}
                </span>
                <span className="text-[#787b86] text-xs hidden sm:inline font-sans">
                  {currentSymbol.name}
                </span>
                <span className="text-[10px] text-[#787b86] bg-[#1b1f2b] px-1 rounded font-mono">
                  {currentSymbol.exchange}
                </span>
                <span className="material-symbols-outlined text-[14px] text-[#787b86]">
                  arrow_drop_down
                </span>
              </button>

              {/* Price & Change */}
              <div className="flex items-baseline gap-2 font-mono text-xs">
                <span className="text-[#f0f3fa] font-bold text-sm sm:text-base tabular-nums">
                  {activePrice.toLocaleString(undefined, {
                    minimumFractionDigits: currentSymbol.decimals,
                    maximumFractionDigits: currentSymbol.decimals,
                  })}
                </span>
                <span
                  className={`flex items-center font-semibold tabular-nums ${
                    isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {isPositive ? 'arrow_drop_up' : 'arrow_drop_down'}
                  </span>
                  {isPositive ? '+' : ''}
                  {currentSymbol.change.toFixed(2)} ({isPositive ? '+' : ''}
                  {currentSymbol.changePercent.toFixed(2)}%)
                </span>
                <span className="hidden xl:inline text-[#787b86] text-[11px]">
                  H <span className="text-[#dfe2f2]">{currentSymbol.high24h.toLocaleString()}</span>
                </span>
                <span className="hidden xl:inline text-[#787b86] text-[11px]">
                  L <span className="text-[#dfe2f2]">{currentSymbol.low24h.toLocaleString()}</span>
                </span>
                <span className="hidden 2xl:inline text-[#787b86] text-[11px]">
                  Vol <span className="text-[#dfe2f2]">{currentSymbol.volume24h}</span>
                </span>
              </div>

              {/* Timeframe Chips */}
              <div className="hidden lg:flex items-center gap-0.5 bg-[#131722] p-0.5 rounded border border-[#2a2e39]">
                {['1m', '5m', '1h', '4h', '1D', '1W'].map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-2 py-0.5 text-xs font-mono rounded transition-colors cursor-pointer ${
                      timeframe === tf
                        ? 'text-[#f0f3fa] bg-[#2a2e39] font-bold shadow-sm'
                        : 'text-[#787b86] hover:text-[#f0f3fa]'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>

              {/* Active Indicator Toggles */}
              <div className="hidden md:flex items-center gap-1.5 font-mono text-[11px]">
                <button
                  onClick={() => setShowEMA20(!showEMA20)}
                  className={`px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                    showEMA20
                      ? 'bg-[#131722] border-blue-500/40 text-blue-400'
                      : 'bg-[#1e222d] border-transparent text-[#787b86] line-through'
                  }`}
                  title="Toggle EMA 20"
                >
                  EMA 20 <span className="text-[#dfe2f2]">84,210</span>
                </button>
                <button
                  onClick={() => setShowEMA50(!showEMA50)}
                  className={`px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                    showEMA50
                      ? 'bg-[#131722] border-amber-500/40 text-amber-400'
                      : 'bg-[#1e222d] border-transparent text-[#787b86] line-through'
                  }`}
                  title="Toggle EMA 50"
                >
                  EMA 50 <span className="text-[#dfe2f2]">82,450</span>
                </button>
                <button
                  onClick={() => setShowRSI(!showRSI)}
                  className={`px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                    showRSI
                      ? 'bg-[#131722] border-purple-500/40 text-purple-400'
                      : 'bg-[#1e222d] border-transparent text-[#787b86] line-through'
                  }`}
                  title="Toggle RSI 14"
                >
                  RSI 14 <span className="text-[#dfe2f2]">62.4</span>
                </button>
                {pineScriptActive && (
                  <span className="px-2 py-0.5 rounded bg-[#089981]/20 border border-[#089981] text-[#089981] font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#089981] animate-pulse"></span>
                    Pine Script Active
                  </span>
                )}
              </div>
            </div>

            {/* Right Cluster: Quick Order Execution */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-center bg-[#131722] rounded p-0.5 border border-[#2a2e39]">
                <button
                  onClick={() => onOpenOrderTicket('SELL', activePrice - 1.5, orderQuantity)}
                  className="bg-[#f23645] hover:opacity-90 text-white font-mono text-xs font-bold px-3 py-1 rounded flex items-center gap-1 shadow-sm cursor-pointer active:scale-95 transition-all"
                  title="Quick Sell Order"
                >
                  <span>SELL</span>
                  <span className="text-[11px] opacity-90">
                    {(activePrice - 1.5).toFixed(2)}
                  </span>
                </button>
                <div className="px-2 text-[#dfe2f2] text-xs font-mono flex items-center gap-1">
                  <span>{orderQuantity.toFixed(1)}</span>
                  <div className="flex flex-col text-[8px] text-[#787b86] cursor-pointer">
                    <button
                      onClick={() => setOrderQuantity((q) => Number((q + 0.5).toFixed(1)))}
                      className="hover:text-white leading-none"
                    >
                      ▲
                    </button>
                    <button
                      onClick={() =>
                        setOrderQuantity((q) => Math.max(0.1, Number((q - 0.5).toFixed(1))))
                      }
                      className="hover:text-white leading-none"
                    >
                      ▼
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => onOpenOrderTicket('BUY', activePrice + 0.5, orderQuantity)}
                  className="bg-[#089981] hover:opacity-90 text-white font-mono text-xs font-bold px-3 py-1 rounded flex items-center gap-1 shadow-sm cursor-pointer active:scale-95 transition-all"
                  title="Quick Buy Order"
                >
                  <span>BUY</span>
                  <span className="text-[11px] opacity-90">
                    {(activePrice + 0.5).toFixed(2)}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Charting Body (Left Drawing Palette + SVG Canvas) */}
          <div className="relative w-full h-[460px] sm:h-[520px] bg-[#131722] flex overflow-hidden">
            {/* Pinned Left Drawing Palette */}
            <div className="w-12 bg-[#1e222d] shrink-0 flex flex-col items-center py-2 gap-2 border-r border-[#2a2e39] z-20">
              <button
                onClick={() => setActiveTool('crosshair')}
                className={`w-8 h-8 rounded flex items-center justify-center cursor-pointer transition-colors ${
                  activeTool === 'crosshair'
                    ? 'text-white bg-[#2a2e39] ring-1 ring-[#2962ff]'
                    : 'text-[#787b86] hover:text-white hover:bg-[#2a2e39]'
                }`}
                title="Crosshair mode"
              >
                <span className="material-symbols-outlined text-[18px]">adjust</span>
              </button>
              <button
                onClick={() => setActiveTool('line')}
                className={`w-8 h-8 rounded flex items-center justify-center cursor-pointer transition-colors ${
                  activeTool === 'line'
                    ? 'text-white bg-[#2a2e39] ring-1 ring-[#2962ff]'
                    : 'text-[#787b86] hover:text-white hover:bg-[#2a2e39]'
                }`}
                title="Trend Line Drawing (Click & drag on chart)"
              >
                <span className="material-symbols-outlined text-[18px]">show_chart</span>
              </button>
              <button
                onClick={() => setActiveTool('fib')}
                className={`w-8 h-8 rounded flex items-center justify-center cursor-pointer transition-colors ${
                  activeTool === 'fib'
                    ? 'text-white bg-[#2a2e39] ring-1 ring-[#2962ff]'
                    : 'text-[#787b86] hover:text-white hover:bg-[#2a2e39]'
                }`}
                title="Fibonacci Retracement"
              >
                <span className="material-symbols-outlined text-[18px]">reorder</span>
              </button>
              <button
                onClick={() => setActiveTool('draw')}
                className={`w-8 h-8 rounded flex items-center justify-center cursor-pointer transition-colors ${
                  activeTool === 'draw'
                    ? 'text-white bg-[#2a2e39] ring-1 ring-[#2962ff]'
                    : 'text-[#787b86] hover:text-white hover:bg-[#2a2e39]'
                }`}
                title="Brush Drawing"
              >
                <span className="material-symbols-outlined text-[18px]">draw</span>
              </button>
              <button
                onClick={() => setActiveTool('text')}
                className={`w-8 h-8 rounded flex items-center justify-center cursor-pointer transition-colors ${
                  activeTool === 'text'
                    ? 'text-white bg-[#2a2e39] ring-1 ring-[#2962ff]'
                    : 'text-[#787b86] hover:text-white hover:bg-[#2a2e39]'
                }`}
                title="Text Annotation"
              >
                <span className="material-symbols-outlined text-[18px]">title</span>
              </button>
              <button
                onClick={() => setActiveTool('position')}
                className={`w-8 h-8 rounded flex items-center justify-center cursor-pointer transition-colors ${
                  activeTool === 'position'
                    ? 'text-white bg-[#2a2e39] ring-1 ring-[#2962ff]'
                    : 'text-[#787b86] hover:text-white hover:bg-[#2a2e39]'
                }`}
                title="Long/Short Position Tool"
              >
                <span className="material-symbols-outlined text-[18px]">call_made</span>
              </button>
              <button
                onClick={() => setActiveTool('measure')}
                className={`w-8 h-8 rounded flex items-center justify-center cursor-pointer transition-colors ${
                  activeTool === 'measure'
                    ? 'text-white bg-[#2a2e39] ring-1 ring-[#2962ff]'
                    : 'text-[#787b86] hover:text-white hover:bg-[#2a2e39]'
                }`}
                title="Measure Ruler"
              >
                <span className="material-symbols-outlined text-[18px]">straighten</span>
              </button>
              <button
                onClick={() => setActiveTool(activeTool === 'magnet' ? 'crosshair' : 'magnet')}
                className={`w-8 h-8 rounded flex items-center justify-center cursor-pointer transition-colors ${
                  activeTool === 'magnet'
                    ? 'text-[#2962ff] bg-[#2a2e39] ring-1 ring-[#2962ff]'
                    : 'text-[#787b86] hover:text-white hover:bg-[#2a2e39]'
                }`}
                title="Magnet Mode"
              >
                <span className="material-symbols-outlined text-[18px]">all_out</span>
              </button>

              <div className="mt-auto flex flex-col items-center gap-2">
                <button
                  onClick={clearDrawings}
                  className="w-8 h-8 rounded flex items-center justify-center text-[#787b86] hover:text-[#f23645] hover:bg-[#2a2e39] cursor-pointer transition-colors"
                  title="Remove all drawings"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </div>

            {/* Canvas Workspace */}
            <div className="relative flex-1 h-full bg-[#131722] overflow-hidden select-none">
              {/* Grid Watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                <span className="font-extrabold text-[120px] sm:text-[150px] text-[#f0f3fa] tracking-tighter">
                  {currentSymbol.ticker}
                </span>
              </div>

              {/* Hover Crosshair Info Box */}
              {hoveredCandle && (
                <div className="absolute top-2 left-4 z-30 bg-[#1e222d]/90 backdrop-blur border border-[#363a45] px-3 py-1.5 rounded shadow-lg flex items-center gap-3 font-mono text-[11px] text-[#dfe2f2]">
                  <span className="text-[#787b86]">{hoveredCandle.time}</span>
                  <span>O: <strong className="text-white">{hoveredCandle.open}</strong></span>
                  <span>H: <strong className="text-[#089981]">{hoveredCandle.high}</strong></span>
                  <span>L: <strong className="text-[#f23645]">{hoveredCandle.low}</strong></span>
                  <span>C: <strong className="text-white">{hoveredCandle.close}</strong></span>
                  <span>Vol: <strong className="text-blue-400">{hoveredCandle.volume}</strong></span>
                </div>
              )}

              {/* Interactive SVG Candlestick Engine */}
              <svg
                ref={svgRef}
                className="w-full h-full cursor-crosshair"
                preserveAspectRatio="none"
                viewBox={`0 0 ${width} ${height}`}
                onMouseMove={handleMouseMove}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={() => {
                  setCrosshairPos(null);
                  setHoveredCandle(null);
                }}
              >
                <defs>
                  <linearGradient id="volGreenGrad" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#089981" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#089981" stopOpacity="0.1" />
                  </linearGradient>
                  <linearGradient id="volRedGrad" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#f23645" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#f23645" stopOpacity="0.1" />
                  </linearGradient>
                </defs>

                {/* Horizontal Grid Lines */}
                <g stroke="#1b1f2b" strokeDasharray="3,3" strokeWidth="1">
                  <line x1="0" x2={chartWidth} y1="80" y2="80" />
                  <line x1="0" x2={chartWidth} y1="160" y2="160" />
                  <line x1="0" x2={chartWidth} y1="240" y2="240" />
                  <line x1="0" x2={chartWidth} y1="320" y2="320" />
                  <line x1="0" x2={chartWidth} y1="400" y2="400" />
                </g>

                {/* Vertical Date Grid Lines */}
                <g stroke="#1b1f2b" strokeDasharray="3,3" strokeWidth="1">
                  <line x1="150" x2="150" y1="0" y2={chartHeight} />
                  <line x1="320" x2="320" y1="0" y2={chartHeight} />
                  <line x1="490" x2="490" y1="0" y2={chartHeight} />
                  <line x1="660" x2="660" y1="0" y2={chartHeight} />
                  <line x1="830" x2="830" y1="0" y2={chartHeight} />
                </g>

                {/* Fair Value Gap (FVG) / Smart Money Concept Shaded Area */}
                {showFVG && (
                  <g>
                    <rect
                      x="420"
                      y="160"
                      width="180"
                      height="38"
                      fill="#089981"
                      fillOpacity="0.12"
                      stroke="#089981"
                      strokeDasharray="2,2"
                      strokeWidth="1"
                    />
                    <text
                      x="425"
                      y="155"
                      fill="#089981"
                      fontSize="9"
                      fontFamily="sans-serif"
                      fontWeight="bold"
                    >
                      4H FAIR VALUE GAP (FVG)
                    </text>
                  </g>
                )}

                {/* Volume Histogram Bars */}
                {showVolume &&
                  candles.map((candle, i) => {
                    const candleWidth = chartWidth / candles.length;
                    const barWidth = Math.max(candleWidth - 4, 3);
                    const x = i * candleWidth + (candleWidth - barWidth) / 2;
                    const isBull = candle.close >= candle.open;
                    const barHeight = Math.min(100, Math.max(15, (candle.volume / 10000) * 80));
                    const y = chartHeight - barHeight;

                    return (
                      <rect
                        key={`vol-${i}`}
                        x={x}
                        y={y}
                        width={barWidth}
                        height={barHeight}
                        fill={isBull ? 'url(#volGreenGrad)' : 'url(#volRedGrad)'}
                      />
                    );
                  })}

                {/* Indicator: EMA 50 Line (Orange/Amber) */}
                {showEMA50 && (
                  <path
                    d={`M ${ema50Points.replace(/,/g, ' ')}`}
                    fill="none"
                    stroke="#f59e0b"
                    strokeOpacity="0.85"
                    strokeWidth="1.8"
                  />
                )}

                {/* Indicator: EMA 20 Line (Electric Blue) */}
                {showEMA20 && (
                  <path
                    d={`M ${ema20Points.replace(/,/g, ' ')}`}
                    fill="none"
                    stroke="#2962ff"
                    strokeWidth="2.2"
                  />
                )}

                {/* Pine Script Ribbon Custom Indicator (if enabled) */}
                {pineScriptActive && (
                  <path
                    d={`M ${candles
                      .map((c, i) => {
                        const x = (i + 0.5) * (chartWidth / candles.length);
                        const y = getY(c.close * 0.98);
                        return `${x},${y}`;
                      })
                      .join(' ')}`}
                    fill="none"
                    stroke="#089981"
                    strokeWidth="3"
                    strokeDasharray="4,2"
                  />
                )}

                {/* Candlesticks (Wicks + Bodies) */}
                {candles.map((candle, i) => {
                  const candleWidth = chartWidth / candles.length;
                  const xCenter = (i + 0.5) * candleWidth;
                  const bodyWidth = Math.max(candleWidth - 4, 4);
                  const xBody = xCenter - bodyWidth / 2;

                  const isBull = candle.close >= candle.open;
                  const color = isBull ? '#089981' : '#f23645';

                  const yHigh = getY(candle.high);
                  const yLow = getY(candle.low);
                  const yOpen = getY(candle.open);
                  const yClose = getY(candle.close);

                  const bodyTop = Math.min(yOpen, yClose);
                  const bodyHeight = Math.max(Math.abs(yClose - yOpen), 2.5);

                  const isLast = i === candles.length - 1;

                  return (
                    <g key={`candle-${i}`}>
                      {/* Wick */}
                      <line
                        x1={xCenter}
                        x2={xCenter}
                        y1={yHigh}
                        y2={yLow}
                        stroke={color}
                        strokeWidth="1.5"
                      />
                      {/* Body */}
                      <rect
                        x={xBody}
                        y={bodyTop}
                        width={bodyWidth}
                        height={bodyHeight}
                        fill={color}
                        className={isLast ? 'transition-all duration-150' : ''}
                      />
                      {/* Pulse marker on last candle */}
                      {isLast && (
                        <circle
                          cx={xCenter}
                          cy={yClose}
                          r="4"
                          fill="#2962ff"
                          className="animate-ping opacity-75"
                        />
                      )}
                    </g>
                  );
                })}

                {/* User Drawings */}
                {drawings.map((draw) => {
                  if (draw.type === 'line') {
                    return (
                      <line
                        key={draw.id}
                        x1={draw.x1}
                        y1={draw.y1}
                        x2={draw.x2}
                        y2={draw.y2}
                        stroke={draw.color}
                        strokeWidth="2"
                      />
                    );
                  }
                  if (draw.type === 'fib') {
                    const levels = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];
                    const dy = draw.y2 - draw.y1;
                    return (
                      <g key={draw.id}>
                        {levels.map((lvl) => {
                          const yLevel = draw.y1 + dy * lvl;
                          return (
                            <g key={lvl}>
                              <line
                                x1={draw.x1}
                                x2={chartWidth}
                                y1={yLevel}
                                y2={yLevel}
                                stroke="#f59e0b"
                                strokeDasharray="3,3"
                                strokeWidth="1"
                              />
                              <text
                                x={draw.x1 + 5}
                                y={yLevel - 3}
                                fill="#f59e0b"
                                fontSize="9"
                                fontFamily="monospace"
                              >
                                {lvl.toFixed(3)} ({(minPrice + (1 - lvl) * priceRange).toFixed(1)})
                              </text>
                            </g>
                          );
                        })}
                      </g>
                    );
                  }
                  if (draw.type === 'text') {
                    return (
                      <text
                        key={draw.id}
                        x={draw.x1}
                        y={draw.y1}
                        fill="#2962ff"
                        fontSize="12"
                        fontWeight="bold"
                        fontFamily="sans-serif"
                      >
                        {draw.label}
                      </text>
                    );
                  }
                  return null;
                })}

                {/* Current Drawing in progress */}
                {currentDraw && (
                  <line
                    x1={currentDraw.x1}
                    y1={currentDraw.y1}
                    x2={currentDraw.x2}
                    y2={currentDraw.y2}
                    stroke="#2962ff"
                    strokeWidth="2"
                    strokeDasharray="4,4"
                  />
                )}

                {/* Current Live Price Line (Horizontal dashed across chart) */}
                <line
                  x1="0"
                  x2={chartWidth}
                  y1={getY(activePrice)}
                  y2={getY(activePrice)}
                  stroke="#2962ff"
                  strokeDasharray="4,4"
                  strokeWidth="1.5"
                />

                {/* Interactive Crosshair Lines */}
                {crosshairPos && (
                  <g pointerEvents="none">
                    <line
                      x1="0"
                      x2={chartWidth}
                      y1={crosshairPos.y}
                      y2={crosshairPos.y}
                      stroke="#8d90a2"
                      strokeDasharray="3,3"
                      strokeWidth="1"
                    />
                    <line
                      x1={crosshairPos.x}
                      x2={crosshairPos.x}
                      y1="0"
                      y2={chartHeight}
                      stroke="#8d90a2"
                      strokeDasharray="3,3"
                      strokeWidth="1"
                    />
                  </g>
                )}
              </svg>

              {/* Price Scale Sidebar (Y-Axis) */}
              <div className="absolute top-0 right-0 w-[60px] h-full bg-[#1e222d] border-l border-[#2a2e39] flex flex-col justify-between py-3 font-mono text-[10px] text-[#787b86] select-none text-right pr-2">
                <span>{(maxPrice).toFixed(1)}</span>
                <span>{(maxPrice - priceRange * 0.2).toFixed(1)}</span>

                {/* Current Price Tag Pill */}
                <div
                  className="absolute right-0 bg-[#2962ff] text-white px-2 py-0.5 rounded-l font-bold text-[10px] shadow-md flex items-center transition-all duration-200"
                  style={{ top: `${Math.max(10, Math.min(getY(activePrice) - 10, chartHeight - 20))}px` }}
                >
                  {activePrice.toFixed(1)}
                </div>

                <span>{(maxPrice - priceRange * 0.4).toFixed(1)}</span>
                <span>{(maxPrice - priceRange * 0.6).toFixed(1)}</span>
                <span>{(maxPrice - priceRange * 0.8).toFixed(1)}</span>
                <span>{(minPrice).toFixed(1)}</span>
                <span className="text-[#f0f3fa] font-semibold">{currentSymbol.currency}</span>
              </div>

              {/* Chart Annotation Pill: BOS + FVG */}
              <div className="absolute top-1/4 left-1/3 bg-[#2a2e39]/90 border border-[#363a45] px-2.5 py-1 rounded shadow-md flex items-center gap-1.5 pointer-events-none">
                <span className="w-1.5 h-1.5 rounded-full bg-[#089981] animate-pulse"></span>
                <span className="text-[10px] text-[#f0f3fa] uppercase tracking-wide font-bold">
                  Break of Structure (BOS) + Fair Value Gap Fill
                </span>
              </div>
            </div>
          </div>

          {/* Chart Bottom Range Bar */}
          <div className="min-h-9 bg-[#1e222d] border-t border-[#2a2e39] px-3 sm:px-4 py-1.5 flex flex-wrap items-center justify-between text-[#787b86] font-mono text-[11px]">
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-[#f0f3fa] font-semibold font-sans">Range:</span>
              {['1D', '5D', '1M', '3M', '6M', 'YTD', '1Y', '5Y', 'ALL'].map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                    range === r
                      ? 'text-[#f0f3fa] font-bold bg-[#131722]'
                      : 'hover:text-[#f0f3fa]'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#089981]"></span>
                {utcTime || '17:00:00 (UTC-4)'}
              </span>
              <span className="hover:text-[#f0f3fa] cursor-pointer">
                % Log Auto
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
