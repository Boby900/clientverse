import { useState } from "react";
import { pinata } from "@/utils/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoaderCircle, Upload } from "lucide-react";

function Pinata() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmission = async () => {
    if (!selectedFile) {
      console.log("No file selected");
      return;
    }
    setLoading(true); // Start spinner
    try {
      const upload = await pinata.upload.file(selectedFile);
      console.log(upload);
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false); // Stop spinner
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className=" flex items-center gap-8 m-2 p-2 border-2">
          <div>
            <Upload className="w-5 h-5" />
          </div>
          <div>
            <p>Upload to Pinata</p>
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
              onChange={changeHandler}
              className="file:mr-4 file:py-2 file:px-4  file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
            />
          </div>
        </div>
        <Button onClick={handleSubmission} className="w-full">
        {loading ? (
                        <LoaderCircle  className="animate-spin w-5 h-5" />
                        // Spinner Icon
          ) : (
            "Submit" // Default text
          )}
        </Button>
      </CardContent>
    </Card>
  );
}

export default Pinata;
