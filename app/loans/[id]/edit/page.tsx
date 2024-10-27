// app/loans/[id]/edit/page.tsx
import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import prisma from "@/lib/prisma"

const CURRENCY_SYMBOLS = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  CAD: 'C$',
  AUD: 'A$',
  JPY: '¥',
  NZD: 'NZ$'
} as const

export default async function EditLoanPage({ params }: { params: { id: string } }) {
  try {
    // Ensure params is resolved
    const { id } = await params;

    const loan = await prisma.loan.findUnique({
      where: { id }
    })

    if (!loan) {
      notFound()
    }
    async function updateLoan(formData: FormData) {
      'use server'

      const { id } = await params;
      const amountStr = (formData.get("amount") as string).replace(/[$,£€¥]/g, '')
      
      await prisma.loan.update({
        where: {
          id: id
        },
        data: {
          borrowerName: formData.get("borrowerName") as string,
          amount: parseFloat(amountStr),
          currency: formData.get("currency") as any,
          interestRate: parseFloat(formData.get("interestRate") as string),
          term: parseInt(formData.get("term") as string),
        },
      })

      redirect(`/loans/${id}`)
    }

    return (
      <div className="container max-w-2xl mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Edit Loan</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={updateLoan}>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="borrowerName">Borrower Name</Label>
                  <Input
                    id="borrowerName"
                    name="borrowerName"
                    defaultValue={loan.borrowerName}
                    required
                  />
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Loan Amount</Label>
                    <div className="relative">
                      <Input
                        id="amount"
                        name="amount"
                        type="text"
                        inputMode="decimal"
                        defaultValue={loan.amount.toString()}
                        pattern="^\d{1,3}(,\d{3})*(\.\d{0,2})?$"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select name="currency" defaultValue={loan.currency}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ({CURRENCY_SYMBOLS.USD})</SelectItem>
                        <SelectItem value="EUR">EUR ({CURRENCY_SYMBOLS.EUR})</SelectItem>
                        <SelectItem value="GBP">GBP ({CURRENCY_SYMBOLS.GBP})</SelectItem>
                        <SelectItem value="CAD">CAD ({CURRENCY_SYMBOLS.CAD})</SelectItem>
                        <SelectItem value="AUD">AUD ({CURRENCY_SYMBOLS.AUD})</SelectItem>
                        <SelectItem value="JPY">JPY ({CURRENCY_SYMBOLS.JPY})</SelectItem>
                        <SelectItem value="NZD">NZD ({CURRENCY_SYMBOLS.NZD})</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interestRate">Interest Rate</Label>
                  <div className="relative">
                    <Input
                      id="interestRate"
                      name="interestRate"
                      type="number"
                      min="0"
                      step="0.1"
                      defaultValue={loan.interestRate.toString()}
                      className="pr-7"
                      required
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      %
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="term">Term</Label>
                  <div className="relative">
                    <Input
                      id="term"
                      name="term"
                      type="number"
                      min="1"
                      defaultValue={loan.term.toString()}
                      className="pr-20"
                      required
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      months
                    </span>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="submit">Update Loan</Button>
                  <Link href={`/loans/${loan.id}`}>
                    <Button variant="outline">Cancel</Button>
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  } catch (error) {
    notFound()
  }
}
