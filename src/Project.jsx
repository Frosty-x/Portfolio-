import React, { useState, useEffect } from 'react';
import ChromaGrid from '../bits/ChromaGrid.jsx';
import TextPressure from '../bits/TextPressure.jsx';
import { ExternalLink, Github, Code2 } from 'lucide-react';

const items = [
  {
    image: "/Bk.jpg",
    title: "Massage Website",
    subtitle: "Book massage easily",
    handle: "@AbhijitMohanta",
    tag: "Live",
    borderColor: "#f97316",
    gradient: "linear-gradient(180deg, #f97316, #000)",
    url: "https://bkbodymassage.netlify.app/",
    isLive: true,
  },
  {
    image: "/Notes.jpg",
    title: "Save Notes",
    subtitle: "Create notes easily",
    handle: "@AbhijitMohanta",
    tag: "GitHub",
    borderColor: "#f97316",
    gradient: "linear-gradient(145deg, #f97316, #000)",
    url: "https://github.com/Frosty-x/NoteItDown.git",
    isLive: false,
  },
  {
    image: "/Bjack.jpg",
    title: "Black Jack Game",
    subtitle: "Wanna Play Black Jack!",
    handle: "@AbhijitMohanta",
    tag: "GitHub",
    borderColor: "#f97316",
    gradient: "linear-gradient(180deg, #f97316, #000)",
    url: "https://github.com/Frosty-x/BLACK-JACK.git",
    isLive: false,
  },
  {
    image: "/Site.jpg",
    title: "Website Saver",
    subtitle: "Save sites in one click",
    handle: "@AbhijitMohanta",
    tag: "GitHub",
    borderColor: "#f97316",
    gradient: "linear-gradient(180deg, #f97316, #000)",
    url: "https://github.com/Frosty-x/site-saver.git",
    isLive: false,
  },
];

// ─── Project Card (mobile/tablet fallback) ────────────────────────
const ProjectCard = ({ item, index, isActive, onHover }) => (
  <a
    href={item.url}
    target="_blank"
    rel="noopener noreferrer"
    onMouseEnter={() => onHover(index)}
    onMouseLeave={() => onHover(null)}
    className={`group relative rounded border overflow-hidden block transition-all duration-500 transform
      ${isActive
        ? 'bg-orange-500/10 border-orange-500/50 translate-x-2 shadow-xl shadow-orange-500/10'
        : 'bg-zinc-900/50 border-zinc-800 hover:border-orange-500/30 hover:translate-x-2 hover:shadow-xl hover:shadow-orange-500/10'
      }`}
  >
    {/* Left accent bar */}
    <div className={`absolute left-0 top-0 bottom-0 w-1 bg-orange-500 z-10 transition-transform duration-500 ${isActive ? 'translate-x-0' : '-translate-x-full group-hover:translate-x-0'}`} />
    {/* Bottom accent line */}
    <div className={`absolute bottom-0 left-0 h-0.5 bg-orange-500 z-10 transition-all duration-500 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
    {/* Shimmer */}
    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none z-10" />

    {/* Image */}
    <div className="relative h-44 sm:h-52 overflow-hidden">
      <img
        src={item.image}
        alt={item.title}
        className={`w-full h-full object-cover transition-transform duration-700 ${isActive ? 'scale-110' : 'scale-100 group-hover:scale-105'}`}
        style={{ filter: isActive ? 'brightness(0.75)' : 'brightness(0.55)' }}
      />
      <div className="absolute inset-0" style={{ background: item.gradient, opacity: 0.55 }} />

      {/* Tag badge on image */}
      <div className="absolute top-2.5 right-3 flex items-center gap-1">
        <span className="text-[9px] text-orange-400 uppercase tracking-widest border border-orange-500/40 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm">
          {item.tag}
        </span>
      </div>

      {/* Active ping */}
      {isActive && (
        <div className="absolute top-2.5 left-3 w-2 h-2">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-ping absolute" />
          <div className="w-2 h-2 bg-orange-500 rounded-full" />
        </div>
      )}
    </div>

    {/* Content */}
    <div className="p-4 sm:p-5">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-white font-light text-sm sm:text-base leading-snug">{item.title}</h3>
          <p className={`text-xs sm:text-sm font-light mt-0.5 transition-colors duration-300 ${isActive ? 'text-zinc-300' : 'text-zinc-400 group-hover:text-zinc-300'}`}>{item.subtitle}</p>
        </div>
        <div className={`w-8 h-8 flex-shrink-0 rounded flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-600 text-white transition-all duration-500 ${isActive ? 'scale-110 rotate-6' : 'group-hover:scale-110 group-hover:rotate-6'}`}>
          {item.isLive ? <ExternalLink className="w-3.5 h-3.5" /> : <Github className="w-3.5 h-3.5" />}
        </div>
      </div>
      <p className="text-[10px] mt-2.5 font-mono tracking-wide text-orange-500/70">{item.handle}</p>
    </div>
  </a>
);

// ─── Main ─────────────────────────────────────────────────────────
const Project = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [autoIndex, setAutoIndex]       = useState(0);

  useEffect(() => {
    if (hoveredIndex !== null) return;
    const id = setInterval(() => setAutoIndex(p => (p + 1) % items.length), 2600);
    return () => clearInterval(id);
  }, [hoveredIndex]);

  const activeIndex = hoveredIndex !== null ? hoveredIndex : autoIndex;

  return (
    <section
      className="bg-zinc-950 min-h-screen w-full relative overflow-x-hidden"
      style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      <style>{`
        @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spin-slow { animation: spinSlow 12s linear infinite; }
      `}</style>

      {/* Checkerboard bg */}
      <div className="fixed inset-0 opacity-[0.15] pointer-events-none" style={{
        backgroundImage: `linear-gradient(45deg,#0a0a0a 25%,transparent 25%),linear-gradient(-45deg,#0a0a0a 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#0a0a0a 75%),linear-gradient(-45deg,transparent 75%,#0a0a0a 75%)`,
        backgroundSize: '4px 4px',
        backgroundPosition: '0 0,0 2px,2px -2px,-2px 0'
      }} />

      {/* Grain texture */}
      <div className="fixed inset-0 opacity-[0.12] pointer-events-none" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        backgroundRepeat: 'repeat',
        backgroundSize: '100px 100px'
      }} />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-12 sm:pt-16 lg:pt-20 pb-14 relative z-10">

        {/* ── TITLE ── */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-20 space-y-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full mx-auto flex items-center justify-center shadow-lg shadow-orange-500/30">
            <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>

          {/* TextPressure title */}
          <div className="w-full max-w-xs sm:max-w-lg lg:max-w-2xl mx-auto">
            <TextPressure
              text="PROJECTS"
              flex
              width
              weight
              italic
              alpha={false}
              stroke={false}
              textColor="#edecf4"
              minFontSize={24}
              className="tracking-wider"
            />
          </div>

          <p className="text-[10px] sm:text-xs text-zinc-400 uppercase tracking-widest font-light max-w-xs sm:max-w-md mx-auto">
            Things I've built and shipped
          </p>
          <div className="w-20 sm:w-24 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto" />
        </div>

        {/* ── SECTION LABEL ── */}
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="w-1 h-4 sm:h-5 bg-orange-500 rounded-full" />
          <span className="text-[10px] sm:text-xs text-zinc-400 uppercase tracking-widest font-light">Selected Work</span>
          <div className="flex-1 h-px bg-zinc-800" />
          <span className="text-[9px] sm:text-[10px] text-zinc-600 font-light">
            <span className="sm:hidden">tap to visit</span>
            <span className="hidden sm:inline">hover · click to visit</span>
          </span>
        </div>

        {/* ── DESKTOP: ChromaGrid ── */}
        <div className="hidden md:block">
          <ChromaGrid
            items={items}
            radius={300}
            damping={0.45}
            fadeOut={0.6}
            ease="power3.out"
          />
        </div>

        {/* ── MOBILE / TABLET: themed cards ── */}
        <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          {items.map((item, i) => (
            <ProjectCard
              key={i}
              item={item}
              index={i}
              isActive={activeIndex === i}
              onHover={setHoveredIndex}
            />
          ))}
        </div>

        {/* ── STATS ── */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6 mt-10 sm:mt-14">
          {[
            { val: items.length, label: 'Projects', bar: true },
            { val: '100%', label: 'Passion', highlight: true },
            { val: '∞', label: 'Building', bar: true },
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
      </div>

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
    </section>
  );
};

export default Project;