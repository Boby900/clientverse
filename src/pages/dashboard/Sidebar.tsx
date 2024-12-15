import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChartSpline, Database, Squirrel, Wrench } from "lucide-react";
import Sidebar2 from "./Sidebar2";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

function Sidebar() {
  const [dropDown, setDropDown] = useState(false);
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  function toggleDropDown() {
    setDropDown(!dropDown);
    console.log("working");
  }
  async function logout() {
    try {
      const response = await fetch(`${apiUrl}/api/auth/logout`, {
        method: "POST",
        credentials: 'include', // Ensures cookies are sent with the request
        headers: {
          "Content-Type": "application/json",
        }
      });

      const result = await response.json();

      console.log(result);
      if (response.ok) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <div className="flex  border-4 m-4 p-4 ">
      {/* Sidebar */}
      <div className="sm:w-24 w-34  bg-gray-800 text-white flex flex-col">
        <nav className="flex  flex-col  gap-2 p-4">
          <a href="#home" className="p-2 rounded hover:bg-gray-700">
            <span title="Home">
              <Squirrel size={32} />
            </span>
          </a>
          <a href="#about" className="p-2 rounded hover:bg-gray-700">
            <span title="Collections">
              <Database size={32} />
            </span>
          </a>
          <a href="#services" className="p-2 rounded hover:bg-gray-700">
            <span title="Logs">
              <ChartSpline size={32} />
            </span>
          </a>
          <a href="#contact" className="p-2 rounded hover:bg-gray-700">
            <span title="Settings">
              <Wrench size={32} />
            </span>
          </a>
          <a href="#profile" title="Profile" className="mt-[400px]">
            {dropDown && (
              <Button onClick={logout} className="mb-2 p-2">
                Sign Out
              </Button>
            )}

            <button onClick={toggleDropDown}>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </button>
          </a>
        </nav>
      </div>
      <Sidebar2 />
      {/* Main Content */}
      <div className="flex p-6 overflow-auto">
        <h1 className="">Main Content Area should go here</h1>
      </div>
    </div>
  );
}

export default Sidebar;
