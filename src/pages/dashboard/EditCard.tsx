"use client"

import { useParams } from "react-router"
import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface TableRow {
  id: string
  [key: string]: string
}

interface Metadata {
  id: number
  userId: string
  tableName: string
  selectedFields: string
  createdAt: string
}

interface ApiResponse {
  tableData: TableRow[]
  metadata: Metadata[]
}
interface ApiData {
  message: string,
  tableData: TableRow[]
  metadata: Metadata[]
}

function EditCard() {
  const { id } = useParams()
  const [data, setData] = useState<ApiResponse | null>(null)
  const [collectionName, setCollectionName] = useState("")
  const [loading, setLoading] = useState(true)
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())

  useEffect(() => {
    const fetchCardData = async () => {
      setLoading(true)
      try {
        const apiUrl = import.meta.env.VITE_API_URL
        const response = await fetch(`${apiUrl}/api/collection/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        })

        if (response.ok) {
          const result: ApiData = await response.json()
          setData(result)
          const collectionName = result.metadata[0].tableName
          console.log("result",collectionName)
          setCollectionName(collectionName)
        } else {
          console.error("Failed to fetch card data")
        }
      } catch (error) {
        console.error("Error fetching card data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCardData()
  }, [id])
  const handleSelectAll = () => {
    if (selectedRows.size === data?.tableData.length) {
      setSelectedRows(new Set())
    } else {
      setSelectedRows(new Set(data?.tableData.map((row) => row.id) || []))
    }
  }

  const handleSelectRow = (id: string) => {
    setSelectedRows((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const handleDelete = async () => {
    if (selectedRows.size === 0) return
    const apiUrl = import.meta.env.VITE_API_URL
    const idsToDelete = Array.from(selectedRows)
  
    try {
      const response = await fetch(`${apiUrl}/api/collection/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ ids: idsToDelete, collectionName: collectionName }),
      })
  
      if (response.ok) {
        // Remove deleted rows from UI
        console.log(JSON.stringify({ ids: idsToDelete }))
        setData((prev) =>
          prev
            ? {
                ...prev,
                tableData: prev.tableData.filter((row) => !idsToDelete.includes(row.id)),
              }
            : null
        )
        setSelectedRows(new Set()) // Clear selection
      } else {
        console.error("Failed to delete rows")
      }
    } catch (error) {
      console.error("Error deleting rows:", error)
    }
  }
  if (loading) {
    return <div className="p-4 text-center">Loading card details...</div>
  }

  if (!data) {
    return <div className="p-4 text-center">No data available</div>
  }

  // Parse the selectedFields from metadata
  const columns = data.metadata[0]?.selectedFields ? JSON.parse(data.metadata[0].selectedFields) : []

  // Add ID column as it's always present
  if (!columns.includes("id")) {
    columns.unshift("id")
  }

  return (
    <div className="p-4 relative min-h-screen">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedRows.size === data.tableData.length && data.tableData.length > 0}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            {columns.map((column: string) => (
              <TableHead key={column} className="capitalize">
                {column.replace(/([A-Z])/g, " $1").trim()}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.tableData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Checkbox checked={selectedRows.has(row.id)} onCheckedChange={() => handleSelectRow(row.id)} />
              </TableCell>
              {columns.map((column: string) => (
                <TableCell key={`${row.id}-${column}`}>{row[column] || "N/A"}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedRows.size > 0 && (
        <div className="fixed bottom-6 inset-x-0 flex justify-center">
          <Button variant="destructive" size="lg" onClick={handleDelete} className="shadow-lg">
            <Trash2 className="mr-2 h-5 w-5" />
            Delete Selected ({selectedRows.size})
          </Button>
        </div>
      )}
    </div>
  )
}

export default EditCard

