import { useEffect } from "react";
import { Link, useNavigate, Outlet, useSearchParams } from "react-router";
import { motion } from "framer-motion";
import { BarChartIcon as ChartSpline, Database, File, Squirrel, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NewCollection } from "./NewCollection";
import { useBadge } from "@/hooks/badgeContext";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/hooks/userContext";

const menuItems = [
  { icon: Squirrel, title: "Home", path: "/dashboard" },
  { icon: Database, title: "Collections", path: "/dashboard/collections" },
  { icon: ChartSpline, title: "Logs", path: "/dashboard/logs" },
  { icon: File, title: "Settings", path: "/dashboard/settings" },
];

function Sidebar() {
  const { setUser, user } = useUser();
  const [params] = useSearchParams();
  const github_avatar = params.get("github_avatar");
  const google_avatar = params.get("google_avatar");
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { isNew, reset } = useBadge();

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

  const logout = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCollectionsClick = () => {
    reset();
    navigate("/dashboard/collections");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-300">
      <div className="p-4 text-center  text-gray-200 bg-gray-800 border-b border-gray-700">
        This is a demo of Clientverse admin dashboard. The database resets every hour. Realtime data and file upload are disabled.
      </div>
      <div className="flex flex-1">
        <aside className="w-20 sm:w-64 bg-gradient-to-r from-gray-900 to-gray-800 border-r border-gray-700">
          <nav className="flex flex-col h-full py-6">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <motion.div key={item.title} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to={item.path}
                    className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-gray-100 rounded-lg transition-colors duration-200"
                    onClick={item.title === "Collections" ? handleCollectionsClick : undefined}
                  >
                    <item.icon className="h-6 w-6 mr-4" />
                    <span className="hidden sm:inline">{item.title}</span>
                    {item.title === "Collections" && isNew && (
                      <Badge className="ml-auto bg-blue-600 text-gray-100">New</Badge>
                    )}
                  </Link>
                </motion.div>
              ))}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button className="w-full flex items-center px-2  text-gray-300 hover:bg-gray-800 hover:text-gray-100 rounded-lg transition-colors duration-200">
                  <NewCollection />
                </button>
              </motion.div>
            </div>
            <div className="mt-auto">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center w-full px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-gray-100 rounded-lg transition-colors duration-200">
                  <Avatar className="h-8 w-8 mr-4">
                    <AvatarImage
                      src={user?.googleAvatar || user?.githubAvatar || "https://github.com/shadcn.png"}
                      alt="User Avatar"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline">Profile</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-800 border-gray-700 text-gray-300">
                  <DropdownMenuItem onClick={logout} className="hover:bg-gray-700 focus:bg-gray-700">
                    <LogOut className="mr-2 h-4 w-4 cursor-pointer" />
                    <span className="cursor-pointer">Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </nav>
        </aside>
        <main className="flex-1 p-6 overflow-auto bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Sidebar;