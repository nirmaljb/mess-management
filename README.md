# Mess Management System - Backend

A robust backend server for managing student mess operations, payments, queries, and administrative tasks.

## Tech Stack

- Node.js
- Express.js
- Prisma (ORM)
- PostgreSQL (Database)

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL database

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables:
Create a `.env` file in the root directory with the following variables:
```
DATABASE_URL="postgresql://username:password@localhost:5432/dbname"
JWT_SECRET="your-secret-key"
```

4. Run database migrations:
```bash
npx prisma migrate dev
```

## Server Structure

The server is organized into the following components:

### Routes

- `/user` - User authentication and profile management
- `/payment` - Payment processing and management
- `/query` - Query submission and resolution
- `/mess` - Mess reduction requests
- `/admin` - Administrative operations

### API Endpoints

#### User Routes
- `GET /user` - Get user profile
- `POST /user/login` - User authentication

#### Payment Routes
- `POST /payment/create-order` - Create payment order
- `POST /payment/verify-order` - Verify payment
- `GET /payment/get-all-payments` - Get all payments
- `GET /payment/get-user-payments` - Get user-specific payments

#### Query Routes
- `GET /query/get-all-queries` - Get all queries
- `GET /query/get-user-queries` - Get user-specific queries
- `POST /query/queries` - Submit new query

#### Mess Reduction Routes
- `GET /mess/get-user-request` - Get user's mess reduction requests
- `GET /mess/get-all-request` - Get all mess reduction requests
- `PUT /mess/approve-request` - Approve mess reduction request
- `POST /mess/request` - Submit mess reduction request

#### Admin Routes
- `POST /admin/login` - Admin authentication

## Running the Server

Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:8000`

## Database Schema

The application uses Prisma as its ORM. The schema includes models for:
- Users
- Payments
- Queries
- Mess Reduction Requests
- Admins

## Error Handling

The server implements centralized error handling with appropriate HTTP status codes and error messages.

## Security

- CORS enabled
- JWT-based authentication
- Password hashing
- Input validation

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License. 