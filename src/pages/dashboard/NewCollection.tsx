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

const AVAILABLE_FIELDS = [
  { id: "created", label: "Created" },
  { id: "description", label: "Description" },
  { id: "author", label: "Author" },
  { id: "category", label: "Category" },
];

export function DialogDemo() {
  const [name, setName] = useState(""); // State for name
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog visibility
  const { toast } = useToast()


  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    console.log(e.target.value);
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
  
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/api/collection`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: 'include'
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log(data.message); // Success message
        // Optionally, clear the form or show a success notification
        setName("");
        setSelectedFields([]);
        setIsDialogOpen(false)
        toast({
          title: "collection created successfully.",
          variant: "default"
        })
      } else {
        console.error(data.error); // Error message
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  
  return (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Plus  size={36} />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>

          <DialogHeader>
            <DialogTitle>Make a new collection</DialogTitle>
            <DialogDescription>
              Make a new collection here. Select optional fields as needed. Hit
              submit when you're done.
            </DialogDescription>
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
              Submit
            </Button>
          </DialogFooter>
          </form>

        </DialogContent>
      </Dialog>
  );
}
