"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { SkeletonCard } from "./Skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import { handleUserDelete } from "@/lib/del-user";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type User = {
  id: number;
  email: string;
  createdAt: string;
  githubId?: string;
  username?: string;
};

export function TableDemo() {
  const [userData, setUserData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/api/user`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      setUserData(result.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, []);

  // Handle select all checkbox
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(userData.map((user) => user.id));
    } else {
      setSelectedRows([]);
    }
  };

  // Handle individual row selection
  const handleSelectRow = (checked: boolean, id: number) => {
    if (checked) {
      setSelectedRows((prev) => [...prev, id]);
    } else {
      setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
    }
  };

  // Handle delete selected rows
  const handleDelete = async (ids: number[]) => {
    await handleUserDelete(ids);
    setSelectedRows([]); // Clear selection
    fetchData(); // Refetch users
  };

  return (
    <div>
      {loading ? (
        <SkeletonCard />
      ) : (
        <Table>
          <TableCaption>A list of recent users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedRows.length === userData.length}
                  onCheckedChange={(checked) =>
                    handleSelectAll(checked as boolean)
                  }
                />
              </TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>GitHub ID</TableHead>
              <TableHead>GitHub Username</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userData.map((data) => (
              <TableRow key={data.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(data.id)}
                    onCheckedChange={(checked) =>
                      handleSelectRow(checked as boolean, data.id)
                    }
                  />
                </TableCell>
                <TableCell className="font-medium">{data.id}</TableCell>
                <TableCell>{data.email || "N/A"}</TableCell>
                <TableCell>{data.createdAt}</TableCell>
                <TableCell>{data.username || "N/A"}</TableCell>
                <TableCell>{data.githubId || "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          {selectedRows.length > 0 && (
            <TableFooter>
              <TableRow>
                <TableCell colSpan={6}>
                  <div className="flex justify-center gap-4">
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-8 px-4 py-2">
                        {selectedRows.length === userData.length ? (
                              <p>Delete All</p>
                            ) : (
                              <p>Delete Selected ({selectedRows.length})</p>
                            )} 
                        </div>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your record and remove your data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(selectedRows)}
                            className="flex items-center gap-2"
                          >
                            <Trash2 className="h-4 w-4" />
                            {selectedRows.length === userData.length ? (
                              <p>Delete All</p>
                            ) : (
                              <p>Delete Selected ({selectedRows.length})</p>
                            )}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      )}
    </div>
  );
}
