import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { SkeletonCard } from "./Skeleton";

type User = {
  id: number; // Adjust based on the actual type of `id`
  email: string;
  createdAt: string;
  githubId?: string; // Optional field
  username?: string; // Optional field
};

export function TableDemo() {
  const [userData, setUserData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching
try{
  const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/api/user`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      console.log(result);
      setUserData(result.data);
} catch(error){
  console.error(error)
}finally {
  setLoading(false); // Set loading to false after fetching
}
    
    };
    fetchData();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="border-white border-2">
      {loading?(<SkeletonCard />):(<Table>
        <TableCaption>A list of recent users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>GitHub ID</TableHead>
            <TableHead>GitHub Username</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userData.map((data) => (
            <TableRow key={data.id}>
              <TableCell className="font-medium">{data.id}</TableCell>
              <TableCell>{data.email || "N/A"}</TableCell>
              <TableCell>{data.createdAt}</TableCell>
              <TableCell>{data.username || "N/A"}</TableCell>
              <TableCell>{data.githubId || "N/A"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>

      </Table>)}
    </div>
  );
}
