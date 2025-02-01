"use client"

import { useState, useRef } from "react"
import { pinata } from "@/utils/config"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LoaderCircle, Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function Pinata() {
  const { toast } = useToast()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleSubmission = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const upload = await pinata.upload.file(selectedFile)
      console.log(upload)
      toast({
        title: "Upload Successful",
        description: `Your file "${selectedFile.name}" was uploaded successfully.`,
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your file.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
      setSelectedFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <Card className="w-full max-w-md border bg-card/50 shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-mono">Upload to Pinata</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="file-upload" className="text-sm font-medium">
                Choose File
              </Label>
              <div className="rounded-lg border border-dashed border-muted-foreground/25 p-4">
                <Input
                  id="file-upload"
                  type="file"
                  ref={fileInputRef}
                  onChange={changeHandler}
                  className="file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
                />
              </div>
            </div>
            <Button onClick={handleSubmission} className="w-full font-medium" disabled={loading || !selectedFile}>
              {loading ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload File
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

