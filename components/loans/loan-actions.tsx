'use client'

// client component to handle delete, edit, and view details for a loan
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react"
import { useRouter } from "next/navigation"
import { DeleteLoan } from "./delete-loan"

export function LoanActions({ loanId }: { loanId: string }) {
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => router.push(`/loans/${loanId}`)}>
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Trash2 className="mr-2 h-4 w-4" />
          <DeleteLoan loanId={loanId} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
