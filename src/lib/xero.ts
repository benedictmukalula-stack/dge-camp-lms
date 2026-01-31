import { XeroClient } from 'xero-node'

let xeroClient: XeroClient | null = null

export const getXeroClient = () => {
  if (!xeroClient) {
    if (!process.env.XERO_CLIENT_ID || !process.env.XERO_CLIENT_SECRET) {
      throw new Error('Missing Xero credentials')
    }

    xeroClient = new XeroClient({
      clientId: process.env.XERO_CLIENT_ID,
      clientSecret: process.env.XERO_CLIENT_SECRET,
      redirectUris: [process.env.XERO_REDIRECT_URI || 'http://localhost:3000/api/auth/xero/callback'],
      scopes: ['accounting.transactions', 'accounting.contacts'],
    })
  }

  return xeroClient
}

export const createInvoice = async (
  tenantId: string,
  contactId: string,
  lineItems: Array<{ description: string; quantity: number; unitAmount: number }>,
  dueDate?: Date
) => {
  const client = getXeroClient()
  
  const invoice: any = {
    type: 'ACCREC',
    contact: { contactID: contactId },
    lineItems: lineItems.map(item => ({
      description: item.description,
      quantity: item.quantity,
      unitAmount: item.unitAmount,
      accountCode: '200', // Sales account
    })),
    date: new Date().toISOString().split('T')[0],
    dueDate: dueDate?.toISOString().split('T')[0],
    status: 'DRAFT',
  }

  try {
    const response = await client.accountingApi.createInvoices(tenantId, { invoices: [invoice] })
    return response.body.invoices?.[0]
  } catch (error) {
    console.error('Error creating Xero invoice:', error)
    throw error
  }
}

export const createQuote = async (
  tenantId: string,
  contactId: string,
  lineItems: Array<{ description: string; quantity: number; unitAmount: number }>
) => {
  const client = getXeroClient()
  
  const quote: any = {
    contact: { contactID: contactId },
    lineItems: lineItems.map(item => ({
      description: item.description,
      quantity: item.quantity,
      unitAmount: item.unitAmount,
    })),
    date: new Date().toISOString().split('T')[0],
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days
    status: 'DRAFT',
  }

  try {
    const response = await client.accountingApi.createQuotes(tenantId, { quotes: [quote] })
    return response.body.quotes?.[0]
  } catch (error) {
    console.error('Error creating Xero quote:', error)
    throw error
  }
}
