import { useParams } from "react-router"; // Import useParams
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Import table components
// import { useFetchCollections } from "@/lib/utils"; // Import your data fetching hook
interface CardData {
  id: number;
  createdAt: string; // Adjust based on your actual data type
  tableName: string;
  userId: string; // Adjust based on your actual data type
  selectedFields: string;
  author: string;
}
function EditCard() {
  const { id } = useParams(); // Get the card ID from the URL
  const [cardData, setCardData] = useState<CardData | null>(null); // State to hold card data
  const [loading, setLoading] = useState(true); // Loading state

  // const { fetchData } = useFetchCollections(); // Fetch collections hook

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
        }); // Fetch card data by ID
        if (response.ok) {
          const result =  await response.json();
          console.log("Fetched card data:", result);
          // Access the first item in the data array
          const data: CardData = result.data.data[0]; 
          console.log(data)
          setCardData(data); // Set the card data
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
  // const selectedFields: string[] = [];
  if (loading) return <p>Loading card details...</p>;
  // Debugging: Check if cardData is defined and log selectedFields
  // console.log("Card Data:", cardData);
  // if (cardData) {
  //   console.log("Selected Fields:", cardData.selectedFields);
  // }

  return (
    <div>
      {/* Render the dynamic table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>         
            {
            
            cardData && JSON.parse(cardData.selectedFields).map(
              (
                field: string,
                index: string // Use optional chaining
              ) => (
                <TableHead key={index}>{field}</TableHead> // Render dynamic headers
              )
            )
           }
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{cardData?.id}</TableCell>
            <TableCell>{cardData?.author}</TableCell>
            {/* <TableCell>{cardData?.selectedFields.join(", ")}</TableCell>{" "} */}
            {/* Assuming selectedFields is an array */}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default EditCard;
