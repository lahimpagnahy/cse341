import { getDb } from '../db/connect.js';

// Retrieve all book documents from the books collection
const getAllBooks = async () => {
  const db = getDb();
  const books = await db.collection('books').find({}).toArray();
  return books;
};

// Retrieve a single book document by its custom `id` field
const getBookById = async (bookId) => {
  const db = getDb();
  const book = await db.collection('books').findOne({ id: bookId });
  return book;
};

// Create a new book document
const createBook = async (book) => {
  const db = getDb();
  const result = await db.collection('books').insertOne(book);
  return result;
};

// Update a book document by its custom `id` field
const updateBook = async (bookId, book) => {
  const db = getDb();

  const result = await db.collection('books').updateOne(
    { id: bookId },
    { $set: book }
  );

  return result;
};

// Delete a book document by its custom `id` field
const deleteBook = async (bookId) => {
  const db = getDb();

  const result = await db.collection('books').deleteOne({ id: bookId });

  return result;
};

export {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};