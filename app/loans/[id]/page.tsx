// app/loans/[id]/page.tsx

// VIEW a single loan
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import prisma from "@/lib/prisma"
import { DeleteLoanItem } from "@/components/loans/delete-loan-client"

const CURRENCY_SYMBOLS = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  CAD: 'C$',
  AUD: 'A$',
  JPY: '¥',
  NZD: 'NZ$'
} as const

export default async function LoanPage({ params }: { params: { id: string } }) {
  // Get the loan first
  const loan = await prisma.loan.findFirst({
    where: {
      id: String(params.id)
    }
  })

  // Handle not found case
  if (!loan) {
    return notFound()
  }

  return (
    <div className="container max-w-2xl mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Loan Details</h1>
        <div className="space-x-2">
          <Link href={`/loans/${loan.id}/edit`}>
            <Button variant="outline">Edit Loan</Button>
          </Link>
          <DeleteLoanItem loanId={loan.id} />
          <Link href="/loans">
            <Button variant="ghost">Back to Loans</Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{loan.borrowerName}</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Amount</dt>
              <dd className="text-2xl font-bold">
                {CURRENCY_SYMBOLS[loan.currency]}
                {loan.amount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Interest Rate</dt>
              <dd className="text-lg">{loan.interestRate}%</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Term</dt>
              <dd className="text-lg">{loan.term} months</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="text-lg">{loan.status}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Start Date</dt>
              <dd className="text-lg">
                {loan.startDate.toLocaleDateString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Created</dt>
              <dd className="text-lg">
                {loan.createdAt.toLocaleDateString()}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  )
}
