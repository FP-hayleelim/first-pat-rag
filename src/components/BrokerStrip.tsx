import React, { useState } from 'react';
import { BROKERS } from '../data/mockMarketData';
import { Broker } from '../types/market';

interface BrokerStripProps {
  onBrokerConnected?: (broker: Broker) => void;
}

export const BrokerStrip: React.FC<BrokerStripProps> = ({ onBrokerConnected }) => {
  const [brokersList, setBrokersList] = useState<Broker[]>(BROKERS);
  const [selectedBroker, setSelectedBroker] = useState<Broker | null>(null);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionSuccess, setConnectionSuccess] = useState(false);

  const handleOpenConnect = (broker: Broker) => {
    setSelectedBroker(broker);
    setConnectionSuccess(false);
    setApiKeyInput('');
  };

  const handleConfirmConnect = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConnecting(true);

    setTimeout(() => {
      setIsConnecting(false);
      setConnectionSuccess(true);
      if (selectedBroker) {
        const updated = brokersList.map((b) =>
          b.id === selectedBroker.id ? { ...b, connected: true } : b
        );
        setBrokersList(updated);
        if (onBrokerConnected) {
          onBrokerConnected({ ...selectedBroker, connected: true });
        }
      }
    }, 700);
  };

  return (
    <section className="w-full bg-[#131722] py-8 px-2 sm:px-4 lg:px-6 border-b border-[#1b1f2b]" id="brokers">
      <div className="max-w-[1440px] mx-auto rounded-xl bg-gradient-to-r from-[#1e222d] via-[#262a35]/60 to-[#1e222d] border border-[#2a2e39] p-5 sm:p-6 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="max-w-xl text-center lg:text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#1b1f2b] text-[11px] font-mono text-[#b6c4ff] uppercase font-bold mb-2 border border-[#2a2e39]">
            <span className="material-symbols-outlined text-[14px] text-[#089981]">
              verified
            </span>
            Direct Execution
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#f0f3fa] tracking-tight">
            Trade directly on Supercharts through supported brokers
          </h3>
          <p className="text-xs sm:text-sm text-[#c3c5d8] mt-1.5 leading-relaxed">
            Enjoy ultra-low latency execution without switching tabs. Verified by over 100M global traders.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
          {brokersList.map((broker) => {
            const isConnected = broker.connected;

            return (
              <div
                key={broker.id}
                className="bg-[#131722] p-3.5 rounded-lg border border-[#2a2e39] flex flex-col items-center text-center hover:bg-[#1b1f2b] hover:border-[#363a45] transition-all shadow-sm"
              >
                <div className="text-sm font-bold text-[#f0f3fa] mb-0.5">
                  {broker.name}
                </div>
                <span className="text-[11px] text-[#787b86] font-mono uppercase">
                  {broker.category}
                </span>

                <div className="flex items-center gap-1 text-amber-400 text-xs my-2 font-semibold font-mono">
                  <span>★ {broker.rating.toFixed(1)}</span>
                  <span className="text-[#787b86] text-[10px] font-sans font-normal">
                    {broker.tag}
                  </span>
                </div>

                <button
                  onClick={() => handleOpenConnect(broker)}
                  className={`mt-1 w-full px-3 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                    isConnected
                      ? 'bg-[#089981]/20 text-[#089981] border border-[#089981]'
                      : broker.id === 'oanda' || broker.id === 'okx'
                      ? 'bg-[#2962ff] hover:bg-[#004ee8] text-white shadow-sm'
                      : 'bg-[#2a2e39] hover:bg-[#363a45] text-[#f0f3fa] border border-[#363a45]'
                  }`}
                >
                  {isConnected ? 'Connected ✓' : broker.id === 'oanda' || broker.id === 'okx' ? 'Open' : 'Connect'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Connect Broker Modal */}
      {selectedBroker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-[#1e222d] border border-[#363a45] rounded-xl p-6 shadow-2xl text-left">
            <div className="flex items-center justify-between pb-3 border-b border-[#2a2e39] mb-4">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded bg-[#2962ff] text-white flex items-center justify-center font-bold text-xs">
                  {selectedBroker.name.charAt(0)}
                </span>
                <div>
                  <h4 className="text-base font-bold text-[#f0f3fa]">
                    Connect {selectedBroker.name}
                  </h4>
                  <span className="text-[11px] text-[#787b86]">{selectedBroker.category}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedBroker(null)}
                className="w-7 h-7 rounded-full bg-[#131722] text-[#787b86] hover:text-white flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            {connectionSuccess ? (
              <div className="text-center py-4 space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#089981]/20 text-[#089981] flex items-center justify-center mx-auto text-2xl">
                  ✓
                </div>
                <h5 className="text-base font-bold text-[#f0f3fa]">
                  {selectedBroker.name} Account Connected!
                </h5>
                <p className="text-xs text-[#c3c5d8]">
                  Ultra-low latency execution channel is now live on Supercharts. You can execute orders directly from the chart canvas.
                </p>
                <button
                  onClick={() => setSelectedBroker(null)}
                  className="w-full py-2 bg-[#089981] text-white rounded text-xs font-semibold cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleConfirmConnect} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#787b86] mb-1 font-semibold">
                    Environment Mode
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      className="py-1.5 px-3 rounded bg-[#2962ff] text-white font-bold"
                    >
                      Demo / Paper Trading
                    </button>
                    <button
                      type="button"
                      className="py-1.5 px-3 rounded bg-[#131722] text-[#787b86] hover:text-white"
                    >
                      Live Production
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[#787b86] mb-1 font-semibold">
                    Account ID / API Key
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. NT-DEMO-9948210"
                    value={apiKeyInput}
                    onChange={(e) => setApiKeyInput(e.target.value)}
                    className="w-full bg-[#131722] border border-[#2a2e39] rounded px-3 py-2 text-[#f0f3fa] font-mono focus:outline-none focus:border-[#2962ff]"
                  />
                  <span className="text-[10px] text-[#787b86] mt-1 block">
                    Zero-credential leakage. Keys are securely stored client-side for execution routing.
                  </span>
                </div>

                <div className="p-3 bg-[#131722] rounded border border-[#2a2e39] space-y-1 text-[#c3c5d8]">
                  <div className="font-semibold text-white">Included Features:</div>
                  {selectedBroker.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px]">
                      <span className="text-[#089981]">✓</span> {feat}
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedBroker(null)}
                    className="px-4 py-2 bg-[#131722] hover:bg-[#2a2e39] text-[#787b86] rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isConnecting}
                    className="px-5 py-2 bg-[#2962ff] hover:bg-[#004ee8] text-white rounded font-bold transition-all cursor-pointer"
                  >
                    {isConnecting ? 'Authenticating...' : 'Connect Broker'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
