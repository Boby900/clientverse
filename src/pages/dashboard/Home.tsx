"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { SkeletonCard } from "./Skeleton"
import { Checkbox } from "@/components/ui/checkbox"

type User = {
  id: number
  email: string
  createdAt: string
  githubId?: string
  username?: string
}

export function TableDemo() {
  const [userData, setUserData] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRows, setSelectedRows] = useState<number[]>([])

  // Handle select all checkbox
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(userData.map((user) => user.id))
    } else {
      setSelectedRows([])
    }
  }

  // Handle individual row selection
  const handleSelectRow = (checked: boolean, id: number) => {
    if (checked) {
      setSelectedRows((prev) => [...prev, id])
    } else {
      setSelectedRows((prev) => prev.filter((rowId) => rowId !== id))
    }
  }

  // Handle delete selected rows
  const handleDelete = () => {
    // Add your delete logic here
    console.log("Deleting rows:", selectedRows)
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const apiUrl = import.meta.env.VITE_API_URL
        const response = await fetch(`${apiUrl}/api/user`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        })
        const result = await response.json()
        setUserData(result.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="relative">
      {selectedRows.length > 0 && (
        <div className="absolute top-0 sm:top-100 right-0 sm:right-20 mb-4">
          <Button variant="destructive" size="sm" onClick={handleDelete} className="flex items-center gap-2">
            <Trash2 className="h-4 w-4" />
            Delete Selected ({selectedRows.length})
          </Button>
        </div>
      )}

      {loading ? (
        <SkeletonCard />
      ) : (
        <Table>
          <TableCaption>A list of recent users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedRows.length === userData.length}
                  onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                />
              </TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>GitHub ID</TableHead>
              <TableHead>GitHub Username</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userData.map((data) => (
              <TableRow key={data.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(data.id)}
                    onCheckedChange={(checked) => handleSelectRow(checked as boolean, data.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{data.id}</TableCell>
                <TableCell>{data.email || "N/A"}</TableCell>
                <TableCell>{data.createdAt}</TableCell>
                <TableCell>{data.username || "N/A"}</TableCell>
                <TableCell>{data.githubId || "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

