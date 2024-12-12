import { Button } from "@/components/ui/button";
import {
 
  FileCode,
  Plus,
 
} from "lucide-react";

function Sidebar2() {
  return (
    <div className="flex min-w-[200px] border-l-2  border-white  ">
      {/* Sidebar */}
      <div className="min-w-full bg-gray-800 text-white flex flex-col">
        <nav className="flex  flex-col  gap-4 p-4">
          <a href="#home" className="p-2 rounded hover:bg-gray-700">
            <div className="flex gap-2">
              <span>
                <FileCode />
              </span>
              <span>game</span>
            </div>
          </a>
          <a href="#about" className="p-2 rounded hover:bg-gray-700">
          <div className="flex gap-2">
              <span>
                <FileCode />
              </span>
              <span>messages</span>
            </div>
          </a>
          <a href="#services" className="p-2 rounded hover:bg-gray-700">
          <div className="flex gap-2">
              <span>
                <FileCode />
              </span>
              <span>posts</span>
            </div>
          </a>
          <a href="#contact" className="p-2 rounded hover:bg-gray-700">
          <div className="flex gap-2">
              <span>
                <FileCode />
              </span>
              <span>test</span>
            </div>
          </a>
          <a href="#profile" className="p-2 rounded hover:bg-gray-700">
          <div className="flex gap-2">
              <span>
                <FileCode />
              </span>
              <span>messages report</span>
            </div>
          </a>

          <Button><span><Plus /></span>New Collection</Button>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar2;
