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
// Initialize formData with empty strings for each field
const initialFormData = fieldsToRender.reduce((acc, field) => {
  acc[field] = ""; // Initialize each field with an empty string
  return acc;
}, {} as Record<string, string>);
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false); // State to track loading

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submission starts

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
      console.log("Form submitted successfully", payload)
      setFormData(initialFormData); // Reset form data to initial state
      ;
    } else {
      console.error("Failed to submit form");
    }
  } catch (error) {
    console.error("Error:", error);
  }
  finally {
    setLoading(false); // Set loading to false after submission completes
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
    <Button type="submit" disabled={loading}>
    {loading ? "Submitting..." : "Submit"} {/* Show loading text */}
    </Button>
  </form>
  );
}
