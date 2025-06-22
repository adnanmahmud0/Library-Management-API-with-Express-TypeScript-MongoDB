
---

# 📚 Library Management API

A RESTful API built using **Express**, **TypeScript**, and **MongoDB** to manage a library system. This API supports CRUD operations for books, borrowing functionality with business logic enforcement, filtering, validation, and borrowed book summaries using MongoDB aggregation.

🌐 Live Demo: [https://library-management-five-delta.vercel.app/](https://library-management-five-delta.vercel.app/)
📁 GitHub Repository: [https://github.com/adnanmahmud0/libraryManagementAPI](https://github.com/adnanmahmud0/libraryManagementAPI)
🎥 Video Walkthrough: *Coming Soon*

---

## 📌 Table of Contents

* [Introduction](#introduction)
* [Features](#features)
* [API Endpoints](#api-endpoints)
* [Installation](#installation)
* [Usage](#usage)
* [Project Structure](#project-structure)
* [Environment Variables](#environment-variables)
* [Technologies Used](#technologies-used)
* [Examples](#examples)
* [Troubleshooting](#troubleshooting)
* [Contributors](#contributors)
* [License](#license)

---

## 📖 Introduction

The **Library Management API** provides a backend solution for managing a collection of books and their borrowing lifecycle. Built using TypeScript, Express, and MongoDB, the API includes comprehensive validation, error handling, and middleware to ensure data integrity and smooth user experience.

---

## ✨ Features

* ✅ Create, read, update, delete books
* 📚 Borrow books with availability checks
* 📊 Borrow summary using MongoDB aggregation
* 🧠 Business logic via Mongoose instance/static methods
* 🔄 Mongoose middleware hooks (pre/post)
* 🔍 Genre filtering, sorting, pagination
* 📦 MongoDB with Mongoose ODM
* 🚨 Custom validation error response format

---

## 📡 API Endpoints

### 📘 Books

* `POST /api/books` - Add a new book
* `GET /api/books` - Get all books with filters
* `GET /api/books/:bookId` - Get a single book by ID
* `PUT /api/books/:bookId` - Update book details
* `DELETE /api/books/:bookId` - Delete a book

### 📕 Borrow

* `POST /api/borrow` - Borrow a book with validation
* `GET /api/borrow` - Aggregated summary of borrow data

---

## ⚙️ Installation

1. Clone the repo
2. Install dependencies
3. Set up `.env` file with MongoDB URI
4. Run `npm run dev` to start development server

---

## 🚀 Usage

* Base URL: `https://library-management-five-delta.vercel.app/api`

### Example: Create Book

Send a `POST /api/books` request with book details.

### Example: Borrow Book

Send a `POST /api/borrow` request with book ID, quantity, and due date.

---

## 🧱 Project Structure

```
src/
├── app/
│   ├── controllers/
│   │   ├── books.controller.ts
│   │   └── borrow.controller.ts
│   ├── middlewares/
│   │   └── errorHandler.ts
│   ├── models/
│   │   ├── books.model.ts
│   │   └── borrow.model.ts
├── config/
│   └── index.ts
├── app.ts
└── server.ts
```

Other files:

* `.env`, `package.json`, `tsconfig.json`, `vercel.json`

---

## 🛠 Environment Variables

Add the following to your `.env`:

```
PORT=5000
DB_USER=your-mongodb-uri
DB_PASS=your-mongodb-pass
```

---

## 📦 Technologies Used

* TypeScript
* Express.js
* MongoDB + Mongoose
* dotenv
* ts-node-dev
* ESLint

---

## 🧪 Examples

### 📚 Demo Books

* The Silent Patient
* Becoming
* A Game of Thrones
* The Theory of Everything

### 📊 Borrowed Books Summary

Returns total quantity borrowed per book with title and ISBN.

---

## 🧰 Troubleshooting

| Problem                | Solution                                     |
| ---------------------- | -------------------------------------------- |
| MongoDB not connecting | Check `DATABASE_URL` in `.env` file          |
| Validation errors      | Ensure correct request payload and schema    |
| Server doesn't start   | Run `npm run dev` or check TypeScript config |
| Deployment issues      | Verify Vercel setup and environment vars     |

---

## 👥 Contributors

* [Adnan Mahmud](https://github.com/adnanmahmud0)

---

## 📄 License

Licensed under the **ISC License**.

---
