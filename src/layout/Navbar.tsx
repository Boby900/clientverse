"use client"

import { DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import TwitterShareButton from "@/twitter/twitter"
import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Check, FlameIcon, Github, Menu } from "lucide-react"

function Navbar() {

  return (
    <div
      className={` bg-gradient-to-br bg-linear-to-r from-zinc-800 via-stone-900 to-zinc-900`}
    >
      <nav>
        <ul className="flex max-w-full gap-0 sm:gap-4 items-center justify-between lg:border-2 border-white p-0 sm:p-4 m-4 max-h-[80px]  lg:border-gray-600 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <li className="flex items-center">
            <span className="mr-2">
              <FlameIcon className="h-6 w-6 text-primary" />
            </span>
            <span className="font-bold text-lg">ContentVerse</span>
          </li>
          <li className="flex-grow mx-4">
            <Input className="w-full max-w-[600px] h-10" type="search" placeholder="Search..." />
          </li>
          <li className="hidden lg:block">
            <a href="#" className="hover:text-primary transition-colors">
              FAQ
            </a>
          </li>
          <li className="hidden lg:block">
            <a
              target="_blank"
              href="https://github.com/Boby900/clientverse"
              className="hover:text-primary transition-colors"
              rel="noreferrer"
            >
              <Github className="h-5 w-5" />
            </a>
          </li>
          <li className="hidden lg:block">
            <a href="#" className="hover:text-primary transition-colors">
              Documentation
            </a>
          </li>
          <li className="hidden lg:block">
            <TwitterShareButton
              text="Check out Contentverse!"
              url="https://clientverse.vercel.app/"
              hashtags={["Contentverse", "CMS"]}
            />
          </li>
          <li className="lg:hidden flex-shrink-0 max-w-full">
            <DropdownMenu>
              <DropdownMenuTrigger className="p-2">
                <Menu className="h-6 w-6" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span>FAQ</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Documentation</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a
                    target="_blank"
                    href="https://github.com/Boby900/clientverse"
                    className="flex items-center"
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
        <h4 className="text-center text-3xl text-white font-thin my-12">
          Open Source CMS <br />
          for your next <strong className="font-bold">SaaS</strong> and <strong className="font-bold">Web app</strong>
          <br />
          <strong className="font-bold">in 1 place</strong>
        </h4>
        <div className="flex flex-wrap justify-center gap-4 p-6 rounded-full bg-secondary text-secondary-foreground">
          {["Realtime db", "Authentication", "File storage", "Dashboard", "Websockets"].map((feature, index) => (
            <div key={index} className="flex items-center">
              <Check className="mr-2 h-5 w-5 text-primary" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Navbar

