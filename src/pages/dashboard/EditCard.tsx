"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useParams, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Loader2 } from "lucide-react";
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
} from "@/components/ui/alert-dialog.tsx";
import { ProfileForm } from "./ProfileForm";
import { BreadcrumbNavigation } from "./BreadCrumb";
interface TableRow {
  id: string;
  [key: string]: string;
}

interface Metadata {
  id: number;
  userId: string;
  tableName: string;
  selectedFields: string;
  createdAt: string;
}

interface ApiResponse {
  tableData: TableRow[];
  metadata: Metadata[];
}
interface ApiData {
  message: string;
  tableData: TableRow[];
  metadata: Metadata[];
}

function EditCard() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const tableName = searchParams.get("tableName") || "";
  const [data, setData] = useState<ApiResponse | null>(null);
  const [collectionName, setCollectionName] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [refreshing, setRefreshing] = useState(false);

  const fetchCardData = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/api/collection/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const result: ApiData = await response.json();
        setData(result);
        const collectionName = result.metadata[0].tableName;
        console.log("result", collectionName);
        setCollectionName(collectionName);
      } else {
        console.error("Failed to fetch card data");
      }
    } catch (error) {
      console.error("Error fetching card data:", error);
    } finally {
      if (isRefresh) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchCardData();
  }, [id]);

  const handleRefresh = () => {
    fetchCardData(true);
  };
  const handleSelectAll = () => {
    if (selectedRows.size === data?.tableData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(data?.tableData.map((row) => row.id) || []));
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleDelete = async () => {
    if (selectedRows.size === 0) return;
    const apiUrl = import.meta.env.VITE_API_URL;
    const idsToDelete = Array.from(selectedRows);

    try {
      const response = await fetch(`${apiUrl}/api/collection/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ids: idsToDelete,
          collectionName: collectionName,
        }),
      });

      if (response.ok) {
        // Remove deleted rows from UI
        console.log(JSON.stringify({ ids: idsToDelete }));
        setData((prev) =>
          prev
            ? {
                ...prev,
                tableData: prev.tableData.filter(
                  (row) => !idsToDelete.includes(row.id)
                ),
              }
            : null
        );
        setSelectedRows(new Set()); // Clear selection
      } else {
        console.error("Failed to delete rows");
      }
    } catch (error) {
      console.error("Error deleting rows:", error);
    }
  };
  if (loading) {
    return (
      <div className="col-span-full flex items-center justify-center gap-2">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!data) {
    return <div className="p-4 text-center">No data available</div>;
  }

  // Parse the selectedFields from metadata
  const columns = data.metadata[0]?.selectedFields
    ? JSON.parse(data.metadata[0].selectedFields)
    : [];
  const filteredColumns = columns.filter((col: string) => col !== "id");
  // Add ID column as it's always present
  if (!columns.includes("id")) {
    columns.unshift("id");
  }

  return (
    <div className="p-4 relative">
      <BreadcrumbNavigation
        collectionName={collectionName}
        onRefresh={handleRefresh}
      />

      {refreshing ? (
        <div className="flex items-center m-8 p-8 justify-center">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : (
        <>
          <Table>
            <TableCaption>A list of your recent data.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={
                      selectedRows.size === data.tableData.length &&
                      data.tableData.length > 0
                    }
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                {columns.map((column: string) => (
                  <TableHead key={column} className="capitalize">
                    {column.replace(/([A-Z])/g, " $1").trim()}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.tableData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + 1}
                    className="h-24 text-center"
                  >
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <p className="text-muted-foreground">No data available</p>
                      <Sheet>
                        <SheetTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-destructive-foreground hover:bg-secondary/90 h-8 px-4 py-2">
                          New Record <Plus className="ml-1" size={20} />
                        </SheetTrigger>
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle>
                              New {tableName || ""} record
                            </SheetTitle>
                            <ProfileForm
                              selectedFields={filteredColumns}
                              tableName={tableName}
                            />
                          </SheetHeader>
                        </SheetContent>
                      </Sheet>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                data.tableData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedRows.has(row.id)}
                        onCheckedChange={() => handleSelectRow(row.id)}
                      />
                    </TableCell>
                    {columns.map((column: string) => (
                      <TableCell key={`${row.id}-${column}`}>
                        {row[column] || "N/A"}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {selectedRows.size > 0 && (
            <div className="fixed bottom-6 inset-x-0 flex justify-center">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="lg" className="shadow-lg">
                    Delete Selected ({selectedRows.size})
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your record.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="flex items-center gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete Selected ({selectedRows.size})
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default EditCard;
