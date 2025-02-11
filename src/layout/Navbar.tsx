"use client";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Pricing } from "@/pages/Pricing";
import TwitterShareButton from "@/twitter/twitter";

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Check, FlameIcon, Github, Menu } from "lucide-react";
import { useEffect } from "react";
import { usePostHog } from 'posthog-js/react';

function Navbar() {
  const posthog = usePostHog()

  useEffect(() => {
    posthog?.capture("page_view", {
      page: "Navbar",
      url: window.location.href,
    });
  }, [posthog]);
  return (
    <div className={`font-Ubuntu `}>
      <nav className="sticky top-0 z-50">
        <ul
          className="flex max-w-full gap-0 sm:gap-4 items-center justify-between 
        border-b border-gray-800/50 
        p-2 sm:p-4 
        bg-background/95 backdrop-blur 
        supports-[backdrop-filter]:bg-background/80 
        shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          {/* Logo Section */}
          <li className="flex items-center group">
            <span className="mr-2">
              <FlameIcon className="h-6 w-6 text-red-400 group-hover:rotate-12 transition-transform duration-300" />
            </span>
            <span
              className="font-bold text-lg tracking-tight 
            bg-gradient-to-r from-primary to-slate-500 
            text-transparent bg-clip-text 
            group-hover:from-purple-500 group-hover:to-primary 
            transition-colors duration-300"
            >
              ContentVerse
            </span>
          </li>

          {/* Search Section */}
          <li className="flex-grow mx-4">
            <Input
              className="w-full max-w-[600px] h-10 
              border-gray-700 
              focus:ring-2 focus:ring-primary/50 
              transition-all duration-300 text-white"
              type="search"
              placeholder="Search..."
            />
          </li>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-4">
            <li>
              <div
                className="
              hover:text-primary 
              hover:underline 
              underline-offset-4 
              transition-all duration-300"
              >
                <Pricing />
              </div>
            </li>
            <li>
              <a
                target="_blank"
                href="https://github.com/Boby900/clientverse"
                className=" hover:text-primary transition-colors duration-300"
                rel="noreferrer"
              >
                <Github className="h-5 w-5 hover:scale-110 transition-transform" />
              </a>
            </li>
            <li>
              <a
                href="#"
                className="
              hover:text-primary 
              hover:underline 
              underline-offset-4 
              transition-all duration-300"
              >
                Documentation
              </a>
            </li>
            <li>
              <TwitterShareButton
                text="Check out Contentverse!"
                url="https://clientverse.vercel.app/"
                hashtags={["Contentverse", "CMS"]}
              />
            </li>
          </div>

          {/* Mobile Menu */}
          <li className="lg:hidden flex-shrink-0 max-w-full">
            <DropdownMenu>
              <DropdownMenuTrigger className="p-2 hover:bg-accent rounded-md transition-colors">
                <Menu className="h-6 w-6" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background/95 backdrop-blur">
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:bg-primary/10 transition-colors">
                  <span>
                    <Pricing />
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-primary/10 transition-colors">
                  <span>Documentation</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-primary/10 transition-colors">
                  <a
                    target="_blank"
                    href="https://github.com/Boby900/clientverse"
                    className="flex items-center w-full"
                    rel="noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    <span>GitHub</span>
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>
      </nav>
      <main className="container mx-auto px-4">
        <h4 className="text-center    text-3xl text-white font-thin my-12">
          <span className="shadow-lg shadow-slate-500/100">Open</span> Source
          CMS <br />
          for your next <strong className="font-bold">SaaS</strong> and{" "}
          <strong className="font-bold">Web app</strong>
          <br />
          <strong className="font-bold">
            in 1 pla<span className="shadow-lg shadow-yellow-500/50 ">ce</span>
          </strong>
        </h4>
        <div className="flex flex-wrap justify-center gap-4 p-6  text-white rounded-2xl shadow-lg transform transition-all duration-300  hover:shadow-2xl">
          {[
            "Realtime db",
            "Authentication",
            "File storage",
            "Dashboard",
            "Websockets",
          ].map((feature, index) => (
            <div
              key={index}
              className="flex items-center px-4 py-2 rounded-full transition-colors duration-300 group"
            >
              <Check className="mr-2 h-5 w-5 text-green-400 group-hover:text-green-300 transition-colors duration-300" />
              <span className="font-medium group-hover:text-green-200 transition-colors duration-300">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Navbar;
