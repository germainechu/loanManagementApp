import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

/**
 * Deletes a loan from the database.
 * @param {Request} request - The HTTP request object.
 * @param {Object} params - The parameters object.
 * @param {string} params.id - The ID of the loan to delete.
 * @returns {NextResponse} The response indicating success or failure.
 */
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