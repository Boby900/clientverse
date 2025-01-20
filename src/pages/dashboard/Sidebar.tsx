import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChartSpline, Database, File, Squirrel } from "lucide-react";
import { Outlet, useSearchParams } from "react-router"; // Import useSearchParams
import { Link, useNavigate } from "react-router"; // Import Link
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NewCollection } from "./NewCollection";
import { useBadge } from "@/hooks/badgeContext";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import { useUser } from "@/hooks/userContext";
function Sidebar() {
  const { setUser, user } = useUser();
  const [params] = useSearchParams();
  const github_avatar = params.get("github_avatar");
  const google_avatar = params.get("google_avatar");
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const { isNew, reset} = useBadge(); // Access reset from BadgeContext
  useEffect(() => {
    if (github_avatar || google_avatar) {
      setUser({
        githubAvatar: github_avatar || undefined,
        googleAvatar: google_avatar || undefined,
      });
    }
  }, [github_avatar, google_avatar, setUser]);
  async function logout() {
    // Logout logic
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
  const handleCollectionsClick = () => {
    reset(); // Reset the "New" state
    navigate("/dashboard/collections"); // Navigate to collections
  };

  return (
    <div>
      <div className="p-4 border-4 m-2 text-center">
        This is a demo of Clientverse admin dashboard. The database resets every
        hour. Realtime data and file upload are disabled.
      </div>
      <div className="flex border-4 m-4 p-4">
        {/* Sidebar */}
        <div className="sm:w-24 w-34 bg-gray-950 text-white flex flex-col">
          <nav className="flex flex-col gap-2 p-4">
            <Link to="/dashboard" className="p-2 rounded hover:bg-gray-700">
              <span title="Home">
                <Squirrel size={32} />
              </span>
            </Link>
            <button
              onClick={handleCollectionsClick} // Use the click handler
              className="p-2 rounded hover:bg-gray-700"
            >
              <span title="Collections">
                <Database size={32} />
                {isNew && <Badge>New</Badge>}{" "}
                {/* Show "New" if isNew is true */}
              </span>
            </button>
            <Link
              to="/dashboard/logs"
              className="p-2 rounded hover:bg-gray-700"
            >
              <span title="Logs">
                <ChartSpline size={32} />
              </span>
            </Link>
            <Link
              to="/dashboard/settings"
              className="p-2 rounded hover:bg-gray-700"
            >
              <span title="Settings">
                <File size={32} />
              </span>
            </Link>
            <button className="p-2 rounded hover:bg-gray-700">
              <span title="Make a new collection">
                <NewCollection />
              </span>
            </button>

            <a href="#profile" title="Profile" className="mt-[400px]">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage
                      src={
                        user?.googleAvatar ||
                        user?.githubAvatar ||
                        "https://github.com/shadcn.png"
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
        <div className="m-6 p-6 w-screen">
          {/* Use <Outlet /> to render child components */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
