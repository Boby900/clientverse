// import { useParams } from "react-router"; // Import useParams
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
function EditCard() {
  // const { id } = useParams(); // Get the card ID from the URL

  // if (loading) return <p>Loading card details...</p>;
  // if (error) return <p>Error loading card details.</p>;

  return (
    <Table>
      <TableCaption>All of your data.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>
          </TableHead>
          <TableHead>ID</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>GitHub ID</TableHead>
          <TableHead>GitHub Username</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
          <TableRow>
            <TableCell>
            </TableCell>
            <TableCell className="font-medium">Text</TableCell>
            <TableCell>Text</TableCell>
            <TableCell>Text</TableCell>
            <TableCell>Text</TableCell>
            <TableCell>Text</TableCell>
          </TableRow>
    
      </TableBody>
    </Table>
  );
}

export default EditCard;
