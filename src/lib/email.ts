import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
  attachments?: Array<{
    filename: string
    content: Buffer | string
  }>
}

export const sendEmail = async (options: EmailOptions): Promise<boolean> => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.warn('Email credentials not configured')
    return false
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.SMTP_USER,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
      attachments: options.attachments,
    })
    
    return true
  } catch (error) {
    console.error('Error sending email:', error)
    return false
  }
}

export const sendWelcomeEmail = async (email: string, name: string) => {
  return await sendEmail({
    to: email,
    subject: 'Welcome to Knowledge Camp Global!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1a1a1a;">Welcome to Knowledge Camp Global!</h1>
        <p>Hi ${name},</p>
        <p>Thank you for joining Knowledge Camp Global. We're excited to have you on board!</p>
        <p>Your account has been created successfully. You can now:</p>
        <ul>
          <li>Browse our course catalog</li>
          <li>Enroll in courses</li>
          <li>Track your progress</li>
          <li>Earn certificates</li>
        </ul>
        <p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" 
             style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
            Go to Dashboard
          </a>
        </p>
        <p>Best regards,<br>The Knowledge Camp Global Team</p>
      </div>
    `,
    text: `Welcome to Knowledge Camp Global! Hi ${name}, thank you for joining us.`,
  })
}

export const sendEnrollmentEmail = async (email: string, name: string, courseName: string) => {
  return await sendEmail({
    to: email,
    subject: `You're enrolled in ${courseName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1a1a1a;">Course Enrollment Confirmation</h1>
        <p>Hi ${name},</p>
        <p>You have successfully enrolled in <strong>${courseName}</strong>!</p>
        <p>You can start learning right away from your dashboard.</p>
        <p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/courses" 
             style="background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
            Start Learning
          </a>
        </p>
        <p>Best regards,<br>The Knowledge Camp Global Team</p>
      </div>
    `,
  })
}

export const sendCertificateEmail = async (
  email: string,
  name: string,
  courseName: string,
  certificatePdf: Buffer
) => {
  return await sendEmail({
    to: email,
    subject: `Your ${courseName} Certificate`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1a1a1a;">🎓 Congratulations!</h1>
        <p>Hi ${name},</p>
        <p>Congratulations on completing <strong>${courseName}</strong>!</p>
        <p>Your certificate is attached to this email. You can also download it anytime from your dashboard.</p>
        <p>We're proud of your achievement and hope you continue learning with us!</p>
        <p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/certificates" 
             style="background-color: #ffc107; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
            View All Certificates
          </a>
        </p>
        <p>Best regards,<br>The Knowledge Camp Global Team</p>
      </div>
    `,
    attachments: [
      {
        filename: `${courseName.replace(/[^a-z0-9]/gi, '_')}_Certificate.pdf`,
        content: certificatePdf,
      },
    ],
  })
}

export const sendPaymentConfirmationEmail = async (
  email: string,
  name: string,
  amount: number,
  courseName: string
) => {
  return await sendEmail({
    to: email,
    subject: 'Payment Confirmation - Knowledge Camp Global',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1a1a1a;">Payment Confirmed</h1>
        <p>Hi ${name},</p>
        <p>Thank you for your payment of <strong>$${amount.toFixed(2)}</strong>.</p>
        <p>Course: <strong>${courseName}</strong></p>
        <p>You now have full access to the course content.</p>
        <p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/courses" 
             style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
            Access Course
          </a>
        </p>
        <p>Best regards,<br>The Knowledge Camp Global Team</p>
      </div>
    `,
  })
}
