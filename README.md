# CSE 341 — Books Web Service

A read-only REST API built with Express and MongoDB that returns book data. Built for the CSE 341 Web Services Week 01 assignment.

## Live URL

Deployed on Render: `https://.onrender.com`

## Features

- `GET /books` — retrieve all books
- `GET /books/:id` — retrieve a single book by its `id`

## Tech Stack

- Node.js (ESM)
- Express
- MongoDB (native driver)
- ESLint for code standards

## Project Structure

```
├── app.js                    # Express app setup and middleware
├── server.js                 # Entry point — connects to DB, then starts the server
├── eslint.config.js          # Lint rules enforcing course coding standards
├── src/
│   ├── db/
│   │   └── connect.js        # MongoDB connection helper (connectToDb, getDb)
│   ├── models/
│   │   └── books.js          # Data access — queries the books collection
│   ├── controllers/
│   │   └── books.js          # Request handlers — status codes and responses
│   └── router.js             # Route definitions
├── .env.example               # Template for required environment variables
└── .gitignore
```

## Data Model

Each book document has:

| Field             | Type   | Required |
|-------------------|--------|----------|
| `id`              | string | yes      |
| `author`          | string | yes      |
| `title`           | string | yes      |
| `publicationDate` | string (ISO 8601, e.g. `2021-08-17`) | yes |

## API Reference

### `GET /books`
Returns all books.

- **200** — array of book objects
- **500** — `{ "message": "Internal server error" }`

### `GET /books/:id`
Returns a single book matching the given `id`.

- **200** — book object
- **404** — `{ "message": "Book not found" }`
- **500** — `{ "message": "Internal server error" }`

## Getting Started

### Prerequisites
- Node.js installed
- A MongoDB Atlas cluster with a `books` collection seeded with at least 3 documents

### Setup

1. Clone the repository and install dependencies:
   ```
   npm install
   ```
2. Copy `.env.example` to `.env` and fill in your own values:
   ```
   PORT=3000
   MONGODB_URI=your-mongodb-connection-string-here
   MONGODB_DB_NAME=cse341-books-db
   ```
3. Run the app in development mode (auto-restarts on changes):
   ```
   npm run dev
   ```
4. Or run it normally:
   ```
   npm start
   ```
5. Visit `http://127.0.0.1:3000` — should return `{ "message": "Server is running" }`.

### Linting

Run before every commit or pull request:
```
npm run lint
```
Auto-fix what's fixable:
```
npm run lint:fix
```

## Environment Variables

| Variable           | Description                                  |
|--------------------|-----------------------------------------------|
| `PORT`             | Port the server listens on locally            |
| `MONGODB_URI`      | MongoDB Atlas connection string               |
| `MONGODB_DB_NAME`  | Database name (`cse341-books-db`)             |

`.env` is never committed — see `.gitignore`. Production values are set directly in Render's Environment settings.

## Deployment (Render)

- **Build command:** `npm install`
- **Start command:** `node server.js`
- Environment variables (`MONGODB_URI`, `MONGODB_DB_NAME`) are set in Render's dashboard, not in a committed file.
- Render provides `PORT` automatically — do not set it manually.

## Out of Scope (Week 1)

- POST, PUT, DELETE routes
- Authentication and authorization
