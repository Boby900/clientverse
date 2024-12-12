import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { ChartSpline, Database, Squirrel, Wrench } from "lucide-react";


function Sidebar(){
  return (
    <div className="flex">
    {/* Sidebar */}
    <div className="sm:w-24 w-34 h-screen bg-gray-800 text-white flex flex-col">
     
      <nav className="flex flex-col gap-4 p-4">
        <a href="#home" className="p-2 rounded hover:bg-gray-700">
          <span title="home"><Squirrel size={32} /></span>
        </a>
        <a href="#about" className="p-2 rounded hover:bg-gray-700">
          <span title="Collections"><Database size={32} /></span>
        </a>
        <a href="#services" className="p-2 rounded hover:bg-gray-700">
          <span title="Logs"><ChartSpline size={32} /></span>
        </a>
        <a href="#contact" className="p-2 rounded hover:bg-gray-700">
          <span title="Settings"><Wrench size={32} /></span>
        </a>
        <a href="">
        <Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>

        </a>
      </nav>
    </div>

    {/* Main Content */}
    <div className="flex-1 p-6">
      <h1 className="">Main Content Area</h1>
    </div>
  </div>
  );
};

export default Sidebar;
