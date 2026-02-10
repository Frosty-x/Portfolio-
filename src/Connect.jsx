import React from "react";
import LogoLoop from "../bits/LogoLoop.jsx";
import { SiInstagram, SiGithub, SiLinkedin, SiX } from "react-icons/si";

const techLogos = [
  { node: <SiInstagram />, title: "Instagram", href: "https://www.instagram.com/_fr0sty___/" },
  { node: <SiGithub />, title: "GitHub", href: "https://github.com/Frosty-x" },
  { node: <SiLinkedin />, title: "LinkedIn", href: "https://www.linkedin.com/in/abhijit-mohanta-57660137b/" },
  { node: <SiX />, title: "X", href: "https://x.com/Abhijit18091787" },
];

const Connect = () => {
  return (
    <section className="h-full w-full bg-linear-to-br  from-[#2b1b4d] via-[#120822] to-black text-white px-10 py-10">
      
      {/* Top Title */}
      <div className="text-center mb-24">
        <h1 className="text-6xl font-extrabold tracking-wide">Let’s Connect</h1>
        <p className="mt-4 text-lg text-gray-300">
          Crafting ideas into reality, one conversation at a time.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 pb-7 md:grid-cols-2 gap-20 items-center max-w-6xl mx-auto">

        {/* Left */}
        <div className="space-y-8">
         <h2 className="text-5xl md:text-6xl font-bold leading-tight bg-clip-text text-zinc-500 ">
  Ready to Transform Your Vision? <br /> Let’s Collaborate and Create Magic
</h2>
        </div>

        {/* Right */}
        <div className="space-y-6 text-gray-600">
          <p>
            I’m always excited to discuss new projects, innovative ideas, or just a friendly chat about technology and design. Reach out and let’s make something extraordinary.
          </p>

          <div>
            <h4 className="text-white font-semibold">LOCATION</h4>
            <p>India </p>
          </div>

          <div>
            <h4 className="text-white font-semibold">PHONE</h4>
            <p>+91 79789 97295 </p>
          </div>

          <div>
            <h4 className="text-white font-semibold">EMAIL</h4>
            <p>abhijeet2002mohanta@gmail.com ✉️</p>
          </div>

          <div className="pb-25">
            <h4 className="text-white font-semibold">FIND ME ON SOCIALS</h4>
            <div className="flex gap-4 mt-2 text-2xl">
              {techLogos.map((logo, index) => (
                <a
                  key={index}
                  href={logo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-400 transition transform hover:scale-125"
                  title={logo.title}
                >
                  {logo.node}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Logo Loop */}
      <LogoLoop
        logos={techLogos}
        speed={100}
        direction="left"
        logoHeight={40}
        gap={60}
        hoverSpeed={0}
        scaleOnHover
        fadeOut
        fadeOutColor="#000000"
        ariaLabel="Technology partners"
      />
    </section>
  );
};

export default Connect;
