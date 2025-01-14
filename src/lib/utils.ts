import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useState, useEffect, useRef } from "react";

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

interface CacheData {
  data: CollectionData[];
  pagination: PaginationData;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const useFetchCollections = () => {
  const [data, setData] = useState<CollectionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Cache for fetched pages
  const cache = useRef<Record<number, CacheData>>({});
  const fetchData = async (page: number) => {
    setLoading(true);

    // Check if the data for the page is already cached
    if (cache.current[page]) {
      console.log("Serving from cache:", cache.current[page]);
      setData(cache.current[page].data);
      setPagination(cache.current[page].pagination);
      setLoading(false);
      return;
    }
  console.log("Fetching from server for page:", page);


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
          setData(result.collections);
          setPagination(result.pagination);
           // Cache the fetched data
        cache.current[page] = {
          data: result.collections,
          pagination: result.pagination,
        };
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
