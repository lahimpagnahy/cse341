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

export { getAllBooks, getBookById };
