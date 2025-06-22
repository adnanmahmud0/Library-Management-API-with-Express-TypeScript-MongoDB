# 📚 Library Management API

An Express.js + TypeScript + MongoDB (Mongoose) powered RESTful API for managing library books and borrowing records. This system ensures proper schema validation, filtering, availability logic, and borrowing summaries via aggregation.

## 🌐 Live Demo

👉 [View Deployed App](https://library-management-five-delta.vercel.app/)

## 📁 Project Structure

```
📦src
 ┣ 📂app
 ┃ ┣ 📂controllers        # API controllers for books and borrow operations
 ┃ ┣ 📂middlewares        # Centralized error handling middleware
 ┃ ┣ 📂models             # Mongoose models and schema logic
 ┃ ┗ 📂config             # Environment configuration and DB connection
 ┣ 📜app.ts               # App-level middleware setup
 ┣ 📜server.ts            # Entry point for the server
```

## 🧠 Features

- CRUD operations for books
- Borrowing system with copy validation and availability checks
- Aggregated summary of borrowed books
- Filtering and sorting support
- Proper error response format
- Mongoose middleware and static methods implemented
- Type-safe codebase with TypeScript

---

## 📖 Table of Contents

- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [Demo Data](#demo-data)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [Contributors](#contributors)
- [License](#license)

---

## ⚙️ Installation

```bash
git clone https://github.com/adnanmahmud0/libraryManagementAPI.git
cd libraryManagementAPI
npm install
```

## 📦 Environment Setup

Create a `.env` file at the root with the following variables:

```env
PORT=5000
DATABASE_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/libraryDB
```

Replace `<username>` and `<password>` with your MongoDB credentials.

---

## 🔧 Available Scripts

| Command         | Description                        |
|----------------|------------------------------------|
| `npm run dev`  | Run the app in development mode    |
| `npm run build`| Compile TypeScript to JavaScript   |
| `npm start`    | Start the compiled app             |
| `npm run lint` | Lint the project                   |
| `npm run lint:fix` | Fix linting issues automatically |

---

## 🚀 API Endpoints

### 📚 Books

#### 1. Create Book
`POST /api/books`

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5
}
```

#### 2. Get All Books
`GET /api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5`

#### 3. Get Book by ID
`GET /api/books/:bookId`

#### 4. Update Book
`PUT /api/books/:bookId`

```json
{
  "copies": 50
}
```

#### 5. Delete Book
`DELETE /api/books/:bookId`

---

### 📖 Borrow

#### 6. Borrow a Book
`POST /api/borrow`

```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

> ✅ Ensures copies are available and updates `available` status accordingly using Mongoose instance methods.

#### 7. Borrowed Summary
`GET /api/borrow`

Returns:

```json
[
  {
    "book": {
      "title": "The Theory of Everything",
      "isbn": "9780553380163"
    },
    "totalQuantity": 5
  }
]
```

---

## 🧪 Demo Data

```json
[
  {
    "title": "The Silent Patient",
    "author": "Alex Michaelides",
    "genre": "FICTION",
    "isbn": "9781250301697",
    "description": "A psychological thriller...",
    "copies": 4,
    "available": true
  },
  {
    "title": "Brief Answers to the Big Questions",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9781984819192",
    "description": "Final thoughts of Stephen Hawking...",
    "copies": 5,
    "available": true
  }
]
```

---

## 🛠️ Troubleshooting

- **MongoDB connection error**: Ensure `.env` is properly configured.
- **Port in use**: Change the `PORT` variable in `.env`.
- **Typescript errors**: Run `npm run build` to check compilation issues.

---

## 👤 Contributors

- **Adnan Mahmud** – [GitHub](https://github.com/adnanmahmud0)

---

## 📄 License

This project is licensed under the ISC License.

---

## 📹 Video Walkthrough

🛠 Coming soon...

---

## 📌 Submission Info

- ✅ [Live Link](https://library-management-five-delta.vercel.app/)
- ✅ [GitHub Repo](https://github.com/adnanmahmud0/libraryManagementAPI)
- ⏳ Video Link: Coming soon

---