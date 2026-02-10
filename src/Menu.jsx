import React from "react";
import InfiniteMenu from "../bits/InfiniteMenu.jsx";
import DecryptedText from "../bits/DecryptedText.jsx";
import TextType from "../bits/TextType.jsx";
const items = [
  {
    image: "/ABOUT.jpg",
    link: "/About",
    title: <DecryptedText text="ABOUT ME" />,
    description: (
      <TextType text={[`Just a curious dev figuring things out.`]} />
    ),
  },
  {
    image: "/HOBBIES.png",
    link: "https://google.com/",
    title: <DecryptedText text="HOBBIES" />,
    description: <TextType text={[`When I’m not coding `]} />,
  },
  {
    image: "/PROJECT.jpg",
    link: "/Project",
    title: <DecryptedText text="PROJECTS" />,
    description: (
      <TextType
        text={[
          `Stuff I’ve built. Check them out!`,
        ]}
      />
    ),
  },
  {
    image: "/CONNECT.jpg",
    link: "/Connect",
    title: <DecryptedText text="CONNECT" />,
    description: <TextType text={[`I don’t bite,promise.Let’s talk.`]} />,
  },
];

const Menu = () => {
  return (
    <div className="w-full font-orbitron bg-gray-900 text-zinc-300">
      <InfiniteMenu items={items} scale={1.1} />
    </div>
  );
};
export default Menu;
