import axios from 'axios'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4'

export interface AIMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export const getAIResponse = async (messages: AIMessage[]): Promise<string> => {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured')
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: OPENAI_MODEL,
        messages,
        temperature: 0.7,
        max_tokens: 500,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
      }
    )

    return response.data.choices[0]?.message?.content || 'I apologize, but I could not generate a response.'
  } catch (error) {
    console.error('Error getting AI response:', error)
    throw new Error('Failed to get AI response')
  }
}

export const generateSupportResponse = async (userMessage: string, context?: string): Promise<string> => {
  const systemMessage: AIMessage = {
    role: 'system',
    content: `You are a helpful support assistant for Knowledge Camp Global, a learning management system platform. 
    Be concise, friendly, and helpful. If you don't know the answer, direct users to contact human support.
    ${context ? `Context: ${context}` : ''}`,
  }

  const messages: AIMessage[] = [
    systemMessage,
    { role: 'user', content: userMessage },
  ]

  return await getAIResponse(messages)
}

export const categorizeSupportTicket = async (subject: string, description: string): Promise<{
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  category: string
  suggestedResponse?: string
}> => {
  const systemMessage: AIMessage = {
    role: 'system',
    content: `Analyze this support ticket and return a JSON object with:
    1. priority (LOW, MEDIUM, HIGH, or URGENT)
    2. category (technical, billing, course, account, or general)
    3. suggestedResponse (optional quick response if it's a simple query)
    
    Respond ONLY with valid JSON, no other text.`,
  }

  const messages: AIMessage[] = [
    systemMessage,
    { role: 'user', content: `Subject: ${subject}\nDescription: ${description}` },
  ]

  try {
    const response = await getAIResponse(messages)
    return JSON.parse(response)
  } catch (error) {
    console.error('Error categorizing ticket:', error)
    return {
      priority: 'MEDIUM',
      category: 'general',
    }
  }
}
