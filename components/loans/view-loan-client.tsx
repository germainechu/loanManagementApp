'use client'

import { useRouter } from 'next/navigation'
import { Eye } from 'lucide-react'

export function ViewLoanItem({ loanId }: { loanId: string }) {
  const router = useRouter()

  return (
    <div className="flex items-center w-full" onClick={() => router.push(`/loans/${loanId}`)}>
      <Eye className="mr-2 h-4 w-4" />
      View Details
    </div>
  )
}