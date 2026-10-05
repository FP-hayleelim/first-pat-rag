import React, { useState } from 'react';

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  const [showSpaceModal, setShowSpaceModal] = useState(false);

  return (
    <section className="relative w-full overflow-hidden bg-[#0f131e] py-14 lg:py-20 px-3 sm:px-6 flex flex-col items-center text-center">
      {/* Radial brand backdrop glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(41,98,255,0.22),rgba(15,19,30,0))] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#f0f3fa] tracking-tight max-w-3xl leading-tight">
          Where the world does markets
        </h1>

        <p className="mt-4 text-base sm:text-lg text-[#c3c5d8] max-w-xl">
          Join 100 million traders and investors taking the future into their own hands.
        </p>

        {/* CTA cluster */}
        <div className="mt-8 flex flex-col items-center gap-2">
          <button
            onClick={onGetStarted}
            className="inline-flex items-center justify-center px-8 py-3.5 rounded bg-[#f0f3fa] text-[#0a0e19] text-base font-bold hover:bg-[#dfe2f2] transition-all duration-200 transform hover:-translate-y-0.5 shadow-xl shadow-black/50 active:scale-98 cursor-pointer"
          >
            Get started for free
          </button>
          <span className="text-xs text-[#787b86]">
            $0 forever, no credit card needed
          </span>
        </div>

        {/* Astronaut Space Story Badge */}
        <button
          onClick={() => setShowSpaceModal(true)}
          className="mt-10 group inline-flex items-center gap-3 bg-[#262a35]/80 hover:bg-[#2a2e39] border border-[#363a45] px-4 py-2 rounded-full transition-all duration-200 shadow-md cursor-pointer text-left"
        >
          <img
            className="w-9 h-9 rounded-full object-cover shadow-sm ring-1 ring-[#363a45]"
            alt="Astronaut Scott Kidd Poteet"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaACyJyTxN-xhGkzxvKzzolynXghIIj5gagJsgPsExzo63h7KzJ8xF2Dw8oDEMjlfH6Dp2v6wALFmlPSOug03OsfXiu4penXirGB4D_AoD30Hbv4ND0GN_t1Tx0l0XLTgQ3Py6cNlm5PszvShHHknGI2s3co4Omzm5-sgb4khht28s8OZLZqIAqe84ZODA0O1oh3br8hn2GeafyADFRcwMntEk0jNwJaQmaWkDMjTpH0UsShzjFz9XGg"
          />
          <div className="font-sans leading-tight pr-1">
            <div className="text-[#f0f3fa] text-xs sm:text-sm font-semibold flex items-center gap-1">
              See our space story
              <span className="material-symbols-outlined text-[14px] text-[#787b86] group-hover:translate-x-0.5 group-hover:text-[#f0f3fa] transition-transform">
                arrow_forward_ios
              </span>
            </div>
            <div className="text-[#787b86] text-[11px]">With astronaut Scott "Kidd" Poteet</div>
          </div>
        </button>
      </div>

      {/* Space Story Modal */}
      {showSpaceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#1e222d] border border-[#363a45] rounded-xl shadow-2xl overflow-hidden text-left">
            <div className="relative h-56 sm:h-64 bg-gradient-to-t from-[#1e222d] to-black overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaACyJyTxN-xhGkzxvKzzolynXghIIj5gagJsgPsExzo63h7KzJ8xF2Dw8oDEMjlfH6Dp2v6wALFmlPSOug03OsfXiu4penXirGB4D_AoD30Hbv4ND0GN_t1Tx0l0XLTgQ3Py6cNlm5PszvShHHknGI2s3co4Omzm5-sgb4khht28s8OZLZqIAqe84ZODA0O1oh3br8hn2GeafyADFRcwMntEk0jNwJaQmaWkDMjTpH0UsShzjFz9XGg"
                alt="Scott Kidd Poteet"
                className="w-full h-full object-cover opacity-80"
              />
              <button
                onClick={() => setShowSpaceModal(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#2962ff] bg-[#131722]/80 px-2 py-0.5 rounded">
                  Polaris Dawn Mission
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  Trading from 1,400km Above Earth
                </h3>
              </div>
            </div>

            <div className="p-6 space-y-4 text-sm text-[#dfe2f2]">
              <p>
                Astronaut and mission pilot <strong>Scott "Kidd" Poteet</strong> made history on the groundbreaking Polaris Dawn mission. Flying higher into orbit than any human since Apollo, Kidd relied on high-reliability systems and extreme mental fortitude.
              </p>
              <div className="grid grid-cols-3 gap-3 p-3 bg-[#131722] rounded-lg border border-[#2a2e39] text-center font-mono">
                <div>
                  <div className="text-[#787b86] text-[10px] uppercase font-sans">Apogee Altitude</div>
                  <div className="text-[#f0f3fa] font-bold text-base">1,400.7 km</div>
                </div>
                <div>
                  <div className="text-[#787b86] text-[10px] uppercase font-sans">Orbital Speed</div>
                  <div className="text-[#089981] font-bold text-base">27,500 km/h</div>
                </div>
                <div>
                  <div className="text-[#787b86] text-[10px] uppercase font-sans">Global Traders</div>
                  <div className="text-[#2962ff] font-bold text-base">100M+</div>
                </div>
              </div>
              <p className="text-xs text-[#787b86]">
                "Whether piloting spacecraft or managing high-conviction market positions, ruthless precision and clarity of data are everything."
              </p>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setShowSpaceModal(false)}
                  className="px-5 py-2 rounded bg-[#2962ff] hover:bg-[#004ee8] text-white font-semibold text-xs cursor-pointer"
                >
                  Close Story
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
