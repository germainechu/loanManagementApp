'use client'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Pencil } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function EditLoanItem({ loanId }: { loanId: string }) {
  const router = useRouter()

  return (
    <DropdownMenuItem onClick={() => router.push(`/loans/${loanId}/edit`)}>
      <Pencil className="mr-2 h-4 w-4" />
      Edit
    </DropdownMenuItem>
  )
}
