import { Facebook, Twitter, Instagram } from "lucide-react";

import * as motion from "motion/react-client";
import UserReviews from "./Review";
import BrandCarousel from "./Carousel";
function Footer() {
  const frameworks = [
    { src: "/vue.png", alt: "Vue.js", name: "vue" },
    { src: "/svelte.png", alt: "Svelte.js", name: "svelte" },
    { src: "/angular.png", alt: "Angular.js", name: "angular" },
    { src: "/react.png", alt: "React.js", name: "react" },
  ];

  return (
    <div className=" p-4 m-4">
      <div className="bg-background/3 rounded-2xl p-6 m-4 shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in">
      <div className="p-4 m-4">
          <BrandCarousel />
        </div>
        <p
          className="text-center p-2 m-2 text-3xl font-bold text-foreground/80 
        bg-gradient-to-r from-primary to-purple-500 
        bg-clip-text"
        >
          Integrate Nicely with Your Favorite Framework
        </p>
        <div className="flex lg:flex-row flex-col justify-center items-center gap-8 p-4">
          {frameworks.map(({ src, alt, name }) => (
            <motion.button
              key={name}
              whileHover={{
                scale: 1.1,
                rotate: 3,
                transition: { duration: 0.2 },
              }}
              whileTap={{
                scale: 0.95,
                rotate: -3,
                transition: { duration: 0.1 },
              }}
              className="
              p-4 
              rounded-xl 
              hover:bg-primary/10 
              border border-transparent 
              hover:border-primary/30 
              transition-all 
              duration-300 
              text-[0.8em]
              group"
            >
              <span className="block">
                <img
                  src={src}
                  className="w-[5em] 
                  grayscale 
                  group-hover:grayscale-0 
                  opacity-70 
                  group-hover:opacity-100 
                  transition-all 
                  duration-300"
                  alt={alt}
                />
              </span>
            </motion.button>
          ))}
        </div>
    
        <div >
          <UserReviews />
        </div>
      </div>
      <footer className="bg-background/5 rounded-2xl p-8 m-4 shadow-sm hover:shadow-lg transition-shadow duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-4 
            bg-gradient-to-r from-primary to-purple-500 
            text-transparent bg-clip-text">
            About Us
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We're passionate about creating tools that make developers' lives easier, 
            focusing on intuitive, powerful solutions that streamline your workflow.
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4 
            bg-gradient-to-r from-primary to-purple-500 
            text-transparent bg-clip-text">
            Connect With Us
          </h3>
          <div className="flex justify-center space-x-6">
            {[
              { Icon: Facebook, href: "#", color: "text-blue-600" },
              { Icon: Twitter, href: "#", color: "text-sky-500" },
              { Icon: Instagram, href: "#", color: "text-pink-600" }
            ].map(({ Icon, href, color }) => (
              <a 
                key={color} 
                href={href} 
                className={`
                  ${color} 
                  hover:scale-110 
                  transition-transform 
                  duration-300 
                  opacity-70 
                  hover:opacity-100`}
              >
                <Icon size={24} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-xs text-muted-foreground border-t border-border pt-4">
        © {new Date().getFullYear()} Contentverse. 
        <span className="block mt-2 text-xs">
          All rights reserved. Built with passion for developers.
        </span>
        <span>
          Built with ❤️ by Contentverse Team
        </span>
      </div>
    </footer>
    </div>
  );
}

export default Footer;
