"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast"
import { useFetchCollections } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import { useBadge } from "@/hooks/badgeContext";
import { z, ZodError} from "zod";
import { useNavigate } from "react-router";

const AVAILABLE_FIELDS = [
  { id: "created", label: "Created" },
  { id: "description", label: "Description" },
  { id: "author", label: "Author" },
  { id: "category", label: "Category" },
];

const FormSchema = z.object({
  name: z.string().min(3, { message: "Must be 3 or more characters long" }),
  fields: z.array(z.string()).min(1, { message: "At least one field must be selected" })
});

export function NewCollection() {
  const navigate = useNavigate();
  const [name, setName] = useState(""); // State for name
  const [validationError, setValidationError] = useState<string | null>(null); // State for validation error
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog visibility
  
  const { toast } = useToast()
  const { setNew } = useBadge();  // Get the `setNew` function from context

  const {fetchData, currentPage} = useFetchCollections();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    console.log(e.target.value);
    setValidationError(null); // Clear validation error as the user types
  };
  const handleCheckboxes = (fieldId: string) => {
    setSelectedFields((prev) =>
      prev.includes(fieldId)
        ? prev.filter((id) => id !== fieldId) // Remove it if already selected
        : [...prev, fieldId]  // Add if not selected
    );
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const payload = { name, fields: selectedFields};
    setLoading(true); // Start spinner
    try {
      const validatedData = FormSchema.parse(payload);

      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/api/collection`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
        credentials: 'include'
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log(data.message); // Success message
        // Optionally, clear the form or show a success notification
        console.log(currentPage)
        await fetchData(currentPage);
        setNew(); // This triggers the "New" state to be shown
        setName("");
        setSelectedFields([]);
        setIsDialogOpen(false)
        toast({
          title: "collection created successfully.",
          variant: "default"
        })
        navigate("/dashboard/collections"); // Navigate to collections

      } else {
        console.error(data.error); // Error message
      }
    } catch (error) {
      if (error instanceof ZodError) {
        setValidationError(error.errors[0]?.message || "Invalid input");
      } else {
        console.error("Unexpected error:", error);
      }
      setLoading(false);
    }
    finally{
      setLoading(false); // Stop spinner
    }
  };
  
  return (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Plus id="plus-icon" data-testid="plus-icon" size={36} />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>

          <DialogHeader>
            <DialogTitle>Make a new collection</DialogTitle>
            <DialogDescription>
              Make a new collection here. Select optional fields as needed. Hit
              submit when you're done.
            </DialogDescription>
            {validationError && (
              <p className="text-red-500 text-sm col-span-4">{validationError}</p>
            )}
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={handleNameChange}
                required
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right pt-2">Fields</Label>
              <div className="col-span-3 space-y-2 p-2">
                {AVAILABLE_FIELDS.map((field) => (
                  <div key={field.id} className="flex items-center space-x-2">
                    <Checkbox
                      onCheckedChange={()=> handleCheckboxes(field.id)}
                      id={field.id}
                    />
                    <Label htmlFor={field.id}>{field.label}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
            {loading ? (
            <LoaderCircle className="animate-spin w-5 h-5" />
          ) : (
            // Spinner Icon
            "Submit" // Default text
          )}
            </Button>
          </DialogFooter>
          </form>

        </DialogContent>
      </Dialog>
  );
}
