import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/db'
import { sendPaymentConfirmationEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    )
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    )
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object
        
        // Update payment record
        await prisma.payment.updateMany({
          where: { stripePaymentId: paymentIntent.id },
          data: { status: 'SUCCEEDED' },
        })

        // Get payment details to send confirmation
        const payment = await prisma.payment.findFirst({
          where: { stripePaymentId: paymentIntent.id },
          include: {
            user: true,
          },
        })

        if (payment && payment.user.email && payment.user.name) {
          await sendPaymentConfirmationEmail(
            payment.user.email,
            payment.user.name,
            payment.amount,
            payment.description || 'Course enrollment'
          )
        }
        break

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object
        
        await prisma.payment.updateMany({
          where: { stripePaymentId: failedPayment.id },
          data: { status: 'FAILED' },
        })
        break

      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}
