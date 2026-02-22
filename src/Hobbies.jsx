import React, { useState, useEffect } from 'react';
import { Heart, Gamepad2, Camera, Tv2, Timer } from 'lucide-react';
import TextPressure from '../bits/TextPressure.jsx';

const FootballIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polygon points="12,6.5 15.2,9 14,13 10,13 8.8,9" fill="currentColor" stroke="none" opacity="0.7"/>
    <line x1="12" y1="6.5" x2="12" y2="2" />
    <line x1="15.2" y1="9" x2="19.2" y2="7.2" />
    <line x1="14" y1="13" x2="16.8" y2="16.2" />
    <line x1="10" y1="13" x2="7.2" y2="16.2" />
    <line x1="8.8" y1="9" x2="4.8" y2="7.2" />
  </svg>
);

const hobbies = [
  {
    icon: <Tv2 className="w-5 h-5" />,
    title: "Watching Football",
    description: "Match days are sacred. From La Liga to Champions League — live, no spoilers.",
    tag: "Passion",
    image: "lal.jpg",
    imageAlt: "Football stadium crowd",
  },
  {
    icon: <FootballIcon className="w-5 h-5" />,
    title: "Playing Football",
    description: "Weekend five-a-side with the lads. Central midfield, always pressing.",
    tag: "Sport",
    image: "ft2.jpg",
    imageAlt: "Football match",
  },
  {
    icon: <Timer className="w-5 h-5" />,
    title: "Running",
    description: "Early morning 5Ks to reset the mind. No music, just the road.",
    tag: "Active",
    image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=700&q=80",
    imageAlt: "Running at sunrise",
  },
  {
    icon: <Gamepad2 className="w-5 h-5" />,
    title: "Gaming",
    description: "Strategy games, roguelikes, and anything with a good story-driven world.",
    tag: "Fun",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=700&q=80",
    imageAlt: "Gaming setup",
  },
  {
    icon: <Camera className="w-5 h-5" />,
    title: "Photography",
    description: "Capturing urban geometry and the quiet moments most people walk past.",
    tag: "Art",
    image: "pic.jpeg",
    imageAlt: "Photography",
  },
  {
    icon: <Heart className="w-5 h-5" />,
    title: "UI Tinkering",
    description: "Rebuilding interfaces just to see if they can feel better than before.",
    tag: "Craft",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=700&q=80",
    imageAlt: "UI design",
  },
];
// ─── Shared GalleryCell ───────────────────────────────────────────
// The cell itself must have a defined height (set by the parent grid row).
// The img is absolutely positioned to fill the container fully.
const GalleryCell = ({ hobby, index, isActive, onTap, className = '' }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      onClick={() => onTap(index)}
      className={`relative overflow-hidden rounded group cursor-pointer ${className}`}
    >
      {/* Skeleton placeholder */}
      {!loaded && (
        <div className="absolute inset-0 bg-zinc-800 animate-pulse" />
      )}

      {/* Image — absolutely fills parent */}
      <img
        src={hobby.image}
        alt={hobby.imageAlt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700
          ${isActive ? 'scale-110' : 'scale-100 group-hover:scale-105'}
          ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ filter: isActive ? 'brightness(1.1)' : 'brightness(0.5)' }}
      />

      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-70'}`} />

      {/* Active border */}
      <div className={`absolute inset-0 border-2 border-orange-500 rounded transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} />

      {/* Label — slides up on active/hover */}
      <div className={`absolute bottom-0 left-0 right-0 p-2 sm:p-2.5 transform transition-all duration-300 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'}`}>
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[8px] text-orange-400 uppercase tracking-widest border border-orange-500/40 px-1.5 py-0.5 rounded-full bg-black/50 backdrop-blur-sm">
            {hobby.tag}
          </span>
          <span className="text-white text-[10px] font-light leading-snug">{hobby.title}</span>
        </div>
      </div>

      {/* Active ping dot */}
      {isActive && (
        <div className="absolute top-2 right-2 w-2 h-2">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-ping absolute" />
          <div className="w-2 h-2 bg-orange-500 rounded-full" />
        </div>
      )}
    </div>
  );
};

// ─── Visual Snapshot Gallery ──────────────────────────────────────
//  Mobile  (<640px)  : 2-col × 3-row, each row 130px
//  Tablet  (640-1023): 3-col × 2-row, each row 180px
//  Desktop (≥1024px) : 4-col mosaic, total height 480px
const VisualSnapshot = ({ activeIndex, onTap }) => (
  <>
    {/* Mobile: 2×3 — each cell has explicit height via row definition */}
    <div
      className="grid sm:hidden grid-cols-2 gap-1.5"
      style={{ gridTemplateRows: 'repeat(3, 130px)' }}
    >
      {hobbies.map((hobby, i) => (
        <GalleryCell key={i} hobby={hobby} index={i} isActive={activeIndex === i} onTap={onTap} />
      ))}
    </div>

    {/* Tablet: 3×2 */}
    <div
      className="hidden sm:grid lg:hidden grid-cols-3 gap-2"
      style={{ gridTemplateRows: 'repeat(2, 180px)' }}
    >
      {hobbies.map((hobby, i) => (
        <GalleryCell key={i} hobby={hobby} index={i} isActive={activeIndex === i} onTap={onTap} />
      ))}
    </div>

    {/* Desktop: 4-col mosaic, 3 rows totalling 480px */}
    <div
      className="hidden lg:grid gap-2 grid-cols-4"
      style={{ gridTemplateRows: 'repeat(3, 1fr)', height: 480 }}
    >
      <GalleryCell hobby={hobbies[0]} index={0} isActive={activeIndex === 0} onTap={onTap} className="col-span-2 row-span-2" />
      <GalleryCell hobby={hobbies[1]} index={1} isActive={activeIndex === 1} onTap={onTap} />
      <GalleryCell hobby={hobbies[2]} index={2} isActive={activeIndex === 2} onTap={onTap} />
      <GalleryCell hobby={hobbies[3]} index={3} isActive={activeIndex === 3} onTap={onTap} />
      <GalleryCell hobby={hobbies[4]} index={4} isActive={activeIndex === 4} onTap={onTap} />
      <GalleryCell hobby={hobbies[5]} index={5} isActive={activeIndex === 5} onTap={onTap} className="col-span-4" />
    </div>
  </>
);

// ─── Feature Spotlight ────────────────────────────────────────────
const FeatureSpotlight = ({ activeIndex }) => {
  const hobby = activeIndex !== null ? hobbies[activeIndex] : null;
  return (
    <div className="relative overflow-hidden rounded border border-zinc-800 bg-zinc-900/50 h-28 sm:h-44 lg:h-56">
      {hobby ? (
        <>
          <img
            key={hobby.title}
            src={hobby.image}
            alt={hobby.imageAlt}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              filter: 'brightness(0.3)',
              transform: 'scale(1.05)',
              animation: 'spotlightIn 0.5s ease forwards',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-5 sm:px-8 lg:px-10">
            <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
              <div className="w-6 h-6 sm:w-7 sm:h-7 bg-orange-500 rounded flex items-center justify-center text-white shrink-0">
                {hobby.icon}
              </div>
              <span className="text-[8px] sm:text-[9px] text-orange-400 uppercase tracking-widest border border-orange-500/30 px-2 py-0.5 rounded-full">
                {hobby.tag}
              </span>
            </div>
            <h2 className="text-base sm:text-2xl lg:text-3xl font-light text-white mb-0.5 sm:mb-1">{hobby.title}</h2>
            <p className="text-zinc-300 text-[11px] sm:text-sm font-light max-w-xs sm:max-w-sm leading-relaxed">{hobby.description}</p>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full gap-2">
          <div className="w-8 h-0.5 bg-zinc-700" />
          <p className="text-zinc-600 text-[10px] uppercase tracking-widest font-light">Tap a tile to preview</p>
          <div className="w-8 h-0.5 bg-zinc-700" />
        </div>
      )}
    </div>
  );
};

// ─── Hobby Card ───────────────────────────────────────────────────
const HobbyCard = ({ hobby, index, isActive, onHover, onTap }) => (
  <div
    onMouseEnter={() => onHover(index)}
    onMouseLeave={() => onHover(null)}
    onClick={() => onTap(index)}
    className={`group relative backdrop-blur-md border rounded p-4 sm:p-5 transition-all duration-500 transform cursor-pointer overflow-hidden
      ${isActive
        ? 'bg-orange-500/10 border-orange-500/50 translate-x-1 sm:translate-x-2 shadow-xl shadow-orange-500/10'
        : 'bg-zinc-900/50 border-zinc-800 hover:border-orange-500/30 hover:translate-x-1 sm:hover:translate-x-2 hover:shadow-xl hover:shadow-orange-500/10'
      }`}
  >
    <div className={`absolute left-0 top-0 bottom-0 w-1 bg-orange-500 transition-transform duration-500 ${isActive ? 'translate-x-0' : '-translate-x-full group-hover:translate-x-0'}`} />
    <div className={`absolute bottom-0 left-0 h-0.5 bg-orange-500 transition-all duration-500 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
    <div className="flex items-start gap-3 sm:gap-4 relative z-10">
      <div className={`w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0 bg-gradient-to-br from-orange-500 to-orange-600 rounded flex items-center justify-center text-white transition-all duration-500 ${isActive ? 'scale-110 rotate-6' : 'group-hover:scale-110 group-hover:rotate-6'}`}>
        {hobby.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-white font-light text-sm sm:text-base">{hobby.title}</h3>
          <span className="text-[9px] text-orange-500 uppercase tracking-widest font-light border border-orange-500/30 px-1.5 sm:px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5">
            {hobby.tag}
          </span>
        </div>
        <p className={`text-xs sm:text-sm font-light leading-relaxed transition-colors duration-300 ${isActive ? 'text-zinc-300' : 'text-zinc-400 group-hover:text-zinc-300'}`}>
          {hobby.description}
        </p>
      </div>
    </div>
  </div>
);

// ─── Main ─────────────────────────────────────────────────────────
const Hobbies = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [autoIndex, setAutoIndex]       = useState(0);
  const [pinnedIndex, setPinnedIndex]   = useState(null);

  useEffect(() => {
    if (hoveredIndex !== null || pinnedIndex !== null) return;
    const id = setInterval(() => setAutoIndex(p => (p + 1) % hobbies.length), 2400);
    return () => clearInterval(id);
  }, [hoveredIndex, pinnedIndex]);

  const handleTap = (i) => setPinnedIndex(prev => (prev === i ? null : i));

  const activeIndex = hoveredIndex !== null ? hoveredIndex
    : pinnedIndex   !== null ? pinnedIndex
    : autoIndex;

  return (
    <div
      className="min-h-screen bg-zinc-950 text-white relative overflow-x-hidden"
      style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      <style>{`
        @keyframes spotlightIn {
          from { opacity: 0; transform: scale(1.08); }
          to   { opacity: 1; transform: scale(1.05); }
        }
        @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spin-slow { animation: spinSlow 12s linear infinite; }
      `}</style>

      {/* Checkerboard bg */}
      <div className="fixed inset-0 opacity-[0.15] pointer-events-none" style={{
        backgroundImage: `linear-gradient(45deg,#0a0a0a 25%,transparent 25%),linear-gradient(-45deg,#0a0a0a 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#0a0a0a 75%),linear-gradient(-45deg,transparent 75%,#0a0a0a 75%)`,
        backgroundSize: '4px 4px',
        backgroundPosition: '0 0,0 2px,2px -2px,-2px 0'
      }} />

      <section className="pt-12 sm:pt-16 lg:pt-20 pb-14 px-4 sm:px-6 mx-auto max-w-5xl relative z-10">

        {/* ── TITLE ── */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-20 space-y-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full mx-auto flex items-center justify-center shadow-lg shadow-orange-500/30">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div className="w-full max-w-xs sm:max-w-lg lg:max-w-2xl mx-auto">
            <TextPressure
              text="When I'm Not Coding"
              flex
              width
              weight
              italic={false}
              alpha={false}
              stroke={false}
              textColor="#edecf4"
              minFontSize={20}
              className="tracking-tight"
            />
          </div>
          <p className="text-[10px] sm:text-xs text-zinc-400 uppercase tracking-widest font-light max-w-xs sm:max-w-md mx-auto">
            The things that keep me sane outside the terminal
          </p>
          <div className="w-20 sm:w-24 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto" />
        </div>

        {/* ── VISUAL SNAPSHOT ── */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <div className="flex items-center gap-3 mb-3 sm:mb-4">
            <div className="w-1 h-4 sm:h-5 bg-orange-500 rounded-full" />
            <span className="text-[10px] sm:text-xs text-zinc-400 uppercase tracking-widest font-light">Visual Snapshot</span>
            <div className="flex-1 h-px bg-zinc-800" />
            <span className="text-[9px] sm:text-[10px] text-zinc-600 font-light">
              <span className="sm:hidden">tap to explore</span>
              <span className="hidden sm:inline">hover · tap to explore</span>
            </span>
          </div>

          <VisualSnapshot activeIndex={activeIndex} onTap={handleTap} />

          <div className="mt-2">
            <FeatureSpotlight activeIndex={activeIndex} />
          </div>

          {/* Dot nav */}
          <div className="flex gap-1.5 sm:gap-2 justify-center mt-4">
            {hobbies.map((_, i) => (
              <button
                key={i}
                onClick={() => handleTap(i)}
                className={`rounded-full transition-all duration-300 ${
                  activeIndex === i ? 'w-6 sm:w-7 h-1.5 bg-orange-500' : 'w-1.5 h-1.5 bg-zinc-700 hover:bg-zinc-500'
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div className="flex items-center gap-4 mb-5 sm:mb-8">
          <div className="flex-1 h-px bg-zinc-800" />
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest">All Hobbies</span>
          <div className="flex-1 h-px bg-zinc-800" />
        </div>

        {/* ── CARDS ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 lg:gap-4 mb-10 sm:mb-12">
          {hobbies.map((hobby, i) => (
            <HobbyCard
              key={i}
              hobby={hobby}
              index={i}
              isActive={activeIndex === i}
              onHover={setHoveredIndex}
              onTap={handleTap}
            />
          ))}
        </div>

        {/* ── STATS ── */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6">
          {[
            { val: hobbies.length, label: 'Hobbies', bar: true },
            { val: '24/7', label: 'Curious', highlight: true },
            { val: '∞', label: 'Learning', bar: true },
          ].map(({ val, label, bar, highlight }) => (
            <div
              key={label}
              className={`p-3 sm:p-6 lg:p-8 text-center rounded group cursor-pointer transform hover:scale-105 hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-500 relative overflow-hidden
                ${highlight
                  ? 'bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/30'
                  : 'bg-zinc-900/50 backdrop-blur-md border border-zinc-800 hover:border-orange-500/30'
                }`}
            >
              {highlight && (
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/20 to-orange-500/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              )}
              <p className={`text-xl sm:text-3xl lg:text-5xl font-light mb-0.5 sm:mb-2 group-hover:scale-110 transition-transform duration-300 relative z-10 ${highlight ? 'text-white' : 'text-orange-500'}`}>
                {val}
              </p>
              <p className={`text-[8px] sm:text-xs lg:text-sm uppercase tracking-wider font-light group-hover:text-zinc-300 transition-colors relative z-10 ${highlight ? 'text-zinc-300' : 'text-zinc-400'}`}>
                {label}
              </p>
              {bar && (
                <div className="mt-2 sm:mt-3 lg:mt-4 w-full h-0.5 bg-zinc-800 overflow-hidden">
                  <div className="h-full bg-orange-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Decorative spinner — desktop only */}
      <div className="hidden lg:block fixed bottom-10 right-10 w-20 h-20 pointer-events-none opacity-25">
        <div className="w-full h-full spin-slow">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M50,10 L90,50 L50,90 L10,50 Z" fill="none" stroke="rgb(249,115,22)" strokeWidth="1" />
            <circle cx="50" cy="50" r="3" fill="rgb(249,115,22)" />
            <circle cx="50" cy="10" r="2" fill="rgb(249,115,22)" />
            <circle cx="90" cy="50" r="2" fill="rgb(249,115,22)" />
            <circle cx="50" cy="90" r="2" fill="rgb(249,115,22)" />
            <circle cx="10" cy="50" r="2" fill="rgb(249,115,22)" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Hobbies;