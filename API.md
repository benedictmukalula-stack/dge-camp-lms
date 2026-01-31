# API Documentation - Knowledge Camp Global

Base URL: `https://your-domain.com/api`

## Authentication

Most endpoints require authentication via NextAuth.js session cookies.

```javascript
// Client-side example
import { signIn, signOut, useSession } from 'next-auth/react'

const { data: session, status } = useSession()
```

## Courses API

### List Courses

```http
GET /api/courses
```

**Query Parameters:**
- `category` (optional) - Filter by category
- `level` (optional) - Filter by level (BEGINNER, INTERMEDIATE, ADVANCED, EXPERT)
- `search` (optional) - Search in title and description
- `page` (optional, default: 1) - Page number
- `limit` (optional, default: 12) - Items per page

**Response:**
```json
{
  "courses": [
    {
      "id": "course_123",
      "title": "Introduction to Web Development",
      "description": "Learn the basics of web development",
      "price": 99.99,
      "duration": 40,
      "level": "BEGINNER",
      "category": "Web Development",
      "published": true,
      "creator": {
        "id": "user_123",
        "name": "John Doe",
        "image": "https://..."
      },
      "_count": {
        "enrollments": 150,
        "reviews": 45
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 100,
    "pages": 9
  }
}
```

### Get Course

```http
GET /api/courses/{id}
```

**Response:**
```json
{
  "id": "course_123",
  "title": "Introduction to Web Development",
  "description": "Complete course description...",
  "price": 99.99,
  "duration": 40,
  "level": "BEGINNER",
  "category": "Web Development",
  "modules": [
    {
      "id": "module_1",
      "title": "Getting Started",
      "order": 1,
      "lessons": [
        {
          "id": "lesson_1",
          "title": "Introduction",
          "duration": 15,
          "order": 1
        }
      ]
    }
  ],
  "reviews": [...],
  "averageRating": 4.5,
  "totalReviews": 45
}
```

### Create Course

```http
POST /api/courses
```

**Headers:**
- `Content-Type: application/json`
- `Authorization: Bearer {token}` (Admin/Trainer only)

**Request Body:**
```json
{
  "title": "New Course",
  "description": "Course description",
  "slug": "new-course",
  "price": 99.99,
  "duration": 40,
  "level": "BEGINNER",
  "category": "Web Development",
  "tags": ["html", "css", "javascript"],
  "published": false,
  "creatorId": "user_123"
}
```

### Update Course

```http
PUT /api/courses/{id}
```

**Request Body:** Same as Create Course

### Delete Course

```http
DELETE /api/courses/{id}
```

## Enrollments API

### Create Enrollment

```http
POST /api/enrollments
```

**Request Body:**
```json
{
  "userId": "user_123",
  "courseId": "course_123"
}
```

**Response:**
```json
{
  "id": "enrollment_123",
  "userId": "user_123",
  "courseId": "course_123",
  "status": "ACTIVE",
  "enrolledAt": "2024-01-15T10:00:00Z",
  "course": {...},
  "user": {...}
}
```

### Get User Enrollments

```http
GET /api/enrollments?userId={userId}
```

**Response:**
```json
[
  {
    "id": "enrollment_123",
    "enrolledAt": "2024-01-15T10:00:00Z",
    "status": "ACTIVE",
    "course": {
      "id": "course_123",
      "title": "Introduction to Web Development",
      "thumbnail": "https://...",
      "creator": {...}
    }
  }
]
```

## Payments API

### Create Payment Intent

```http
POST /api/payments/intent
```

**Request Body:**
```json
{
  "courseId": "course_123",
  "userId": "user_123"
}
```

**Response:**
```json
{
  "clientSecret": "pi_xxx_secret_xxx",
  "paymentIntentId": "pi_xxx",
  "amount": 9999,
  "currency": "usd"
}
```

## Webhooks

### Stripe Webhook

```http
POST /api/webhooks/stripe
```

**Headers:**
- `stripe-signature: {signature}`

**Events Handled:**
- `payment_intent.succeeded`
- `payment_intent.payment_failed`

## Progress Tracking

### Update Lesson Progress

```http
POST /api/progress
```

**Request Body:**
```json
{
  "userId": "user_123",
  "lessonId": "lesson_123",
  "completed": true,
  "timeSpent": 900
}
```

### Get Course Progress

```http
GET /api/progress?userId={userId}&courseId={courseId}
```

**Response:**
```json
{
  "courseId": "course_123",
  "totalLessons": 50,
  "completedLessons": 25,
  "progressPercentage": 50,
  "timeSpent": 45000,
  "lessons": [
    {
      "lessonId": "lesson_1",
      "completed": true,
      "timeSpent": 900,
      "lastAccessed": "2024-01-15T10:00:00Z"
    }
  ]
}
```

## Certificates

### Generate Certificate

```http
POST /api/certificates
```

**Request Body:**
```json
{
  "userId": "user_123",
  "courseId": "course_123"
}
```

**Response:**
```json
{
  "id": "cert_123",
  "certificateNumber": "KC-ABC123",
  "issuedAt": "2024-01-15T10:00:00Z",
  "pdfUrl": "https://..."
}
```

### Get User Certificates

```http
GET /api/certificates?userId={userId}
```

## Support Tickets

### Create Ticket

```http
POST /api/support/tickets
```

**Request Body:**
```json
{
  "userId": "user_123",
  "subject": "Login Issues",
  "description": "I cannot log into my account",
  "priority": "HIGH"
}
```

### Get Ticket

```http
GET /api/support/tickets/{id}
```

### Add Message to Ticket

```http
POST /api/support/tickets/{id}/messages
```

**Request Body:**
```json
{
  "content": "Message content",
  "isStaff": false
}
```

## AI Support

### Get AI Response

```http
POST /api/support/ai
```

**Request Body:**
```json
{
  "message": "How do I reset my password?",
  "context": "User is on login page"
}
```

**Response:**
```json
{
  "response": "To reset your password, click on 'Forgot Password'..."
}
```

## Error Responses

All endpoints return errors in the following format:

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {}
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Rate Limiting

- Public endpoints: 100 requests per 15 minutes
- Authenticated endpoints: 1000 requests per hour
- Webhook endpoints: No limit

## SDKs and Examples

### JavaScript/TypeScript

```typescript
// Fetch courses
const response = await fetch('/api/courses?category=Web Development')
const { courses, pagination } = await response.json()

// Enroll in course
const enrollment = await fetch('/api/enrollments', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: session.user.id,
    courseId: 'course_123'
  })
})
```

### Python

```python
import requests

# Get courses
response = requests.get('https://api.knowledgecamp.com/api/courses')
data = response.json()

# Create enrollment
enrollment = requests.post(
    'https://api.knowledgecamp.com/api/enrollments',
    json={'userId': 'user_123', 'courseId': 'course_123'},
    headers={'Authorization': f'Bearer {token}'}
)
```

## Webhooks

### Register Webhook

Contact support@knowledgecamp.com to register webhook endpoints for:
- Enrollment events
- Payment events
- Certificate issuance
- Course completion

## Support

For API support:
- Documentation: https://docs.knowledgecamp.com
- Email: api-support@knowledgecamp.com
- Status Page: https://status.knowledgecamp.com
