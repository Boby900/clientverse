"use client";
import { motion, useSpring, useScroll } from "motion/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flame } from "lucide-react";
import { useEffect, useState } from "react";
// import { PaginationDemo } from "./pagination";

interface CollectionData {
  id: number;
  createdAt: Date | null;
  tableName: string;
  userId: number;
}

interface PaginationData {
  page: number; // Current page
  limit: number; // Number of items per page
  total: number; // Total number of collections
  totalPages: number; // Total number of pages
}

function AllCollection() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [data, setData] = useState<CollectionData[]>([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch data when the component mounts

  const fetchData = async (page: number) => {
    setLoading(true); // Start loading state
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(
        `${apiUrl}/api/collection/get_collections?page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      ); // Replace with the correct API endpoint
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        if (result?.collections && result?.pagination) {
          setData(result.collections); // Set the fetched collections array
          setPagination(result.pagination); // Update state with pagination metadata
        } else {
          console.error("Unexpected data format:", result);
        }
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Mark loading as complete
    }
  };

  // Fetch data whenever the component mounts or `currentPage` changes
  useEffect(() => {
    fetchData(currentPage); // Fetch data for the current page
  }, [currentPage]);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (pagination && currentPage < pagination.totalPages)
      setCurrentPage((prev) => prev + 1);
  };
  const handleVisit = () => {
    console.log("hurray");
  };

  const handleDelete = async (id: number) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(
        `${apiUrl}/api/collection/del_collections/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      ); // Replace with the correct API endpoint
      if (response.ok) {
        console.log("Collection deleted successfully");
        await fetchData(currentPage); // Refetch data for the current page
      } else {
        console.error("Failed to delete collection");
      }
    } catch (error) {
      console.error("Error deleting collection:", error);
    }
  };

  return (
    <div className="grid sm:grid-cols-2 gap-6 p-6  rounded-lg">
      {loading ? (
        <p>Loading collections...</p>
      ) : data.length > 0 ? (
        data.map((card, index) => (
          <div key={index}>
            <motion.div
              style={{
                scaleX,
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                height: 10,
                originX: 0,
                backgroundColor: "#ff0088   ",
              }}
            />
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <CardHeader className="relative overflow-hidden pb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-foreground opacity-10"></div>
                <Flame className={`w-8 h-8 text-purple-500 mb-2`} />
                <CardTitle className="text-lg font-bold">
                  {card.tableName}
                </CardTitle>
                <CardDescription>table id {card.id}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  user id {card.userId}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleVisit()}
                >
                  Visit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(card.id)}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))
      ) : (
        <p>No collections found.</p>
      )}
      {!loading && pagination && pagination.totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center space-x-4">
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
