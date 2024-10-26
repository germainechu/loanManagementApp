// app/loans/new/page.tsx

// CREATE a new loan
import Link from "next/link"
import { redirect } from "next/navigation"
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
import { Prisma } from "@prisma/client"

// Define the type to match our Prisma Currency enum
type Currency = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'JPY' | 'NZD'


const CURRENCY_SYMBOLS = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  CAD: 'C$',
  AUD: 'A$',
  JPY: '¥',
  NZD: 'NZ$'
} as const

export default function NewLoanPage() {
  async function createLoan(formData: FormData) {
    "use server"
    
    const amountStr = (formData.get("amount") as string).replace(/[$,£€¥]/g, '')
    
    const loan = await prisma.loan.create({
      data: {
        borrowerName: formData.get("borrowerName") as string,
        amount: parseFloat(amountStr),
        currency: formData.get("currency") as Currency,
        interestRate: parseFloat(formData.get("interestRate") as string),
        term: parseInt(formData.get("term") as string),
        startDate: new Date(),
      },
    })

    redirect("/loans")
  }

  return (
    <div className="container max-w-2xl mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Create New Loan</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createLoan}>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="borrowerName">Borrower Name</Label>
                <Input
                  id="borrowerName"
                  name="borrowerName"
                  placeholder="John Doe"
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
                      placeholder="10,000.00"
                      pattern="^\d{1,3}(,\d{3})*(\.\d{0,2})?$"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select name="currency" defaultValue="USD">
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
                    placeholder="5.5"
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
                    placeholder="12"
                    className="pr-20"
                    required
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    months
                  </span>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit">Create Loan</Button>
                <Link href="/loans">
                  <Button variant="outline">Cancel</Button>
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}