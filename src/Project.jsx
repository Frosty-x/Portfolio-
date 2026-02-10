import React from 'react';
import ChromaGrid from '../bits/ChromaGrid.jsx';
import TextPressure from '../bits/TextPressure.jsx';
import StaggeredMenu from '../bits/StaggeredMenu.jsx'

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
  { label: 'Services', ariaLabel: 'View our services', link: '/services' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
];
const items = [
  {
    image: "/Bk.jpg",
    title: "Massage website",
    subtitle: "Book massage easily",
    handle: "@AbhijitMohanta",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: "https://bkbodymassage.netlify.app/"
  },
  {
    image: "/Notes.jpg",
    title: "Save Notes",
    subtitle: "Create notes easily",
    handle: "@AbhijitMohanta",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://github.com/Frosty-x/NoteItDown.git"
  },
  {
    image: "/Bjack.jpg",
    title: "Black Jack Game",
    subtitle: "Wanna Play Black Jack!",
    handle: "@AbhijitMohanta",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: "https://github.com/Frosty-x/BLACK-JACK.git"
  },
  {
    image: "/Site.jpg",
    title: "Website Saver",
    subtitle: "Save sites in one click",
    handle: "@AbhijitMohanta",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: "https://github.com/Frosty-x/site-saver.git"
  }
];

const Project = () => {
  return (
    <section className="bg-black min-h-screen w-full ">
      {/* ===== TITLE ===== */}
<div className="w-full flex justify-center items-center py-10">
  <div className="w-105 md:w-130">
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
</div>

      {/* ===== PROJECT GRID ===== */}
      <div className='gap-8'>
        <ChromaGrid
        items={items}
        radius={300}
        damping={0.45}
        fadeOut={0.6}
        ease="power3.out"
      />
      </div>
      

    </section>
  );
};

export default Project;
