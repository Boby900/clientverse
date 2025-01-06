import { useState, useRef  } from "react";
import { pinata } from "@/utils/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoaderCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function Pinata() {
  const { toast } = useToast()

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmission = async () => {
  
      if (!selectedFile) {
        toast({
          title: "No file selected",
          description: "Please select a file to upload.",
          variant: "destructive",
        });
        return;
    }
    setLoading(true); // Start spinner
    try {
      const upload = await pinata.upload.file(selectedFile);
      
      console.log(upload);
      toast({
        title: "Upload Successful",
        description: `Your file "${selectedFile.name}" was uploaded successfully.`,
        variant: "default",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Stop spinner
      setSelectedFile(null); // Clear state
      // Clear input field
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="  m-2 p-2 ">
          
          <div>
            <p className="text-center font-mono text-2xl">Upload to Pinata</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 m-2 p-2">
        <div className="space-y-2">
          <Label htmlFor="file-upload" className="text-sm font-medium">
            Choose File
          </Label>
          <div className="flex items-center gap-2 m-2 p-2">
            <Input
              id="file-upload"
              type="file"
              ref={fileInputRef} // Attach ref to the input field
              onChange={changeHandler}
              className="file:mr-4 file:py-2 file:px-4  file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
            />
          </div>
        </div>
        <Button onClick={handleSubmission} className="w-full">
          {loading ? (
            <LoaderCircle className="animate-spin w-5 h-5" />
          ) : (
            // Spinner Icon
            "Submit" // Default text
          )}
        </Button>
      </CardContent>
    </Card>
  );
}

export default Pinata;
