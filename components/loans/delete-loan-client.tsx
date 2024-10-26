'use client'

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Trash2 } from 'lucide-react'
import { DeleteLoan } from "./delete-loan"

export function DeleteLoanItem({ loanId }: { loanId: string }) {
  return (
    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
      <Trash2 className="mr-2 h-4 w-4" />
      <DeleteLoan loanId={loanId} />
    </DropdownMenuItem>
  )
}