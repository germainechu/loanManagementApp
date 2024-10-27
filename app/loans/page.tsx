// app/loans/page.tsx

// VIEW Loan Dashboard (see all loans)
import prisma from '@/lib/prisma'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { LoanActions } from '@/components/loans/loan-actions'

const CURRENCY_SYMBOLS = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  CAD: 'C$',
  AUD: 'A$',
  JPY: '¥',
  NZD: 'NZ$'
} as const

export default async function LoansPage() {
  const loans = await prisma.loan.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Loans</h1>
        <Link href="/loans/new">
          <Button>Create New Loan</Button>
        </Link>
      </div>

      {loans.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No Loans Found</CardTitle>
            <CardDescription>
              Create your first loan to get started.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {loans.map((loan) => (
            <Card key={loan.id} className="relative">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-bold">{loan.borrowerName}</CardTitle>
                <LoanActions loanId={loan.id} />
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm text-gray-500">Amount</dt>
                    <dd className="text-lg font-semibold">
                      {CURRENCY_SYMBOLS[loan.currency]}
                      {loan.amount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Interest Rate</dt>
                    <dd>{loan.interestRate}%</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Status</dt>
                    <dd>{loan.status}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Term</dt>
                    <dd>{loan.term} months</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}