import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0a0e19] text-[#787b86] pt-12 pb-16 border-t border-[#1b1f2b]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {/* Brand column */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <img
              alt="TradingView Logo"
              className="h-6 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1U7q57GbknQWsbM2S3wY6r6eLVxbVxQ1_-ahnzXoRwQX1EpidZLSft8KxIVKyvJ84O6_AaUCNZdAm20JvqbQA4hLBM4nJpOZhjGaTc90ywZD4JJ9bF8k18C0Vjpky6QgXoGkJf7v_bVn_ydqWMtZ-W9ezO_1mcD7yZ4Wk2WE_zeGGik9Ibs6HpPsuKL-SYLB4GmWdGDE82VGbHkKaDiV44nLG7jeOIynKDAibR0bK-Za0lhd2nHLkjI1USi"
            />
            <span className="text-lg font-bold text-[#f0f3fa]">TradingView</span>
          </div>
          <p className="text-xs text-[#c3c5d8] mb-4 leading-relaxed">
            Look first / Then leap. High-conviction charting and market intelligence designed for traders of all levels.
          </p>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1b1f2b] text-[#c3c5d8] text-[11px] font-mono border border-[#2a2e39]">
            <span className="material-symbols-outlined text-[14px] text-[#089981]">verified</span>
            <span>Made by humans</span>
          </div>
        </div>

        {/* Products */}
        <div>
          <h4 className="text-xs font-bold text-[#f0f3fa] uppercase tracking-wider mb-3">
            Products
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <a href="#supercharts" className="hover:text-white transition-colors">
                Supercharts
              </a>
            </li>
            <li>
              <a href="#market-summary" className="hover:text-white transition-colors">
                Stock Screener
              </a>
            </li>
            <li>
              <a href="#market-summary" className="hover:text-white transition-colors">
                Crypto Heatmaps
              </a>
            </li>
            <li>
              <a href="#market-summary" className="hover:text-white transition-colors">
                Economic Calendar
              </a>
            </li>
            <li>
              <a href="#supercharts" className="hover:text-white transition-colors">
                Desktop App
              </a>
            </li>
          </ul>
        </div>

        {/* Community */}
        <div>
          <h4 className="text-xs font-bold text-[#f0f3fa] uppercase tracking-wider mb-3">
            Community
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <a href="#community" className="hover:text-white transition-colors">
                Trading Ideas
              </a>
            </li>
            <li>
              <a href="#pine-script" className="hover:text-white transition-colors">
                Pine Script Library
              </a>
            </li>
            <li>
              <a href="#community" className="hover:text-white transition-colors">
                Community Live Streams
              </a>
            </li>
            <li>
              <a href="#community" className="hover:text-white transition-colors">
                House Rules
              </a>
            </li>
            <li>
              <a href="#community" className="hover:text-white transition-colors">
                Moderators
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-xs font-bold text-[#f0f3fa] uppercase tracking-wider mb-3">
            Company
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Media Kit
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Blog & Insights
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Pricing
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div className="col-span-2 sm:col-span-1">
          <h4 className="text-xs font-bold text-[#f0f3fa] uppercase tracking-wider mb-3">
            Legal
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Security & Encryption
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Market Data Disclaimer
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Sub-footer */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-8 mt-8 border-t border-[#1b1f2b] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#787b86]">
        <p>© 2024 TradingView, Inc. All financial data provided for informational purposes only.</p>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#089981]"></span>
            Operational
          </span>
          <span className="hover:text-white cursor-pointer">Status</span>
        </div>
      </div>
    </footer>
  );
};
