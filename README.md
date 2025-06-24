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
