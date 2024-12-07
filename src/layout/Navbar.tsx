import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Check, FlameIcon, Github, Menu } from "lucide-react";

function Navbar() {
  return (
    <div>
      <nav>
        <ul className="flex max-w-full gap-0  sm:gap-4 items-center justify-between lg:border p-0 sm:p-4 m-4 max-h-[80px] lg:border-gray-800">
          <li className="flex">
            <span>
              <FlameIcon />
            </span>
            ContentVerse
          </li>
          <li>
            <Input
              className="w-[200px] lg:w-[600px] h-10"
              type="search"
              placeholder="Search..."
            />
          </li>
          <li className="hidden lg:block">FAQ</li>
          <li className="hidden lg:block">
            <a href="#">
              <Github />
            </a>
          </li>
          <li>
            <a href="#" className="hidden lg:block">
              Documentation
            </a>
          </li>
          <li className="lg:hidden flex-shrink-0 max-w-full">
            <a href="" className="block">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Menu />
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
                    <span>Discussions</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </a>
          </li>
        </ul>
      </nav>
      <main>
        <h4 className="text-center text-3xl text-yellow-50 font-thin m-4 p-4">
          Open Source CMS <br />
          for your next <strong>SaaS</strong> and <strong>Web app </strong>
          <br />
          <strong>in 1 place</strong>
        </h4>
        <div className="flex flex-wrap  border max-h-full max-w-full gap-4 justify-center p-4 m-4 rounded-full bg-slate-800">
          <div className="flex">
            <span>
              <Check />
            </span>
            Realtime db
          </div>
          <div className="flex">
            <span>
              <Check />
            </span>
            Authentication
          </div>
          <div className="flex">
            <span>
              <Check />
            </span>
            File storage
          </div>
          <div className="flex">
            <span>
              <Check />
            </span>
            Dashboard
          </div>
          <div className="flex">
            <span>
              <Check />
            </span>
            Websockets
          </div>
        </div>
      </main>
    </div>
  );
}

export default Navbar;
