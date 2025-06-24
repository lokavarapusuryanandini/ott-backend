# ott-backend

# 🛡️ Secure Auth Backend (Node.js + JWT + Cookies)

A production-ready authentication system built with Node.js, Express, MongoDB, and JWT.  
It includes secure login, access/refresh tokens, httpOnly cookie support, logout, and route protection.

## 🔐 Features

- User Registration & Login
- Access Token (15m) via Bearer Header
- Refresh Token (7d) via httpOnly Cookie
- Refresh & Logout Routes
- Token stored per-user in DB
- Middleware for route protection

## 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (access + refresh)
- httpOnly Cookies
- dotenv

## 📦 Installation

```bash
git clone https://github.com/lokavarapusuryanandini/ott-backend.git
cd ott-backend
npm install

🧪 Usage (dev)
npm run dev

🔧 Environment Variables
Create a .env file with:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

📫 API Endpoints
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login, returns access token
GET	/api/auth/refresh	Get new access token via cookie
POST	/api/auth/logout	Clear refresh token cookie
GET	/api/user/me	Protected route, get profile

🔒 Protected Route
Use Authorization: Bearer <access_token> header for protected endpoints.

👩‍💻 Built by
Lokavarapu Surya Nandini
Backend Developer | Node.js | MongoDB | JWT | REST APIs

