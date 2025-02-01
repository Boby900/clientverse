import { useParams } from "react-router";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

function EditCard() {
  const { id } = useParams();
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCardData = async () => {
      setLoading(true);
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
          const result = await response.json();
          setData(result);
        } else {
          console.error("Failed to fetch card data");
        }
      } catch (error) {
        console.error("Error fetching card data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCardData();
  }, [id]);

  if (loading) {
    return <div className="p-4 text-center">Loading card details...</div>;
  }

  if (!data) {
    return <div className="p-4 text-center">No data available</div>;
  }

  // Parse the selectedFields from metadata
  const columns = data.metadata[0]?.selectedFields
    ? JSON.parse(data.metadata[0].selectedFields)
    : [];

  // Add ID column as it's always present
  if (!columns.includes("id")) {
    columns.unshift("id");
  }

  return (
    <div className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column: string) => (
              <TableHead key={column} className="capitalize">
                {column.replace(/([A-Z])/g, " $1").trim()}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.tableData.map((row) => (
            <TableRow key={row.id}>
              {columns.map((column: string) => (
                <TableCell key={`${row.id}-${column}`}>
                  {row[column] || "N/A"}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default EditCard;
