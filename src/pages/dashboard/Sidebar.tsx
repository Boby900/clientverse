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

  const { isNew, reset } = useBadge(); // Access reset from BadgeContext
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else if (github_avatar || google_avatar) {
      const newUser = {
        githubAvatar: github_avatar || undefined,
        googleAvatar: google_avatar || undefined,
      };
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
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
        localStorage.removeItem("user");
        setUser(null);
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
    <div className="flex flex-col h-screen">
      <div className="p-4 m-2 text-center">
        This is a demo of Clientverse admin dashboard. The database resets every
        hour. Realtime data and file upload are disabled.
      </div>
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="sm:w-24 w-34 bg-gray-950 text-white flex flex-col">
          <nav className="flex flex-col gap-4 items-center p-4 h-full">
            {/* Top Section */}
            <div className="flex flex-col gap-4 items-center">
              <Link to="/dashboard" className="p-2 rounded hover:bg-gray-700">
                <span title="Home">
                  <Squirrel size={32} />
                </span>
              </Link>
              <button
                data-testid="collections"
                onClick={handleCollectionsClick}
                className="p-2 rounded hover:bg-gray-700"
              >
                <span title="Collections">
                  <Database size={32} />
                  {isNew && <Badge>New</Badge>}
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
            </div>

            {/* Profile Section */}
            <div className="mt-auto">
              <DropdownMenu>
                <DropdownMenuTrigger data-testid="logout">
                  <Avatar data-testid="avatar">
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
                    <button data-testid="logoutButton" onClick={logout}>
                      Sign Out
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 m-6 p-6 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;