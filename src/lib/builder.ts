import { builder } from '@builder.io/sdk'

if (!process.env.BUILDER_PUBLIC_KEY) {
  console.warn('Missing BUILDER_PUBLIC_KEY - Builder.io features will be disabled')
}

builder.init(process.env.BUILDER_PUBLIC_KEY || '')

export { builder }

export const fetchBuilderContent = async (model: string, options?: any) => {
  try {
    const content = await builder.get(model, {
      ...options,
      userAttributes: {
        urlPath: options?.urlPath || '/',
      },
    }).promise()
    
    return content
  } catch (error) {
    console.error('Error fetching Builder.io content:', error)
    return null
  }
}

export const fetchBuilderPage = async (urlPath: string) => {
  return await fetchBuilderContent('page', { urlPath })
}

export const fetchBuilderCoursePages = async () => {
  return await fetchBuilderContent('course-page', {})
}
