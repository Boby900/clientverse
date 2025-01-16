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
// import { PaginationDemo } from "./pagination";
import { useFetchCollections } from "@/lib/utils";
import { useNavigate } from "react-router";

function AllCollection() {
  const { scrollYProgress } = useScroll();
  const navigate = useNavigate();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

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
                  onClick={() => navigate(`/dashboard/card/${card.id}`)} 
                >
                  Edit
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
