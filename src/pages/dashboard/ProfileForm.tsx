"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;
interface ProfileFormProps {
  selectedFields: string[];
  tableName: string
}

export function ProfileForm({ selectedFields, tableName }: ProfileFormProps) {
  const fieldsToRender = selectedFields.filter((field) => field !== "created");
  console.log(fieldsToRender)
  const [formData, setFormData] = useState(
    fieldsToRender.reduce((acc, field) => {
      acc[field] = ""; // Initialize each field with an empty string
      return acc;
    }, {} as Record<string, string>)
  );

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

       // Construct the payload
       const payload = {
        tableName, // Use shorthand for concise object syntax
        formData,
      };
  
      console.log("Payload:", JSON.stringify(payload, null, 2));
    try {
      const response = await fetch(`${apiUrl}/api/collection/insert`, {
        method: "POST",
        credentials: "include", // Ensures cookies are sent with the request
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // Send form data

      }
    );
    if (response.ok) {
      console.log("Form submitted successfully", payload);
    } else {
      console.error("Failed to submit form");
    }
  } catch (error) {
    console.error("Error:", error);
  }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
    {fieldsToRender.map((field) => (
      <div key={field} className="space-y-2">
        <Label htmlFor={field}>{field}</Label>
        <Input
          id={field}
          name={field}
          value={formData[field]}
          onChange={(e) => handleInputChange(field, e.target.value)}
          placeholder={`Enter ${field}`}
        />
      </div>
    ))}
    <Button type="submit">Submit</Button>
  </form>
  );
}
