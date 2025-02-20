import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useState, useEffect } from "react";

interface CollectionData {
  id: number;
  createdAt: Date | null;
  tableName: string;
  userId?: number;
  selectedFields: string[];
}

interface PaginationData {
  page: number; // Current page
  limit: number; // Number of items per page
  total: number; // Total number of collections
  totalPages: number; // Total number of pages
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const useFetchCollections = () => {
  const [data, setData] = useState<CollectionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const transformCollectionData = (collections: CollectionData[]): CollectionData[] => {
    return collections.map((item) => ({
      id: item.id,
      createdAt: item.createdAt ? new Date(item.createdAt) : null,
      tableName: item.tableName,
      userId: item.userId,
      selectedFields: Array.isArray(item.selectedFields)
        ? item.selectedFields
        : typeof item.selectedFields === "string"
        ? JSON.parse(item.selectedFields)
        : [],
    }));
  };
  const fetchData = async (page: number) => {
    setLoading(true);


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
      );

      if (response.ok) {
        const result = await response.json();
        if (result?.collections && result?.pagination) {
          setData(transformCollectionData(result.collections));
          setPagination(result.pagination);
     
        } else {
          console.error("Unexpected data format:", result);
        }
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
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
      );
      if (response.ok) {
        console.log("Collection deleted successfully");
        await fetchData(currentPage);
      } else {
        console.error("Failed to delete collection");
      }
    } catch (error) {
      console.error("Error deleting collection:", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (pagination && currentPage < pagination.totalPages)
      setCurrentPage((prev) => prev + 1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchData(page); // Fetch data for the selected page
  };

  return {
    data,
    loading,
    pagination,
    currentPage,
    setData,
    setCurrentPage,
    handlePrevious,
    fetchData,
    handleNext,
    handleDelete,
    handlePageChange,
  };
};
