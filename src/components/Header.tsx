import React, { useState } from 'react';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenTrial: () => void;
  onOpenBrokerModal: () => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenTrial,
  onOpenBrokerModal,
  activeNav,
  setActiveNav,
  onNavigateSection,
}) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'products', label: 'Products', target: 'supercharts' },
    { id: 'community', label: 'Community', target: 'community' },
    { id: 'markets', label: 'Markets', target: 'market-summary' },
    { id: 'brokers', label: 'Brokers', target: 'brokers' },
    { id: 'news', label: 'News', target: 'pine-script' },
    { id: 'more', label: 'More', target: 'supercharts' },
  ];

  const handleNavClick = (id: string, target?: string) => {
    setActiveNav(id);
    setMobileMenuOpen(false);
    if (target && onNavigateSection) {
      onNavigateSection(target);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1e222d] shadow-[0_1px_8px_rgba(0,0,0,0.45)] border-b border-[#2a2e39]">
      <div className="h-14 w-full px-3 sm:px-4 flex items-center justify-between gap-3">
        {/* Left Cluster: Logo, Search, Nav links */}
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('products', 'supercharts')}
            className="flex items-center gap-2 text-left cursor-pointer focus:outline-none"
          >
            <img
              alt="TradingView Logo"
              className="h-7 sm:h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1U7q57GbknQWsbM2S3wY6r6eLVxbVxQ1_-ahnzXoRwQX1EpidZLSft8KxIVKyvJ84O6_AaUCNZdAm20JvqbQA4hLBM4nJpOZhjGaTc90ywZD4JJ9bF8k18C0Vjpky6QgXoGkJf7v_bVn_ydqWMtZ-W9ezO_1mcD7yZ4Wk2WE_zeGGik9Ibs6HpPsuKL-SYLB4GmWdGDE82VGbHkKaDiV44nLG7jeOIynKDAibR0bK-Za0lhd2nHLkjI1USi"
            />
            <span className="text-lg font-bold text-[#f0f3fa] tracking-tight hidden sm:inline-block">
              TradingView
            </span>
          </button>

          {/* Quick Search Button with Ctrl+K */}
          <button
            onClick={onOpenSearch}
            className="flex items-center justify-between gap-2.5 bg-[#131722] px-3 py-1.5 rounded text-[#787b86] hover:text-[#f0f3fa] hover:bg-[#2a2e39] border border-[#2a2e39] transition-all cursor-pointer shadow-inner"
            title="Search markets, symbols, ideas (Ctrl+K)"
          >
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">search</span>
              <span className="text-xs sm:text-sm hidden md:inline font-normal">Search markets, symbols, ideas</span>
              <span className="text-xs md:hidden font-normal">Search</span>
            </div>
            <kbd className="hidden lg:inline-flex items-center bg-[#262a35] px-1.5 py-0.5 rounded text-[#c3c5d8] text-[11px] font-mono border border-[#363a45]">
              Ctrl+K
            </kbd>
          </button>

          {/* Primary Nav Links */}
          <nav className="hidden xl:flex items-center gap-5 text-sm">
            {navItems.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id, item.target)}
                  className={`transition-colors py-1 cursor-pointer font-medium ${
                    isActive
                      ? 'text-[#f0f3fa] font-bold border-b-2 border-[#2962ff]'
                      : 'text-[#c3c5d8] hover:text-[#f0f3fa]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Cluster: Market status, Lang, Mode, Notifs, Free trial, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Markets Open Pill */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#171b26] border border-[#2a2e39]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#089981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#089981]"></span>
            </span>
            <span className="text-[11px] text-[#089981] uppercase font-bold tracking-wider">
              Markets Open
            </span>
          </div>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1 text-[#c3c5d8] hover:text-[#f0f3fa] text-xs px-2 py-1 rounded hover:bg-[#2a2e39] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">language</span>
              <span className="font-medium">{selectedLang}</span>
            </button>
            {isLangOpen && (
              <div className="absolute right-0 mt-1 w-32 bg-[#1e222d] border border-[#363a45] rounded shadow-xl py-1 z-50 font-sans text-xs">
                {['EN', 'ES', 'DE', 'JA', 'FR', 'ZH'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setSelectedLang(lang);
                      setIsLangOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-[#2a2e39] transition-colors flex items-center justify-between ${
                      selectedLang === lang ? 'text-[#2962ff] font-bold' : 'text-[#f0f3fa]'
                    }`}
                  >
                    <span>{lang}</span>
                    {selectedLang === lang && <span className="material-symbols-outlined text-[14px]">check</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dark / Light Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="text-[#c3c5d8] hover:text-[#f0f3fa] p-1.5 rounded hover:bg-[#2a2e39] transition-colors cursor-pointer"
            title="Toggle color theme"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isDarkMode ? 'dark_mode' : 'light_mode'}
            </span>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="text-[#c3c5d8] hover:text-[#f0f3fa] p-1.5 rounded hover:bg-[#2a2e39] transition-colors cursor-pointer relative"
              title="Notifications"
            >
              <span className="material-symbols-outlined text-[18px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#2962ff] rounded-full ring-2 ring-[#1e222d]"></span>
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-[#1e222d] border border-[#363a45] rounded-md shadow-2xl p-3 z-50 text-xs">
                <div className="flex items-center justify-between border-b border-[#2a2e39] pb-2 mb-2">
                  <span className="font-bold text-[#f0f3fa]">Notifications</span>
                  <button 
                    onClick={() => setIsNotificationsOpen(false)}
                    className="text-[#787b86] hover:text-white"
                  >
                    Clear all
                  </button>
                </div>
                <div className="space-y-2">
                  <div className="p-2 rounded bg-[#131722] hover:bg-[#262a35] cursor-pointer transition-colors">
                    <div className="flex items-center justify-between text-[#089981] font-semibold text-[11px]">
                      <span>BTCUSD Price Alert</span>
                      <span>5m ago</span>
                    </div>
                    <p className="text-[#dfe2f2] text-xs mt-0.5">Bitcoin crossed above $85,000 resistance level.</p>
                  </div>
                  <div className="p-2 rounded bg-[#131722] hover:bg-[#262a35] cursor-pointer transition-colors">
                    <div className="flex items-center justify-between text-[#2962ff] font-semibold text-[11px]">
                      <span>Idea Mention</span>
                      <span>1h ago</span>
                    </div>
                    <p className="text-[#dfe2f2] text-xs mt-0.5">Roman_Pavelko published a new setup on BTC wave 2.</p>
                  </div>
                  <div className="p-2 rounded bg-[#131722] hover:bg-[#262a35] cursor-pointer transition-colors">
                    <div className="flex items-center justify-between text-[#f59e0b] font-semibold text-[11px]">
                      <span>Earnings Alert</span>
                      <span>3h ago</span>
                    </div>
                    <p className="text-[#dfe2f2] text-xs mt-0.5">NVIDIA reports quarterly earnings on Thursday.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Start Free Trial Button */}
          <button
            onClick={onOpenTrial}
            className="bg-[#2962ff] hover:bg-[#004ee8] text-[#f0f3fa] text-xs font-semibold px-3 sm:px-4 py-1.5 rounded transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer whitespace-nowrap hidden sm:inline-block"
          >
            Start free trial
          </button>

          {/* Profile Avatar */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-8 h-8 rounded-full bg-[#2962ff] flex items-center justify-center text-white font-bold cursor-pointer hover:ring-2 hover:ring-[#b6c4ff] transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[#1e222d] border border-[#363a45] rounded-md shadow-2xl py-2 z-50 text-xs">
                <div className="px-3 py-2 border-b border-[#2a2e39]">
                  <p className="font-bold text-[#f0f3fa]">Pro Trader</p>
                  <p className="text-[#787b86] text-[11px]">trader@tradingview.demo</p>
                </div>
                <div className="py-1">
                  <button 
                    onClick={() => { onOpenBrokerModal(); setIsProfileOpen(false); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-[#2a2e39] text-[#dfe2f2] flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">account_balance_wallet</span>
                    Paper Trading Account
                  </button>
                  <button 
                    onClick={() => { handleNavClick('products', 'supercharts'); setIsProfileOpen(false); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-[#2a2e39] text-[#dfe2f2] flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">candlestick_chart</span>
                    My Charts & Layouts
                  </button>
                  <button 
                    onClick={() => { handleNavClick('community', 'community'); setIsProfileOpen(false); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-[#2a2e39] text-[#dfe2f2] flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">group</span>
                    Published Ideas (4)
                  </button>
                </div>
                <div className="border-t border-[#2a2e39] pt-1">
                  <button 
                    onClick={() => { onOpenTrial(); setIsProfileOpen(false); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-[#2a2e39] text-[#2962ff] font-semibold flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">star</span>
                    Upgrade to Premium
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-1.5 text-[#c3c5d8] hover:text-white"
          >
            <span className="material-symbols-outlined text-[22px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#1e222d] border-t border-[#2a2e39] px-4 py-3 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id, item.target)}
              className="block w-full text-left py-2 text-sm text-[#dfe2f2] hover:text-[#2962ff] font-medium"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-[#2a2e39] flex justify-between items-center">
            <button
              onClick={() => { onOpenTrial(); setMobileMenuOpen(false); }}
              className="w-full bg-[#2962ff] text-white py-2 rounded text-center font-semibold text-xs"
            >
              Start free trial
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
