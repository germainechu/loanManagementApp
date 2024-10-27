import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Delete the loan
    await prisma.loan.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting loan:', error)
    return NextResponse.json(
      { error: 'Failed to delete loan' },
      { status: 500 }
    )
  }
}