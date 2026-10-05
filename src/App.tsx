/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TickerMarquee } from './components/TickerMarquee';
import { Hero } from './components/Hero';
import { Superchart } from './components/Superchart';
import { MarketSummary } from './components/MarketSummary';
import { CommunityIdeas } from './components/CommunityIdeas';
import { MarketMovers } from './components/MarketMovers';
import { BrokerStrip } from './components/BrokerStrip';
import { PineScriptSection } from './components/PineScriptSection';
import { Footer } from './components/Footer';
import { OrderTicketModal } from './components/OrderTicketModal';
import { PositionsDrawer } from './components/PositionsDrawer';
import { SymbolSearchModal } from './components/SymbolSearchModal';
import { SuperchartFullscreenModal } from './components/SuperchartFullscreenModal';
import { TrialModal } from './components/TrialModal';
import { INITIAL_SYMBOLS } from './data/mockMarketData';
import { SymbolInfo, Position, Broker } from './types/market';

export default function App() {
  const [symbols, setSymbols] = useState<Record<string, SymbolInfo>>(INITIAL_SYMBOLS);
  const [activeTicker, setActiveTicker] = useState<string>('BTCUSD');
  const [activeNav, setActiveNav] = useState<string>('products');
  
  // Paper trading positions & account balance
  const [balance, setBalance] = useState<number>(100000);
  const [positions, setPositions] = useState<Position[]>([
    {
      id: 'pos-init-1',
      symbol: 'BTCUSD',
      side: 'BUY',
      entryPrice: 84200.00,
      currentPrice: 85420.50,
      size: 1.5,
      pnl: 1830.75,
      pnlPercent: 1.45,
      takeProfit: 88000,
      stopLoss: 82000,
      openTime: '10:45 AM',
    },
  ]);

  // Pine Script state
  const [pineScriptActive, setPineScriptActive] = useState<boolean>(false);

  // Modal visibility states
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isTrialOpen, setIsTrialOpen] = useState<boolean>(false);
  const [isFullscreenTerminal, setIsFullscreenTerminal] = useState<boolean>(false);
  const [orderModalData, setOrderModalData] = useState<{
    isOpen: boolean;
    side: 'BUY' | 'SELL';
    price: number;
    size: number;
  }>({
    isOpen: false,
    side: 'BUY',
    price: 85420.50,
    size: 2.0,
  });

  // Global keybindings (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Live simulation: Update current prices and recalculate position PnL periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setSymbols((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((t) => {
          const sym = { ...updated[t] };
          const microDelta = (Math.random() - 0.49) * (sym.price * 0.0004);
          sym.price = Number((sym.price + microDelta).toFixed(sym.decimals));
          updated[t] = sym;
        });
        return updated;
      });

      // Recalculate open positions P&L
      setPositions((prev) =>
        prev.map((pos) => {
          const sym = symbols[pos.symbol];
          const curr = sym ? sym.price : pos.currentPrice;
          const pnl = pos.side === 'BUY'
            ? (curr - pos.entryPrice) * pos.size
            : (pos.entryPrice - curr) * pos.size;
          const pnlPercent = ((curr - pos.entryPrice) / pos.entryPrice) * 100 * (pos.side === 'BUY' ? 1 : -1);
          return {
            ...pos,
            currentPrice: curr,
            pnl: Number(pnl.toFixed(2)),
            pnlPercent: Number(pnlPercent.toFixed(2)),
          };
        })
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [symbols]);

  // Order submission
  const handleOpenOrderTicket = (side: 'BUY' | 'SELL', price: number, size: number) => {
    setOrderModalData({
      isOpen: true,
      side,
      price,
      size,
    });
  };

  const handleSubmitOrder = (newPos: Position) => {
    setPositions((prev) => [newPos, ...prev]);
  };

  const handleClosePosition = (posId: string) => {
    const target = positions.find((p) => p.id === posId);
    if (target) {
      setBalance((b) => Number((b + target.pnl).toFixed(2)));
      setPositions((prev) => prev.filter((p) => p.id !== posId));
    }
  };

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentSymbol = symbols[activeTicker] || symbols['BTCUSD'];

  return (
    <div className="min-h-screen bg-[#0f131e] text-[#dfe2f2] font-sans antialiased selection:bg-[#2962ff] selection:text-white">
      {/* 1. Fixed Top Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenTrial={() => setIsTrialOpen(true)}
        onOpenBrokerModal={() => handleNavigateSection('brokers')}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        onNavigateSection={handleNavigateSection}
      />

      {/* 2. Streaming Real-Time Ticker Ribbon */}
      <TickerMarquee
        symbols={symbols}
        onSelectSymbol={(ticker) => {
          setActiveTicker(ticker);
          handleNavigateSection('supercharts');
        }}
        activeTicker={activeTicker}
      />

      {/* 3. Main Page Content (Offset for fixed Header + Ticker) */}
      <main className="w-full pt-22 bg-[#0f131e]">
        <div className="flex flex-col w-full">
          {/* Hero Section */}
          <Hero onGetStarted={() => handleNavigateSection('supercharts')} />

          {/* Supercharged Supercharts Section */}
          <Superchart
            currentSymbol={currentSymbol}
            onOpenOrderTicket={handleOpenOrderTicket}
            onOpenSearch={() => setIsSearchOpen(true)}
            onExpandLayout={() => setIsFullscreenTerminal(true)}
            pineScriptActive={pineScriptActive}
          />

          {/* Market Summary Sparklines Section */}
          <MarketSummary
            symbols={symbols}
            onSelectSymbol={(ticker) => setActiveTicker(ticker)}
            activeTicker={activeTicker}
          />

          {/* Community Ideas Section */}
          <CommunityIdeas
            onSelectSymbol={(ticker) => setActiveTicker(ticker)}
          />

          {/* Market Movers & Active Screeners */}
          <MarketMovers
            onSelectSymbol={(ticker) => {
              setActiveTicker(ticker);
              handleNavigateSection('supercharts');
            }}
          />

          {/* Broker Integration & Execution Strip */}
          <BrokerStrip />

          {/* Pine Script & Algorithmic Strategies Showcase */}
          <PineScriptSection
            pineScriptActive={pineScriptActive}
            onTogglePineScript={() => {
              setPineScriptActive((prev) => !prev);
              handleNavigateSection('supercharts');
            }}
          />
        </div>
      </main>

      {/* 4. Footer */}
      <Footer />

      {/* 5. Dockable Paper Trading Positions Bar */}
      <PositionsDrawer
        positions={positions}
        onClosePosition={handleClosePosition}
        balance={balance}
      />

      {/* 6. Symbol Search Modal (Ctrl+K) */}
      {isSearchOpen && (
        <SymbolSearchModal
          onClose={() => setIsSearchOpen(false)}
          onSelectSymbol={(ticker) => setActiveTicker(ticker)}
          currentTicker={activeTicker}
        />
      )}

      {/* 7. Institutional Order Execution Ticket Modal */}
      {orderModalData.isOpen && (
        <OrderTicketModal
          symbol={currentSymbol}
          initialSide={orderModalData.side}
          initialPrice={orderModalData.price}
          initialSize={orderModalData.size}
          onClose={() => setOrderModalData((prev) => ({ ...prev, isOpen: false }))}
          onSubmitOrder={handleSubmitOrder}
        />
      )}

      {/* 8. Fullscreen Superchart Terminal Modal */}
      {isFullscreenTerminal && (
        <SuperchartFullscreenModal
          currentSymbol={currentSymbol}
          onClose={() => setIsFullscreenTerminal(false)}
          onSelectSymbol={(ticker) => setActiveTicker(ticker)}
          onOpenOrderTicket={handleOpenOrderTicket}
          pineScriptActive={pineScriptActive}
        />
      )}

      {/* 9. Free Trial Signup Modal */}
      {isTrialOpen && (
        <TrialModal onClose={() => setIsTrialOpen(false)} />
      )}
    </div>
  );
}
