// components/loans/delete-loan.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface DeleteLoanProps {
  loanId: string
  onDeleteSuccess?: () => void
}

export function DeleteLoan({ loanId, onDeleteSuccess }: DeleteLoanProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  async function deleteLoan() {
    setIsDeleting(true)
    try {
      const response = await fetch(`/loans/${loanId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete loan')
      }

      router.refresh()
      onDeleteSuccess?.()
    } catch (error) {
      console.error('Error deleting loan:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <span className="w-full">Delete</span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the loan
            and all associated payment records.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={deleteLoan}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
