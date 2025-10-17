# Vulnerable Lab Management System

This is an intentionally vulnerable lab management system designed for security testing and training. It contains several security vulnerabilities that can be exploited for educational purposes.

## ⚠️ Security Warning

This application is **deliberately vulnerable** and should **NEVER** be used in production. It is designed for:
- Security training
- Vulnerability assessment practice
- Learning about common web application security issues

## 🔍 Vulnerabilities

The application includes several intentional security flaws:

1. Authentication Vulnerabilities
   - Weak password requirements
   - No rate limiting on login attempts
   - User enumeration possible through various endpoints

2. Authorization Issues
   - Improper role checks
   - Missing access controls
   - Direct object references

3. Data Exposure
   - Sensitive information in API responses
   - No input sanitization
   - SQL injection possibilities

4. Session Management
   - Basic JWT implementation without proper security
   - No token refresh mechanism
   - Vulnerable logout process

## 🚀 Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)

### Running the Application

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd identity_management_testing
   ```

2. Start the application:
   ```bash
   docker compose up --build
   ```

3. Access the application:
   - Web Interface: http://localhost:3000
   - API Endpoints: http://localhost:3000/api/*

### Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

## 🛠️ Technology Stack

- **Frontend**: Next.js 13+ with App Router
- **Database**: PostgreSQL 15
- **ORM**: Drizzle ORM
- **Styling**: Tailwind CSS
- **Container**: Docker

## 📝 Features

- User Management
  - Registration and Authentication
  - Role-based Access Control
  - User Profile Management

- Lab Management
  - Lab Creation and Updates
  - Equipment Tracking
  - Maintenance Scheduling

- Booking System
  - Lab Reservations
  - Booking Management
  - Schedule Viewing

## 🗃️ Database Schema

The application uses the following main tables:

- `users`: User accounts and authentication
- `roles`: Role definitions and permissions
- `labs`: Laboratory information and status
- `lab_bookings`: Booking records and schedules

## 🧪 Testing Vulnerabilities

### User Enumeration
1. Try the login form with different usernames
2. Check the registration endpoint response
3. Examine user listing API responses

### Authorization Bypass
1. Modify user roles through direct API calls
2. Access admin endpoints without proper authentication
3. Try accessing other users' data

### Data Exposure
1. Check API responses for sensitive information
2. Attempt SQL injection in search fields
3. Examine error messages for system information

## 🔒 Security Configuration (Intentionally Weak)

- JWT tokens without expiration
- Plain text password storage
- No input validation
- Missing CSRF protection
- Vulnerable to injection attacks

## ⚙️ Environment Variables

```env
DATABASE_URL=postgresql://admin:admin123@db:5432/vulnerable_dashboard
```

## 📚 API Documentation

### Authentication Endpoints
- POST `/api/auth/login`
- POST `/api/auth/register`
- POST `/api/auth/logout`
- GET `/api/auth/verify`

### User Management
- GET `/api/users`
- POST `/api/users`
- PATCH `/api/users/[id]`
- DELETE `/api/users/[id]`

### Lab Management
- GET `/api/labs`
- POST `/api/labs`
- GET `/api/labs/bookings`
- POST `/api/labs/bookings`

## 🤝 Contributing

This project is designed for educational purposes. Feel free to:
1. Add new vulnerabilities
2. Improve documentation
3. Add testing scenarios
4. Enhance the UI/UX

## ⚖️ License

This project is for educational purposes only. Use at your own risk.
