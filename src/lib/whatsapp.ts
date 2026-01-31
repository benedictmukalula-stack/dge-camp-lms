import axios from 'axios'

const WHATSAPP_API_TOKEN = process.env.WHATSAPP_API_TOKEN
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID
const WHATSAPP_API_URL = 'https://graph.facebook.com/v18.0'

export interface WhatsAppMessage {
  to: string
  type: 'text' | 'template'
  text?: {
    body: string
  }
  template?: {
    name: string
    language: {
      code: string
    }
    components?: any[]
  }
}

export const sendWhatsAppMessage = async (to: string, message: string): Promise<boolean> => {
  if (!WHATSAPP_API_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) {
    console.warn('WhatsApp credentials not configured')
    return false
  }

  try {
    const response = await axios.post(
      `${WHATSAPP_API_URL}/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: 'whatsapp',
        to,
        type: 'text',
        text: {
          body: message,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${WHATSAPP_API_TOKEN}`,
        },
      }
    )

    return response.data.messages?.[0]?.id !== undefined
  } catch (error) {
    console.error('Error sending WhatsApp message:', error)
    return false
  }
}

export const sendCourseEnrollmentNotification = async (phoneNumber: string, courseName: string) => {
  const message = `🎉 Welcome to Knowledge Camp Global!\n\nYou have successfully enrolled in "${courseName}".\n\nAccess your course at: ${process.env.NEXT_PUBLIC_APP_URL}/dashboard/courses\n\nNeed help? Reply to this message!`
  
  return await sendWhatsAppMessage(phoneNumber, message)
}

export const sendCertificateNotification = async (phoneNumber: string, courseName: string, certificateUrl: string) => {
  const message = `🎓 Congratulations!\n\nYou have completed "${courseName}" and earned your certificate!\n\nDownload it here: ${certificateUrl}\n\nShare your achievement!`
  
  return await sendWhatsAppMessage(phoneNumber, message)
}

export const sendPaymentConfirmation = async (phoneNumber: string, amount: number, courseName: string) => {
  const message = `✅ Payment Confirmed\n\nAmount: $${amount.toFixed(2)}\nCourse: ${courseName}\n\nThank you for your payment! You now have full access to the course.`
  
  return await sendWhatsAppMessage(phoneNumber, message)
}

export const routeToSupport = async (phoneNumber: string, userName: string, issue: string) => {
  // This would route to support team's WhatsApp
  const supportMessage = `New support request from ${userName} (${phoneNumber}):\n\n${issue}`
  
  // In production, this would send to support team's number
  // For now, we'll just log it
  console.log('Support request:', supportMessage)
  
  // Send confirmation to user
  const userMessage = `Thank you for contacting Knowledge Camp Global support! Our team will respond shortly.\n\nYour request: ${issue}`
  
  return await sendWhatsAppMessage(phoneNumber, userMessage)
}
