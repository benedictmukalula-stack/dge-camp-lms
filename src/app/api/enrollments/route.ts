import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { sendEnrollmentEmail } from '@/lib/email'

// POST /api/enrollments - Create a new enrollment
export async function POST(request: NextRequest) {
  try {
    // TODO: Get userId from session
    const body = await request.json()
    const { userId, courseId } = body

    // Check if already enrolled
    const existing = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Already enrolled in this course' },
        { status: 400 }
      )
    }

    // Create enrollment
    const enrollment = await prisma.enrollment.create({
      data: {
        userId,
        courseId,
        status: 'ACTIVE',
      },
      include: {
        course: true,
        user: true,
      },
    })

    // Send enrollment email
    if (enrollment.user.email && enrollment.user.name) {
      await sendEnrollmentEmail(
        enrollment.user.email,
        enrollment.user.name,
        enrollment.course.title
      )
    }

    return NextResponse.json(enrollment, { status: 201 })
  } catch (error) {
    console.error('Error creating enrollment:', error)
    return NextResponse.json(
      { error: 'Failed to create enrollment' },
      { status: 500 }
    )
  }
}

// GET /api/enrollments - Get user's enrollments
export async function GET(request: NextRequest) {
  try {
    // TODO: Get userId from session
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      )
    }

    const enrollments = await prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: {
          include: {
            creator: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
      },
      orderBy: {
        enrolledAt: 'desc',
      },
    })

    return NextResponse.json(enrollments)
  } catch (error) {
    console.error('Error fetching enrollments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch enrollments' },
      { status: 500 }
    )
  }
}
