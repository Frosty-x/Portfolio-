import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Instagram, Github, Linkedin, Twitter,Code2,FileCode2,Atom,Paintbrush,
  Server } from 'lucide-react';

const techLogos = [
  { node: <Instagram />, title: "Instagram", href: "https://www.instagram.com/_fr0sty___/" },
  { node: <Github />, title: "GitHub", href: "https://github.com/Frosty-x" },
  { node: <Linkedin />, title: "LinkedIn", href: "https://www.linkedin.com/in/abhijit-mohanta-57660137b/" },
  { node: <Twitter />, title: "X", href: "https://x.com/Abhijit18091787" },
];

const LogoLoop = ({ logos, speed = 100 }) => {

  return (
    
    <div className="relative overflow-hidden py-12 my-16">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 pointer-events-none"></div>
      <div className="flex animate-scroll">
        {[...logos, ...logos, ...logos].map((logo, index) => (
          <a
            key={index}
            href={logo.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 mx-12 text-gray-500 hover:text-orange-500 transition-all duration-300 transform hover:scale-125"
            style={{ fontSize: '40px' }}
          >
            {logo.node}
          </a>
        ))}
      </div>
    </div>
  );
};
export default function Portfolio() {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-zinc-950 text-white relative overflow-hidden" style={{ fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}>
        {/* Subtle grid background */}
      <div className="fixed inset-0 opacity-30">
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
      
      {/* Subtle grain texture */}
      <div className="fixed inset-0 opacity-20" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        backgroundRepeat: 'repeat',
        backgroundSize: '100px 100px'
      }}></div>

      {/* Hero Section */}
     <section className="pt-20 pb-20 px-6 container mx-auto relative z-10">
  <div className="grid md:grid-cols-2 gap-12 items-center">
    <div className="space-y-6 animate-fade-in-up">
      <h1 className="text-5xl md:text-7xl font-light leading-tight tracking-tight" style={{ fontWeight: 300 }}>
        <span className="inline-block hover:text-orange-500 transition-colors duration-500">HI,</span>{' '}
        <span className="inline-block hover:text-orange-500 transition-colors duration-500">I'M</span>{' '}
        <span className="inline-block hover:text-orange-500 transition-colors duration-500">ABHIJIT.</span><br />
        <span className="text-orange-500 font-normal hover:tracking-wider transition-all duration-500 inline-block" style={{ fontWeight: 400 }}>ASPIRING WEB DEVELOPER</span><br />
        <span className="text-zinc-500 font-light hover:text-zinc-400 transition-colors duration-300" style={{ fontWeight: 300 }}>BASED IN <span className="line-through hover:no-underline hover:text-orange-500 transition-all duration-300 cursor-pointer">BHUBANESWAR</span></span>
      </h1>
      <div className="flex flex-wrap items-center gap-4 text-sm font-normal tracking-wider">
        <span className="flex items-center space-x-2 bg-zinc-900/80 backdrop-blur-sm px-5 py-2.5 rounded-full border border-zinc-800 hover:border-orange-500/50 hover:bg-zinc-800/80 transition-all duration-300 cursor-pointer group">
          <span className="w-1.5 h-1.5 bg-orange-500 rounded-full group-hover:animate-pulse"></span>
          <span className="text-zinc-300 group-hover:text-white transition-colors">LEARNING</span>
        </span>
        <span className="flex items-center space-x-2 bg-zinc-900/80 backdrop-blur-sm px-5 py-2.5 rounded-full border border-zinc-800 hover:border-orange-500/50 hover:bg-zinc-800/80 transition-all duration-300 cursor-pointer group">
          <span className="w-1.5 h-1.5 bg-orange-500 rounded-full group-hover:animate-pulse"></span>
          <span className="text-zinc-300 group-hover:text-white transition-colors">BUILDING</span>
        </span>
        <span className="flex items-center space-x-2 bg-zinc-900/80 backdrop-blur-sm px-5 py-2.5 rounded-full border border-zinc-800 hover:border-orange-500/50 hover:bg-zinc-800/80 transition-all duration-300 cursor-pointer group">
          <span className="w-1.5 h-1.5 bg-orange-500 rounded-full group-hover:animate-pulse"></span>
          <span className="text-zinc-300 group-hover:text-white transition-colors">GROWING</span>
        </span>
      </div>
      <div className="flex space-x-4 pt-4">
        <button onClick={() => navigate('/Project')} className="px-8 py-3.5 bg-orange-500/10 backdrop-blur-md text-orange-500 border border-orange-500/30 hover:bg-orange-500 hover:text-black hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 rounded font-normal tracking-wide transform hover:scale-105 hover:-translate-y-1">
          View My Work
        </button>
        <button onClick={() => navigate('/Connect')} className="px-8 py-3.5 bg-zinc-900/50 backdrop-blur-md border border-zinc-800 hover:bg-zinc-800/50 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 rounded font-normal tracking-wide text-zinc-300 transform hover:scale-105 hover:-translate-y-1">
          Contact Me
        </button>
      </div>
    </div>
    <div className="relative group flex justify-center">
  {/* Grid overlay */}
  <div
    className="absolute inset-0 opacity-20 pointer-events-none"
    style={{
      backgroundImage:
        "linear-gradient(rgba(249,115,22,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.15) 1px, transparent 1px)",
      backgroundSize: "20px 20px",
    }}
  ></div>

  <div className="relative w-[25rem] h-[32rem] rounded-xl overflow-hidden border border-orange-500/30 bg-zinc-900/60 backdrop-blur-md group-hover:border-orange-500/50 transition-all duration-500">
    <img
      src="/Propic.jpeg"
      alt="Abhijit"
      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent"></div>
  </div>
</div>

  </div>
</section>

      {/* Scrolling Banner */}
          <LogoLoop
              logos={techLogos}
              speed={400}
              direction="left"
              logoHeight={40}
              gap={60}
              hoverSpeed={0}
              scaleOnHover
              fadeOut
              fadeOutColor="#000000"
              ariaLabel="Technology partners"
            />

      {/* About Section */}
      <section className="py-20 px-6 container mx-auto relative z-10" id="about">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <p className="text-sm text-orange-500 uppercase tracking-widest font-light">ABOUT ME</p>
            <h2 className="text-4xl md:text-5xl font-light leading-tight text-white tracking-tight" style={{ fontWeight: 300 }}>
              Passionate about creating digital experiences.
            </h2>
          </div>
          <div className="space-y-6">
            <p className="text-zinc-300 leading-relaxed font-light">
              I'm a self-taught web developer with a passion for creating beautiful and functional websites. Currently focused on learning modern web technologies and building my portfolio.
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed font-light">
              Every day is an opportunity to learn something new. I believe in continuous improvement and staying updated with the latest web development trends and best practices.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-4">
              <div className="bg-zinc-900/50 backdrop-blur-sm p-4 rounded border border-zinc-800">
                <p className="text-xs text-zinc-500 uppercase mb-1 tracking-wider font-light">Location</p>
                <p className="font-normal text-white">Bhubaneswar</p>
              </div>
              <div className="bg-zinc-900/50 backdrop-blur-sm p-4 rounded border border-zinc-800">
                <p className="text-xs text-zinc-500 uppercase mb-1 tracking-wider font-light">Status</p>
                <p className="font-normal text-white">Learning</p>
              </div>
              <div className="bg-zinc-900/50 backdrop-blur-sm p-4 rounded border border-zinc-800">
                <p className="text-xs text-zinc-500 uppercase mb-1 tracking-wider font-light">Focus</p>
                <p className="font-normal text-white">Full Stack</p>
              </div>
            </div>
          </div>
        </div>
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 p-8 text-center hover:border-orange-500/30 transition-all duration-500 rounded group cursor-pointer transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/10">
            <p className="text-5xl font-light mb-2 text-orange-500 group-hover:scale-110 transition-transform duration-300" style={{ fontWeight: 300 }}>10+</p>
            <p className="text-sm text-zinc-400 uppercase tracking-widest font-light group-hover:text-zinc-300 transition-colors">Technologies Learning</p>
            <div className="mt-4 w-full h-0.5 bg-zinc-800 overflow-hidden">
              <div className="h-full bg-orange-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 backdrop-blur-md border border-orange-500/30 p-8 text-center transform hover:scale-105 transition-all duration-500 rounded cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/20 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/20 to-orange-500/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <p className="text-5xl font-light mb-2 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" style={{ fontWeight: 300 }}>15+</p>
            <p className="text-sm text-zinc-300 uppercase tracking-widest font-light relative z-10 group-hover:text-white transition-colors">Practice Projects</p>
          </div>
          <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 p-8 text-center hover:border-orange-500/30 transition-all duration-500 rounded group cursor-pointer transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/10">
            <p className="text-5xl font-light mb-2 text-orange-500 group-hover:scale-110 transition-transform duration-300" style={{ fontWeight: 300 }}>100%</p>
            <p className="text-sm text-zinc-400 uppercase tracking-widest font-light group-hover:text-zinc-300 transition-colors">Dedication</p>
            <div className="mt-4 w-full h-0.5 bg-zinc-800 overflow-hidden">
              <div className="h-full bg-orange-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-6 container mx-auto relative z-10" id="skills">
        <div className="text-center mb-12">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-white text-xl"></span>
          </div>
          <h2 className="text-4xl font-light mb-2 tracking-tight" style={{ fontWeight: 300 }}>Technical Skills</h2>
          <p className="text-sm text-zinc-400 uppercase tracking-widest font-light">Technologies I'm Working With</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { name: 'HTML & CSS', level: '90%', icon: <Code2 /> },
            { name: 'JavaScript', level: '75%', icon: <FileCode2 /> },
            { name: 'React', level: '70%', icon: <Atom /> },
            { name: 'Tailwind CSS', level: '85%', icon: <Paintbrush /> },
            { name: 'Node.js', level: '60%', icon: <Server /> },
            { name: 'Git & GitHub', level: '80%', icon: <Github /> }
          ].map((skill, index) => (
            <div key={index} className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 p-6 hover:border-orange-500/30 transition-all duration-500 group rounded cursor-pointer transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className="flex items-center justify-between mb-3 relative z-10">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">{skill.icon}</span>
                  <p className="font-normal text-white group-hover:text-orange-500 transition-colors duration-300">{skill.name}</p>
                </div>
                <span className="text-orange-500 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">{skill.level}</span>
              </div>
              <div className="w-full bg-zinc-800/50 rounded-full h-1.5 overflow-hidden relative z-10">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-orange-600 h-full rounded-full transition-all duration-1000 group-hover:shadow-lg group-hover:shadow-orange-500/50"
                  style={{ width: '0%' }}
                  onMouseEnter={(e) => e.currentTarget.style.width = skill.level}
                  onMouseLeave={(e) => e.currentTarget.style.width = '0%'}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="py-20 px-6 container mx-auto relative z-10" id="education">
        <div className="text-center mb-12">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-white text-xl"></span>
          </div>
          <h2 className="text-4xl font-light mb-2 tracking-tight" style={{ fontWeight: 300 }}>Education & Learning</h2>
          <p className="text-sm text-zinc-400 uppercase tracking-widest font-light">My Learning Journey</p>
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          {[
            { title: 'Engineering Degree', institution: 'Gandhi Institute for Technology', year: '2022 - 2025', type: 'CERTIFICATE' },
            { title: 'HTML/CSS JS', institution: 'Glucian india pvt', year: '2023', type: 'CERTIFICATE' },
            { title: 'Core JAVA', institution: 'Jspider', year: '2023', type: 'CERTIFICATE' },
            { title: 'Responsive Web Design', institution: 'Scrimba', year: '2024', type: 'COMPLETED' },
            { title: 'React', institution: 'Scrimba', year: '2024', type: 'COMPLETED' }
          ].map((item, index) => (
            <div key={index} className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 p-6 hover:border-orange-500/30 transition-all duration-500 group rounded cursor-pointer transform hover:translate-x-2 hover:shadow-xl hover:shadow-orange-500/10 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center font-normal group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 rounded relative">
                    <span className="group-hover:scale-125 transition-transform duration-300">{item.title.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-normal text-white group-hover:text-orange-500 transition-colors duration-300">{item.title}</p>
                    <p className="text-sm text-zinc-400 font-light group-hover:text-zinc-300 transition-colors duration-300">{item.institution}</p>
                  </div>
                </div>
                <uuubdiv className="text-right transform group-hover:scale-105 transition-transform duration-300">
                  <p className="text-sm text-orange-500 uppercase tracking-wider font-light">{item.type}</p>
                  <p className="font-normal text-zinc-300 group-hover:text-white transition-colors duration-300">{item.year}</p>
                </uuubdiv>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Decorative Element */}
      <div className="fixed bottom-10 right-10 w-20 h-20 pointer-events-none opacity-30">
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
}