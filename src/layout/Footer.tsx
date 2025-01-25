import { Facebook, Twitter, Instagram } from "lucide-react";

import * as motion from "motion/react-client";
function Footer() {
  return (
    <div className="border-2 p-4 m-4">
      <div className="border-2 p-4 m-4">
        <p className="text-center p-2 m-2 text-2xl">
          Integrate nicely with your favorite framework
        </p>
        <div className="flex lg:flex-row flex-col justify-center items-center gap-8">
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <span>
              <img src="/vue.png" className="w-[5em]" alt="vue.js" />
            </span>
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <span>
              <img
                src="/svelte.png"
               className="w-[5em]"
                alt="svelte.js"
              />
            </span>
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <span>
              <img src="/angular.png" className="w-[5em]" alt="angular.js" />
            </span>
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <span>
              <img src="/react.png" className="w-[5em]" alt="react.js" />
            </span>
          </motion.button>
        </div>
      </div>
      <div className="border-2 p-4 m-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-2">About Us</h3>
            <p className="text-sm text-gray-600">
              We're passionate about creating tools that make developers' lives
              easier.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Connect With Us</h3>
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Contentverse. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default Footer;
