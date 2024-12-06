import { Input } from "@/components/ui/input";
import { FlameIcon, Github, Menu } from "lucide-react";

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
           <a href="#"><Github /></a> 
          </li>
          <li>
            <a href="#" className="hidden lg:block">Documentation.</a>
          </li>
          <li className="lg:hidden flex-shrink-0 max-w-full">
            <a href="" className="block"><Menu /></a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
