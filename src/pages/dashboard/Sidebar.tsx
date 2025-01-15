import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChartSpline, Database, File, Squirrel } from "lucide-react";
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
import Pinata from "./uploadPinata";
import { useBadge } from "@/hooks/badgeContext";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "react-router";


function Sidebar() {
  const [params] = useSearchParams()
  const github_avatar = params.get('github_avatar');
  const google_avatar = params.get('google_avatar')
  const navigate = useNavigate();
  console.log(google_avatar)
  const [activeComponent, setActiveComponent] = useState("home");
  const apiUrl = import.meta.env.VITE_API_URL;
  const { isNew, reset } = useBadge(); // Access reset from BadgeContext


  const handleCollectionsClick = () => {
    setActiveComponent("collections");
    reset(); // Reset the "New" state when clicking on the "collections" icon
  };

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
        return (
          <div>
            <Pinata />
          </div>
        );
      case "collections":
        return (
          <div>
            <AllCollection />
          </div>
        );
    }
  };
  return (
    <div>
  <div className="p-4 border-4 m-2  text-center  ">
    This is a demo of Clientverse admin dashboard. The database resets every
    hour. Realtime data and file upload are disabled.
  </div>
    <div className="flex  border-4 m-4 p-4 ">
      {/* Sidebar */}
      <div className="sm:w-24 w-34  bg-gray-950 text-white flex flex-col">
        <nav className="flex  flex-col  gap-2 p-4">
          <button
            onClick={() => setActiveComponent("home")}
            className="p-2 rounded hover:bg-gray-700"
          >
            <span title="Home">
              <Squirrel size={32} />
            </span>
          </button>
          <button
            onClick={handleCollectionsClick}
            className="p-2 rounded hover:bg-gray-700"
          >
            <span title="collections">
              <Database size={32} />
              {isNew && <Badge>New</Badge>} {/* Show "New" if isNew is true */}
            </span>
          </button>
          <button
            onClick={() => setActiveComponent("logs")}
            className="p-2 rounded hover:bg-gray-700"
          >
            <span title="logs">
              <ChartSpline size={32} />
            </span>
          </button>
          <button
            onClick={() => setActiveComponent("settings")}
            className="p-2 rounded hover:bg-gray-700"
          >
            <span title="settings">
              <File size={32} />
            </span>
          </button>
          <button className="p-2 rounded hover:bg-gray-700">
            <span title="make a new collection">
              <DialogDemo />
            </span>
          </button>

          <a href="#profile" title="Profile" className="mt-[400px]">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage
                    src={
                      google_avatar || github_avatar || "https://github.com/shadcn.png"
                    }
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
    </div>

  );

  
}

export default Sidebar;
