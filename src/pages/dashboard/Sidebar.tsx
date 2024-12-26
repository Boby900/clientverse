import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChartSpline, Database, Squirrel, Wrench } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DialogDemo } from "./NewCollection";
import { TableDemo } from "./Home";
import AllCollection from "./AllCollection";
interface SidebarProps {
  githubAvatar: string | null;
}
function Sidebar(props: SidebarProps) {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState("home");
  const apiUrl = import.meta.env.VITE_API_URL;

  async function logout() {
    try {
      const response = await fetch(`${apiUrl}/api/auth/logout`, {
        method: "POST",
        credentials: "include", // Ensures cookies are sent with the request
        headers: {
          "Content-Type": "application/json",
        },
      });


      if (response.ok) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  const renderContent = () => {
    switch (activeComponent) {
      case "home":
        return <TableDemo />;
      case "logs":
        return <h1>Logs Component</h1>;
      case "settings":
        return <h1>Settings Component</h1>;
      case "collections":
        return <div><AllCollection /></div>;
    }
  };
  return (
    <div className="flex  border-4 m-4 p-4 ">
      {/* Sidebar */}
      <div className="sm:w-24 w-34  bg-gray-950 text-white flex flex-col">
        <nav className="flex  flex-col  gap-2 p-4">
          <button
            onClick={() => setActiveComponent("home")}
            className="p-2 rounded hover:bg-gray-700"
          >
            <span title="Home">
              <Squirrel  size={32} />
            </span>
          </button>
          <button
            onClick={() => setActiveComponent("collections")}
            className="p-2 rounded hover:bg-gray-700"
          >
            <span title="collections">
              <Database  size={32} />
            </span>
          </button>
          <button
            onClick={() => setActiveComponent("logs")}
            className="p-2 rounded hover:bg-gray-700"
          >
            <span title="logs">
              <ChartSpline  size={32} />
            </span>
          </button>
          <button
            onClick={() => setActiveComponent("settings")}
            className="p-2 rounded hover:bg-gray-700"
          >
            <span title="settings">
              <Wrench  size={32} />
            </span>
          </button>
          <button
            className="p-2 rounded hover:bg-gray-700"
          >
            <span title="make a new collection">
              <DialogDemo />
            </span>
          </button>

          <a href="#profile" title="Profile" className="mt-[400px]">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                <AvatarImage 
                    src={props.githubAvatar ? props.githubAvatar : "https://github.com/shadcn.png"} 
                    alt="User Avatar" 
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <button onClick={logout}>Sign Out</button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </a>
        </nav>
      </div>
      {/* Main Content */}
      <div className="m-6 p-6 w-screen">{renderContent()}</div>
    </div>
  );
}

export default Sidebar;
