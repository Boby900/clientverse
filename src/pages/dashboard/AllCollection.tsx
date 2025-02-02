"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Flame, MoveRight, PlusCircle, Trash2 } from "lucide-react";
// import { PaginationDemo } from "./pagination";
import { useFetchCollections } from "@/lib/utils";
import { useNavigate } from "react-router";
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
import { Badge } from "@/components/ui/badge";

import { ProfileForm } from "@/pages/dashboard/ProfileForm";
import { useRole } from "@/hooks/roleContext";
import { useEffect, useState } from "react";

function AllCollection() {
  const [roleData, setRoleData] = useState<"admin" | "viewer" | null>(null);

  const navigate = useNavigate();

  const {
    data,
    loading,
    pagination,
    currentPage,
    handlePrevious,
    handleNext,
    handleDelete,
    handlePageChange,
  } = useFetchCollections();

  const role = useRole();
  useEffect(() => {
    if (role?.role) {
      setRoleData(role.role);
    }
  }, [role]); // Run effect when `role` changes

  console.log("Role Data:", roleData);

  if (!role) {
    return "role is possibly null";
  }

  return (
    <div className="grid sm:grid-cols-2 gap-6 p-6  rounded-lg">
      {loading ? (
        <p>Loading collections...</p>
      ) : data.length > 0 ? (
        data.map((card, index) => {
          const selectedFields = card.selectedFields; // Parse selected fields for each card
          return (
            <div key={index}>
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                <CardHeader className="relative overflow-hidden pb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-foreground opacity-10"></div>
                  <Flame className={`w-8 h-8 mb-2`} />
                  <CardTitle className="text-lg truncate font-bold">
                    {card.tableName}
                  </CardTitle>
                </CardHeader>
                <CardDescription className="text-center font-bold p-1">
                  Selected fields
                </CardDescription>
                <CardContent>
                  {Array.isArray(selectedFields) &&
                  selectedFields.length > 0 ? (
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {selectedFields.map((field, fieldIndex) => (
                        <Badge key={fieldIndex} variant="outline">
                          {field}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p>Invalid fields data</p>
                  )}
                </CardContent>

                <CardFooter className="flex justify-between items-center">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                      navigate(`/dashboard/collections/${card.id}`)
                    }
                  >
                    Visit <MoveRight />
                  </Button>
                  {/* add the form in here to submit the data and insert it into the specific table*/}
                  <Sheet>
                    <SheetTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-destructive-foreground hover:bg-secondary/90 h-8 px-4 py-2">
                      Insert data <PlusCircle size={20} />{" "}
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>
                          New {card.tableName || ""} record
                        </SheetTitle>
                        <ProfileForm
                          selectedFields={selectedFields}
                          tableName={card.tableName}
                        />
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>
                  <AlertDialog>
                    <AlertDialogTrigger>
                      {roleData === "viewer" ? (
                        ""
                      ) : (
                        <div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-8 px-4 py-2">
                          Delete <Trash2 size={16} />
                        </div>
                      )}
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
                          onClick={() => handleDelete(card.id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardFooter>
              </Card>
            </div>
          );
        })
      ) : (
        <p>No collections found.</p>
      )}
      {!loading && pagination && pagination.totalPages > 1 && (
        <div className="mt-8 flex gap-1 items-center space-x-4">
          {/* "Previous" button */}
          <Button
            onClick={handlePrevious}
            disabled={currentPage === 1} // Disable if on the first page
            variant="outline"
          >
            Previous
          </Button>
          {/* Current page display */}
          <span className="text-sm">
            Page {currentPage} of {pagination.totalPages}
          </span>

          {/* Numbered pagination */}
          <div className="flex space-x-2">
            {pagination.totalPages > 5 ? (
              <>
                {/* Always show the first two pages */}
                <Button
                  key={1}
                  onClick={() => handlePageChange(1)}
                  variant={currentPage === 1 ? "default" : "outline"}
                >
                  1
                </Button>
                <Button
                  key={2}
                  onClick={() => handlePageChange(2)}
                  variant={currentPage === 2 ? "default" : "outline"}
                >
                  2
                </Button>

                {/* Add "..." if currentPage is far from the beginning */}
                {currentPage > 4 && <span>...</span>}

                {/* Show the current page if it's between the first and last two */}
                {currentPage > 2 && currentPage < pagination.totalPages - 1 && (
                  <Button
                    key={currentPage}
                    onClick={() => handlePageChange(currentPage)}
                    variant="default"
                  >
                    {currentPage}
                  </Button>
                )}

                {/* Add "..." if currentPage is far from the end */}
                {currentPage < pagination.totalPages - 3 && <span>...</span>}

                {/* Always show the last two pages */}
                <Button
                  key={pagination.totalPages}
                  onClick={() => handlePageChange(pagination.totalPages)}
                  variant={
                    currentPage === pagination.totalPages
                      ? "default"
                      : "outline"
                  }
                >
                  {pagination.totalPages}
                </Button>
              </>
            ) : (
              // Render all pages if totalPages <= 5
              Array.from({ length: pagination.totalPages }, (_, index) => (
                <Button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  variant={currentPage === index + 1 ? "default" : "outline"}
                >
                  {index + 1}
                </Button>
              ))
            )}
          </div>
          {/* "Next" button */}
          <Button
            onClick={handleNext}
            disabled={currentPage === pagination.totalPages} // Disable if on the last page
            variant="outline"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

export default AllCollection;
