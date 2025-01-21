"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Create a dynamic schema based on selectedFields
const generateSchema = (fields: string[]) => {
  const shape = fields.reduce((acc, field) => {
    acc[field] = z.string().min(2, `${field} is required`);
    return acc;
  }, {} as Record<string, z.ZodTypeAny>);

  return z.object(shape);
};

interface ProfileFormProps {
  selectedFields: string[];
}

export function ProfileForm({ selectedFields }: ProfileFormProps) {
  const formSchema = generateSchema(selectedFields);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: selectedFields.reduce((acc, field) => {
      acc[field] = ""; // Initialize each field with an empty string
      return acc;
    }, {} as Record<string, string>),
  });

  const onSubmit = (values: Record<string, string>) => {
    console.log("Form submitted with values:", values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {selectedFields.map((fieldName) => (
          <FormField
            key={fieldName}
            control={form.control}
            name={fieldName}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fieldName}</FormLabel>
                <FormControl>
                  <Input placeholder={`Enter ${fieldName}`} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
