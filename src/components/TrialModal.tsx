import React, { useState } from 'react';

interface TrialModalProps {
  onClose: () => void;
}

export const TrialModal: React.FC<TrialModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<'pro' | 'pro_plus' | 'premium'>('pro_plus');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const plans = [
    {
      id: 'pro',
      name: 'Essential',
      price: '$12.95',
      features: ['5 indicators per chart', '2 charts in one layout', '20 server alerts', 'Ad-free experience'],
    },
    {
      id: 'pro_plus',
      name: 'Plus',
      price: '$24.95',
      badge: 'Most Popular',
      features: ['10 indicators per chart', '4 charts in one layout', '100 server alerts', '10 saved chart layouts', 'Volume profile indicators'],
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$49.95',
      features: ['25 indicators per chart', '8 charts in one layout', '400 server alerts', 'Unlimited chart layouts', 'Seconds-based intervals'],
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-2xl bg-[#1e222d] border border-[#363a45] rounded-xl shadow-2xl p-6 text-left relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#131722] text-[#787b86] hover:text-white flex items-center justify-center cursor-pointer"
        >
          ✕
        </button>

        {isSubmitted ? (
          <div className="text-center py-10 space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#089981]/20 text-[#089981] flex items-center justify-center mx-auto text-3xl font-bold">
              ✓
            </div>
            <h3 className="text-xl font-bold text-white">Your 30-Day Free Trial is Live!</h3>
            <p className="text-xs text-[#c3c5d8]">
              Welcome to TradingView Pro. Institutional charting, real-time indicators, and unlimited layouts are activated.
            </p>
          </div>
        ) : (
          <div>
            <div className="text-center mb-6">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#2962ff] bg-[#131722] px-2.5 py-1 rounded border border-[#2a2e39]">
                Zero Risk · No Credit Card Needed
              </span>
              <h3 className="text-2xl font-bold text-[#f0f3fa] mt-2">
                Start your 30-day free trial
              </h3>
              <p className="text-xs text-[#787b86] mt-1">
                Explore Supercharts, unlimited indicators, and custom Pine Script execution.
              </p>
            </div>

            {/* Plan selection */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {plans.map((p) => {
                const isSelected = selectedPlan === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => setSelectedPlan(p.id as any)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#2962ff]/10 border-[#2962ff] ring-1 ring-[#2962ff]'
                        : 'bg-[#131722] border-[#2a2e39] hover:border-[#363a45]'
                    }`}
                  >
                    <div>
                      {p.badge && (
                        <span className="text-[9px] font-bold text-[#2962ff] bg-[#2962ff]/20 px-2 py-0.5 rounded uppercase mb-2 inline-block">
                          {p.badge}
                        </span>
                      )}
                      <h4 className="font-bold text-white text-sm">{p.name}</h4>
                      <div className="font-mono text-lg font-bold text-[#f0f3fa] mt-1">
                        {p.price}
                        <span className="text-[10px] text-[#787b86] font-normal">/mo</span>
                      </div>
                    </div>

                    <ul className="mt-4 space-y-1.5 text-[11px] text-[#c3c5d8]">
                      {p.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <span className="text-[#089981]">✓</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            {/* Email form */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-[#131722] border border-[#2a2e39] rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#2962ff]"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#2962ff] hover:bg-[#004ee8] text-white font-bold text-xs rounded-lg transition-colors cursor-pointer whitespace-nowrap shadow-md"
              >
                Claim 30 Days Free
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
