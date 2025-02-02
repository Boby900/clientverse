import { createContext, useContext, useState, useEffect, ReactNode } from "react";
const apiUrl = import.meta.env.VITE_API_URL;

interface Role{
    role: "admin" | "viewer";
    id: string;
    name: string | null;
    email: string | null;
    githubId: string | null;
    username: string | null;
    googleId: string | null;
    createdAt: Date | null;
}
interface RoleProviderProps {
    children: ReactNode;
  }
  
  const UserContext = createContext<Role | null>(null);
export const RoleProvider = ({ children }: RoleProviderProps) => {
    const [user, setUser] = useState<Role | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/user/by-id`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const result = await response.json();
        if (result.status === "success" && Array.isArray(result.data) && result.data.length > 0) {
            setUser(result.data[0]); // Extract the first user from the array
          } else {
            console.error("Error fetching user data:");

            setUser(null); // Handle cases where there's no user data
          }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useRole = () => useContext(UserContext);
