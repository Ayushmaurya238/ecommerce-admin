
# 🛒 Server-Rendered E-commerce Product Management Dashboard #

### CDC × Yhills Open Projects 2025–2026 – Web Development Problem Statement ###


## 📌 Project Overview

This project is a Server-Side Rendered (SSR) E-commerce Product Management Dashboard built using Next.js.

It is designed to simulate a real-world admin & seller management system, focusing on performance, security, scalability, and SEO.

The dashboard allows authenticated sellers to manage their products (CRUD operations) and administrators to manage sellers, verify accounts, and control access — all rendered on the server for better SEO and faster initial load times.

---
## 🎯 Objective

To design and develop a secure, server-rendered administrative dashboard that:

- Provides fast page load times using SSR

- Ensures role-based access control (Admin vs Seller)

- Enables complete product lifecycle management

- Demonstrates real-world authentication and authorization flows

- Uses modern validation, charting, and cloud image storage techniques
---

## 🧠 Key Concepts Demonstrated

- Server-Side Rendering (SSR) using Next.js App Router

- JWT-based Authentication & Role-Based Authorization

- Secure Admin-only onboarding flow

- Scalable MongoDB schema design

- Image upload & management using Cloudinary

- Dashboard analytics using charts (dummy data)

- Clean separation of Server Components & Client Components

---

## ✨ Features
### 🔐 Authentication & Authorization ###

- Email + Password login

- JWT stored in HTTP-only cookies

- Role-based routing via middleware

- Separate Admin and Seller dashboards

- Secure logout from any role

---

### 👤 Admin Features ###

- Admin-only dashboard (/admin)

- View total sellers & verified sellers

- Manage sellers (view list)

- Admin settings page

- Secure admin onboarding (no public admin registration can be done through postman or apps like that but requires a secret)

---

### 🏪 Seller Features

- Seller dashboard (/dashboard)

- Add, edit, delete products

- Product image upload (Cloudinary)

- Product status toggle (Active / Inactive)

- Product detail page with image zoom

- Seller account settings page
---

### 📦 Product Management (CRUD)

- Create product with:

    - Name, description, price, stock
    - Category

    - Multiple images

- Read products (SSR)

- Update product details

- Delete product securely

- Seller isolation (seller can only manage own products)

---

### 📊 Dashboard Analytics

- Metric cards (dummy data):

    - Average Order Value

    - Total Orders

    - Lifetime Value

- Chart placeholders for:

    - Sales over time

- Easily extendable to real data
---

### 🖼 Image Storage

- Integrated Cloudinary

- Secure image upload

- Optimized image delivery

- Multiple images per product

---
🧱 Tech Stack
Layer	Technology
Frontend	Next.js (App Router)
Backend	Next.js API Routes
Rendering	Server-Side Rendering (SSR)
Database	MongoDB
ODM	Mongoose
Authentication	JWT
Validation	Zod
Charts	Recharts / Chart.js (dummy data)
Image Storage	Cloudinary
Styling	Tailwind CSS

## 🧱 Tech Stack

| Layer | Technology |
|------|-----------|
| **Frontend** | Next.js (App Router) |
| **Backend** | Next.js API Routes |
| **Rendering** | Server-Side Rendering (SSR) |
| **Database** | MongoDB |
| **ODM** | Mongoose |
| **Authentication** | JWT |
| **Validation** | Zod |
| **Charts** | Recharts / Chart.js (dummy data) |
| **Image Storage** | Cloudinary |
| **Styling** | Tailwind CSS |

---

### 🔄 Application Workflow

```
Admin / Seller Login
        ↓
JWT issued & stored in cookie
        ↓
Middleware checks role & access
        ↓
Server fetches data (SSR)
        ↓
Page rendered on server
        ↓
User performs actions (CRUD)
        ↓
API updates database
        ↓
UI revalidated / refreshed

```

---

### 🔐 Role-Based Access Control ###

| Role | Access |
|-----|-----------|
|**Admin**|	Admin dashboard, sellers list, admin settings|
|**Seller**|	Seller dashboard, products, settings|
|**Public**|	Login / Register only|

Unauthorized access is blocked at `middleware` level.

---

### 🧪 Dummy Admin Credentials

Use these credentials to access the Admin Dashboard
```
Email: admin@ecomadmin.com
Password: Admin@123
```

(Credentials mentioned as required in the problem statement)

---


## 🚀 Getting Started (Local Setup)
### 1️⃣ Clone Repository
``` cmd
git clone <your-github-repo-url>
cd ecommerce-admin
```

### 2️⃣ Install Dependencies
``` cmd
npm install
```

### 3️⃣ Environment Variables (.env.local)
``` env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
```
### 4️⃣ Run Development Server
```cmd
npm run dev

```
#### App runs at:

```link
http://localhost:3000
```

## 🌐 Deployment

- Deployed using Vercel

- Environment variables configured in Vercel dashboard

- Fully SSR-compatible

- SEO-optimized pages


## 📽 Demo Video

A 3–5 minute demo video is provided showing:

- Admin login

- Seller login

- Product CRUD

- Image upload

- Dashboard navigation

- Role-based access control

(Link provided in submission)

### 🔮 Future Enhancements

- OTP-based email verification

- Two-factor authentication (2FA)

- Real sales analytics

- Order management module

- Pagination & filtering

- Email notifications