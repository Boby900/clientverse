"use client"

import { ChevronRight, Home, RefreshCw } from "lucide-react"
import { Link } from "react-router"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface BreadcrumbNavigationProps {
  collectionName?: string;
  onRefresh: () => void;  // Accept a function to trigger re-fetch

}

const LOCAL = import.meta.env.VITE_LOCAL_URL;
const PROD = import.meta.env.VITE_PROD_URL;
const BASE_URL = import.meta.env.DEV ? LOCAL : PROD; // Conditional check

export function BreadcrumbNavigation({ collectionName = "Collection Name", onRefresh }: BreadcrumbNavigationProps) {
  return (
    <div className="flex items-center w-full py-4 mb-4 border-b">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                to={`${BASE_URL}/dashboard/collections`}
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                <Home className="h-4 w-4" />
                <span>Collections</span>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className="text-sm font-medium truncate max-w-[300px] md:max-w-[500px]">
              {collectionName}
            </BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbPage title="refresh"  onClick={onRefresh} className="text-sm cursor-pointer ml-2 font-medium truncate max-w-[300px] md:max-w-[500px]">
            <RefreshCw size={18}/>

            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}

