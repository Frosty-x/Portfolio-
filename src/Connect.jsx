import React from "react";
import { Instagram, Github, Linkedin, Twitter, MapPin, Phone, Mail } from 'lucide-react';
import TextPressure from '../bits/TextPressure.jsx';

const techLogos = [
  { node: <Instagram />, title: "Instagram", href: "https://www.instagram.com/_fr0sty___/" },
  { node: <Github />, title: "GitHub", href: "https://github.com/Frosty-x" },
  { node: <Linkedin />, title: "LinkedIn", href: "https://www.linkedin.com/in/abhijit-mohanta-57660137b/" },
  { node: <Twitter />, title: "X", href: "https://x.com/Abhijit18091787" },
];

const LogoLoop = ({ logos }) => {
  return (
    <div className="relative overflow-hidden py-10 my-12">
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-transparent to-zinc-950 z-10 pointer-events-none"></div>
      <div className="flex animate-scroll">
        {[...logos, ...logos, ...logos].map((logo, index) => (
          <a
            key={index}
            href={logo.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 mx-8 sm:mx-12 text-zinc-600 hover:text-orange-500 transition-all duration-300 transform hover:scale-125"
            style={{ fontSize: '36px' }}
          >
            {logo.node}
          </a>
        ))}
      </div>
    </div>
  );
};

const ContactCard = ({ icon, title, content, isEmail }) => (
  <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 p-5 sm:p-6 rounded hover:border-orange-500/30 transition-all duration-500 group cursor-pointer transform hover:translate-x-2 hover:shadow-xl hover:shadow-orange-500/10 relative overflow-hidden">
    <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
    <div className="flex items-center space-x-3 mb-3">
      <div className="w-8 h-8 flex-shrink-0 bg-gradient-to-br from-orange-500 to-orange-600 rounded flex items-center justify-center text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
        {icon}
      </div>
      <h4 className="text-orange-500 font-normal uppercase tracking-wider text-xs sm:text-sm">{title}</h4>
    </div>
    {isEmail ? (
      <a
        href={`mailto:${content}`}
        className="text-zinc-300 font-light group-hover:text-white transition-colors duration-300 block hover:underline text-sm sm:text-base break-all"
      >
        {content}
      </a>
    ) : (
      <p className="text-zinc-300 font-light group-hover:text-white transition-colors duration-300 text-sm sm:text-base">{content}</p>
    )}
  </div>
);

const Connect = () => {
  return (
    <div
      className="min-h-screen bg-zinc-950 text-white relative overflow-hidden"
      style={{ fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
    >

      {/* Subtle grid background */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(45deg, #0a0a0a 25%, transparent 25%),
            linear-gradient(-45deg, #0a0a0a 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #0a0a0a 75%),
            linear-gradient(-45deg, transparent 75%, #0a0a0a 75%)
          `,
          backgroundSize: '4px 4px',
          backgroundPosition: '0 0, 0 2px, 2px -2px, -2px 0px'
        }}></div>
      </div>

      {/* Grain texture */}
      <div className="fixed inset-0 opacity-20 pointer-events-none" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        backgroundRepeat: 'repeat',
        backgroundSize: '100px 100px'
      }}></div>

      <section className="pt-14 sm:pt-20 pb-16 sm:pb-20 px-4 sm:px-6 container mx-auto relative z-10">

        {/* ── TOP TITLE ── */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 space-y-4">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Mail className="w-6 h-6 text-white" />
          </div>

          {/* TextPressure heading */}
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl mx-auto">
            <TextPressure
              text="Let's Connect"
              flex
              width
              weight
              italic={false}
              alpha={false}
              stroke={false}
              textColor="#edecf4"
              minFontSize={24}
              className="tracking-tight"
            />
          </div>

          <p className="text-xs sm:text-sm text-zinc-400 uppercase tracking-widest font-light max-w-2xl mx-auto px-4">
            Crafting ideas into reality, one conversation at a time
          </p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto"></div>
        </div>

        {/* ── MAIN CONTENT GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start max-w-6xl mx-auto mb-12 sm:mb-16">

          {/* Left — Intro */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <p className="text-xs sm:text-sm text-orange-500 uppercase tracking-widest font-light">GET IN TOUCH</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-tight tracking-tight" style={{ fontWeight: 300 }}>
                Ready to Transform Your Vision?
                <br />
                <span className="text-orange-500 hover:tracking-wider transition-all duration-500 inline-block">
                  Let's Collaborate
                </span>
              </h2>
            </div>

            <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 p-5 sm:p-6 rounded hover:border-orange-500/30 transition-all duration-500 group">
              <p className="text-zinc-300 leading-relaxed font-light text-sm sm:text-base group-hover:text-white transition-colors duration-300">
                I'm always excited to discuss new projects, innovative ideas, or just a friendly chat about technology and design. Reach out and let's make something extraordinary.
              </p>
            </div>

            {/* Availability Badge */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <span className="flex items-center space-x-2 bg-zinc-900/80 backdrop-blur-sm px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-zinc-800 hover:border-orange-500/50 hover:bg-zinc-800/80 transition-all duration-300 cursor-pointer group">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full group-hover:animate-pulse"></span>
                <span className="text-zinc-300 group-hover:text-white transition-colors text-xs sm:text-sm tracking-wider uppercase font-light">
                  Available for Projects
                </span>
              </span>
            </div>
          </div>

          {/* Right — Contact Cards */}
          <div className="space-y-3 sm:space-y-4">
            <ContactCard
              icon={<MapPin className="w-4 h-4 sm:w-5 sm:h-5" />}
              title="LOCATION"
              content="Bhubaneswar, India"
            />
            <ContactCard
              icon={<Phone className="w-4 h-4 sm:w-5 sm:h-5" />}
              title="PHONE"
              content="+91 79789 97295"
            />
            <ContactCard
              icon={<Mail className="w-4 h-4 sm:w-5 sm:h-5" />}
              title="EMAIL"
              content="abhijeet2002mohanta@gmail.com"
              isEmail
            />

            {/* Social Media Card */}
            <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 p-5 sm:p-6 rounded hover:border-orange-500/30 transition-all duration-500 group cursor-pointer transform hover:scale-[1.02] hover:shadow-xl hover:shadow-orange-500/10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded flex items-center justify-center">
                  <span className="text-white text-sm">@</span>
                </div>
                <h4 className="text-orange-500 font-normal uppercase tracking-wider text-xs sm:text-sm">Find Me On Socials</h4>
              </div>

              <div className="grid grid-cols-4 gap-2 sm:gap-4">
                {techLogos.map((logo, index) => (
                  <a
                    key={index}
                    href={logo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex items-center justify-center h-10 sm:h-12 bg-zinc-900/50 border border-zinc-800 rounded text-zinc-500 hover:text-orange-500 hover:border-orange-500/50 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 group/icon"
                    title={logo.title}
                  >
                    <span className="text-lg sm:text-xl">{logo.node}</span>
                    <span className="absolute -bottom-px left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 group-hover/icon:w-full transition-all duration-300"></span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── LOGO LOOP ── */}
        <LogoLoop logos={techLogos} />

        {/* ── BOTTOM STATS ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto mt-12 sm:mt-16">
          <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 p-6 sm:p-8 text-center hover:border-orange-500/30 transition-all duration-500 rounded group cursor-pointer transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/10">
            <p className="text-4xl sm:text-5xl font-light mb-2 text-orange-500 group-hover:scale-110 transition-transform duration-300" style={{ fontWeight: 300 }}>24/7</p>
            <p className="text-xs sm:text-sm text-zinc-400 uppercase tracking-widest font-light group-hover:text-zinc-300 transition-colors">Response Time</p>
            <div className="mt-4 w-full h-0.5 bg-zinc-800 overflow-hidden">
              <div className="h-full bg-orange-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 backdrop-blur-md border border-orange-500/30 p-6 sm:p-8 text-center transform hover:scale-105 transition-all duration-500 rounded cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/20 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/20 to-orange-500/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <p className="text-4xl sm:text-5xl font-light mb-2 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" style={{ fontWeight: 300 }}>100%</p>
            <p className="text-xs sm:text-sm text-zinc-300 uppercase tracking-widest font-light relative z-10 group-hover:text-white transition-colors">Dedication</p>
          </div>

          <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 p-6 sm:p-8 text-center hover:border-orange-500/30 transition-all duration-500 rounded group cursor-pointer transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/10">
            <p className="text-4xl sm:text-5xl font-light mb-2 text-orange-500 group-hover:scale-110 transition-transform duration-300" style={{ fontWeight: 300 }}>∞</p>
            <p className="text-xs sm:text-sm text-zinc-400 uppercase tracking-widest font-light group-hover:text-zinc-300 transition-colors">Possibilities</p>
            <div className="mt-4 w-full h-0.5 bg-zinc-800 overflow-hidden">
              <div className="h-full bg-orange-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative spinner */}
      <div className="hidden sm:block fixed bottom-10 right-10 w-16 h-16 md:w-20 md:h-20 pointer-events-none opacity-30">
        <div className="w-full h-full animate-spin-slow">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M50,10 L90,50 L50,90 L10,50 Z" fill="none" stroke="rgb(249, 115, 22)" strokeWidth="1" />
            <circle cx="50" cy="50" r="3" fill="rgb(249, 115, 22)" />
            <circle cx="50" cy="10" r="2" fill="rgb(249, 115, 22)" />
            <circle cx="90" cy="50" r="2" fill="rgb(249, 115, 22)" />
            <circle cx="50" cy="90" r="2" fill="rgb(249, 115, 22)" />
            <circle cx="10" cy="50" r="2" fill="rgb(249, 115, 22)" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Connect;