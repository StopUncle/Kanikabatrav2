# Authentication System

Secure JWT-based authentication system with refresh tokens for the Kanika Batra website.

## 🔐 Features

- **JWT Authentication** - Secure token-based authentication
- **Refresh Tokens** - Long-term authentication (7 days)
- **Secure Cookies** - HttpOnly, Secure, SameSite protection
- **Password Hashing** - bcrypt with 12 salt rounds
- **Simple & Clean** - No phone/email verification required

## 🚀 API Endpoints

### POST `/api/auth/register`

Register a new user account.

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### POST `/api/auth/login`

Login with existing credentials.

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### POST `/api/auth/logout`

Logout and clear authentication cookies.

### POST `/api/auth/refresh`

Refresh access token using refresh token (automatic via cookies).

### GET `/api/auth/me`

Get current user information (protected route).

## 🛠 Token Configuration

- **Access Token**: 15 minutes (for API requests)
- **Refresh Token**: 7 days (for seamless re-authentication)

## 🔧 Usage Example

```typescript
// Login
const response = await fetch("/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "user@example.com",
    password: "password123",
  }),
});

// Protected API call
const userResponse = await fetch("/api/auth/me");
```

## 🛡️ Security Features

- **HttpOnly Cookies** - Tokens not accessible via JavaScript
- **Secure Flag** - HTTPS only in production
- **SameSite Strict** - CSRF protection
- **Password Hashing** - bcrypt with high salt rounds
- **Token Expiration** - Short-lived access tokens

## 📁 File Structure

```
lib/auth/
├── jwt.ts          # JWT token utilities
├── password.ts     # Password hashing utilities
├── database.ts     # User database operations
├── middleware.ts   # Authentication middleware
├── types.ts        # TypeScript interfaces
└── README.md       # This documentation
```

## ⚙️ Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-in-production
NODE_ENV=development
```

## 🔄 Database Integration

Currently uses in-memory storage for demonstration. In production, replace `database.ts` with your preferred database:

- **MongoDB** with Mongoose
- **PostgreSQL** with Prisma
- **MySQL** with TypeORM
- **Supabase** with their client

## 📝 Notes

- Tokens automatically refresh when needed
- Users stay logged in for 7 days with normal usage
- All routes handle errors gracefully
- Ready for production with environment variables
