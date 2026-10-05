import React, { useState } from 'react';
import { COMMUNITY_IDEAS } from '../data/mockMarketData';
import { CommunityIdea } from '../types/market';

interface CommunityIdeasProps {
  onSelectSymbol: (ticker: string) => void;
}

export const CommunityIdeas: React.FC<CommunityIdeasProps> = ({ onSelectSymbol }) => {
  const [activeTab, setActiveTab] = useState<'editors' | 'popular' | 'video'>('editors');
  const [ideas, setIdeas] = useState<CommunityIdea[]>(COMMUNITY_IDEAS);
  const [selectedIdea, setSelectedIdea] = useState<CommunityIdea | null>(null);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [newComment, setNewComment] = useState<string>('');
  const [commentsList, setCommentsList] = useState<Record<string, string[]>>({
    'idea-1': [
      'Very clean wave 1 termination. What is your stop level?',
      'Watching the 0.618 golden pocket closely here.',
    ],
    'idea-4': ['Spot on FVG analysis, entered on the 4H retest.'],
  });

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isCurrentlyLiked = !!likedMap[id];
    setLikedMap((prev) => ({ ...prev, [id]: !isCurrentlyLiked }));
    setIdeas((prev) =>
      prev.map((idea) =>
        idea.id === id
          ? { ...idea, likes: isCurrentlyLiked ? idea.likes - 1 : idea.likes + 1 }
          : idea
      )
    );
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIdea || !newComment.trim()) return;

    setCommentsList((prev) => ({
      ...prev,
      [selectedIdea.id]: [...(prev[selectedIdea.id] || []), newComment.trim()],
    }));

    setIdeas((prev) =>
      prev.map((idea) =>
        idea.id === selectedIdea.id ? { ...idea, comments: idea.comments + 1 } : idea
      )
    );

    setNewComment('');
  };

  // Sort based on active tab
  const displayedIdeas = [...ideas].sort((a, b) => {
    if (activeTab === 'popular') return b.likes - a.likes;
    if (activeTab === 'video') return a.title.localeCompare(b.title);
    return 0; // editors' picks
  });

  return (
    <section className="w-full bg-[#131722] py-8 px-2 sm:px-4 lg:px-6 border-b border-[#1b1f2b]" id="community">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-4">
        {/* Section Title & Subnavigation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-2 border-b border-[#1e222d]">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#f0f3fa]">
              Community ideas
            </h3>
            <p className="text-xs sm:text-sm text-[#787b86]">
              High-conviction setups, Elliott wave patterns, and smart money concepts shared by real market traders.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-[#1e222d] p-1 rounded-md border border-[#2a2e39]">
              <button
                onClick={() => setActiveTab('editors')}
                className={`px-3 py-1 rounded text-xs font-semibold cursor-pointer transition-colors ${
                  activeTab === 'editors'
                    ? 'bg-[#2a2e39] text-[#f0f3fa] shadow-sm'
                    : 'text-[#787b86] hover:text-[#f0f3fa]'
                }`}
              >
                Editors' picks
              </button>
              <button
                onClick={() => setActiveTab('popular')}
                className={`px-3 py-1 rounded text-xs font-semibold cursor-pointer transition-colors ${
                  activeTab === 'popular'
                    ? 'bg-[#2a2e39] text-[#f0f3fa] shadow-sm'
                    : 'text-[#787b86] hover:text-[#f0f3fa]'
                }`}
              >
                Popular
              </button>
              <button
                onClick={() => setActiveTab('video')}
                className={`px-3 py-1 rounded text-xs font-semibold cursor-pointer transition-colors ${
                  activeTab === 'video'
                    ? 'bg-[#2a2e39] text-[#f0f3fa] shadow-sm'
                    : 'text-[#787b86] hover:text-[#f0f3fa]'
                }`}
              >
                Video ideas
              </button>
            </div>

            <button
              onClick={() => setActiveTab('popular')}
              className="text-[#2962ff] hover:underline text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              See all ideas
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Idea Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayedIdeas.map((idea) => {
            const isLiked = !!likedMap[idea.id];
            const isLong = idea.type === 'Long';

            return (
              <div
                key={idea.id}
                onClick={() => setSelectedIdea(idea)}
                className="bg-[#1e222d] rounded-lg overflow-hidden flex flex-col border border-[#2a2e39] hover:border-[#363a45] hover:bg-[#262a35] transition-all duration-200 group cursor-pointer shadow-md hover:-translate-y-1"
              >
                {/* Image preview */}
                <div className="relative w-full h-44 bg-[#1b1f2b] overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    alt={idea.alt}
                    src={idea.image}
                    referrerPolicy="no-referrer"
                  />
                  {/* Position Pill */}
                  <span
                    className={`absolute top-2.5 right-2.5 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-md ${
                      isLong ? 'bg-[#089981]' : 'bg-[#f23645]'
                    }`}
                  >
                    {idea.type}
                  </span>
                  {/* Symbol Tag */}
                  <span className="absolute bottom-2.5 left-2.5 bg-[#1e222d]/90 text-[#f0f3fa] font-mono text-[10px] px-1.5 py-0.5 rounded backdrop-blur border border-[#363a45]">
                    {idea.symbol}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-3.5 flex flex-col flex-1 justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-semibold text-[#f0f3fa] group-hover:text-[#2962ff] transition-colors line-clamp-1">
                      {idea.title}
                    </h4>
                    <p className="text-xs text-[#787b86] line-clamp-2 mt-1 leading-relaxed">
                      {idea.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#2a2e39] font-mono text-xs text-[#787b86]">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-[#2a2e39] text-[#2962ff] flex items-center justify-center font-bold text-[10px]">
                        {idea.authorInitials}
                      </div>
                      <span className="text-[#f0f3fa] text-xs truncate max-w-[95px] font-sans">
                        {idea.author}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => handleLike(idea.id, e)}
                        className={`flex items-center gap-0.5 cursor-pointer transition-colors ${
                          isLiked ? 'text-[#f23645]' : 'hover:text-[#f0f3fa]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          {isLiked ? 'favorite' : 'favorite_border'}
                        </span>
                        <span>{idea.likes}</span>
                      </button>

                      <div className="flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[14px]">
                          mode_comment
                        </span>
                        <span>{idea.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Idea Detail Modal */}
      {selectedIdea && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-[#1e222d] border border-[#363a45] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="p-4 border-b border-[#2a2e39] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className={`text-white text-xs font-bold px-2 py-0.5 rounded ${
                    selectedIdea.type === 'Long' ? 'bg-[#089981]' : 'bg-[#f23645]'
                  }`}
                >
                  {selectedIdea.type} Setup
                </span>
                <span className="font-mono text-sm font-bold text-[#f0f3fa]">
                  {selectedIdea.symbol}
                </span>
              </div>
              <button
                onClick={() => setSelectedIdea(null)}
                className="w-8 h-8 rounded-full bg-[#131722] hover:bg-[#2a2e39] text-[#dfe2f2] flex items-center justify-center cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
              <div className="w-full h-64 sm:h-80 bg-[#131722] rounded-lg overflow-hidden border border-[#2a2e39]">
                <img
                  src={selectedIdea.image}
                  alt={selectedIdea.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#f0f3fa]">
                  {selectedIdea.title}
                </h3>
                <div className="flex items-center gap-2 mt-2 text-xs text-[#787b86]">
                  <span>By <strong>{selectedIdea.author}</strong></span>
                  <span>·</span>
                  <span>{selectedIdea.timeAgo}</span>
                  <span>·</span>
                  <div className="flex gap-1">
                    {selectedIdea.tags.map((tag) => (
                      <span key={tag} className="text-[#2962ff]">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-sm text-[#dfe2f2] leading-relaxed">
                {selectedIdea.description} This analysis takes into account multiple confluence factors including order flow imbalance, fair value gaps, and institutional liquidity sweeps across higher timeframes. Trade management requires strict adherence to risk parameters.
              </p>

              {/* Action Ribbon */}
              <div className="flex items-center justify-between p-3 bg-[#131722] rounded-lg border border-[#2a2e39]">
                <div className="flex items-center gap-4">
                  <button
                    onClick={(e) => handleLike(selectedIdea.id, e)}
                    className="flex items-center gap-1.5 text-xs text-[#dfe2f2] hover:text-[#f23645] cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {likedMap[selectedIdea.id] ? 'favorite' : 'favorite_border'}
                    </span>
                    <strong>{selectedIdea.likes} Likes</strong>
                  </button>
                  <span className="text-xs text-[#787b86]">
                    <strong>{selectedIdea.comments} Comments</strong>
                  </span>
                </div>

                <button
                  onClick={() => {
                    const rawTicker = selectedIdea.symbol.split(':')[1] || selectedIdea.symbol;
                    onSelectSymbol(rawTicker);
                    setSelectedIdea(null);
                    const el = document.getElementById('supercharts');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-3.5 py-1.5 bg-[#2962ff] hover:bg-[#004ee8] text-white text-xs font-semibold rounded cursor-pointer transition-colors"
                >
                  Open Chart on Supercharts
                </button>
              </div>

              {/* Comments Section */}
              <div className="pt-2 border-t border-[#2a2e39]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#787b86] mb-3">
                  Discussion
                </h4>

                <form onSubmit={handleAddComment} className="flex gap-2 mb-4">
                  <input
                    type="text"
                    placeholder="Add to the discussion..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1 bg-[#131722] border border-[#2a2e39] rounded px-3 py-1.5 text-xs text-[#f0f3fa] focus:outline-none focus:border-[#2962ff]"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 bg-[#2a2e39] hover:bg-[#363a45] text-white text-xs font-semibold rounded cursor-pointer transition-colors"
                  >
                    Post
                  </button>
                </form>

                <div className="space-y-2">
                  {(commentsList[selectedIdea.id] || []).map((cmt, idx) => (
                    <div key={idx} className="p-2.5 rounded bg-[#131722] border border-[#2a2e39] text-xs">
                      <div className="flex items-center justify-between text-[#787b86] text-[10px] mb-1">
                        <span className="font-semibold text-[#f0f3fa]">TraderUser{idx + 1}</span>
                        <span>Just now</span>
                      </div>
                      <p className="text-[#dfe2f2]">{cmt}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
