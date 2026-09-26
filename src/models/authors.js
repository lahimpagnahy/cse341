import { getDb } from '../db/connect.js';

// Retrieve all author documents from the authors collection
const getAllAuthors = async () => {
  const db = getDb();
  const authors = await db.collection('authors').find({}).toArray();
  return authors;
};

// Retrieve a single author document by its custom `id` field
const getAuthorById = async (authorId) => {
  const db = getDb();
  const author = await db.collection('authors').findOne({ id: authorId });
  return author;
};

// Create a new author document
const createAuthor = async (author) => {
  const db = getDb();
  const result = await db.collection('authors').insertOne(author);
  return result;
};

// Update an author document by its custom `id` field
const updateAuthor = async (authorId, author) => {
  const db = getDb();

  const result = await db.collection('authors').updateOne(
    { id: authorId },
    { $set: author }
  );

  return result;
};

// Delete an author document by its custom `id` field
const deleteAuthor = async (authorId) => {
  const db = getDb();

  const result = await db.collection('authors').deleteOne({ id: authorId });

  return result;
};

// Check whether an author is referenced by any book
const authorHasBooks = async (authorId) => {
  const db = getDb();

  const book = await db.collection('books').findOne({ authorId });

  return Boolean(book);
};

export {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  authorHasBooks
};