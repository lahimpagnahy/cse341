import {
getAllBooks,
getBookById,
createBook,
updateBook,
deleteBook
} from '../models/books.js';

import { getAuthorById } from '../models/authors.js';

// GET /books
const getBooksHandler = async (req, res) => {
try {
const books = await getAllBooks();
return res.status(200).json(books);
} catch (error) {
console.error('GET /books failed:', error.message);
return res.status(500).json({ message: 'Internal server error' });
}
};

// GET /books/:id
const getBookByIdHandler = async (req, res) => {
const requestedId = req.params.id;

try {
const book = await getBookById(requestedId);

if (!book) {
  return res.status(404).json({ message: 'Book not found' });
}

return res.status(200).json(book);

} catch (error) {
console.error('GET /books/:id failed:', error.message);
return res.status(500).json({ message: 'Internal server error' });
}
};

// POST /books
const createBookHandler = async (req, res) => {
const { id, authorId, title, publicationDate } = req.body;

if (!id || !authorId || !title || !publicationDate) {
return res.status(400).json({
message: 'id, authorId, title, and publicationDate are required'
});
}

try {
const author = await getAuthorById(authorId);

if (!author) {
  return res.status(400).json({
    message: 'Author not found'
  });
}

const existingBook = await getBookById(id);

if (existingBook) {
  return res.status(400).json({
    message: 'Book ID already exists'
  });
}

const newBook = {
  id,
  authorId,
  title,
  publicationDate
};

await createBook(newBook);

return res.status(201).json(newBook);

} catch (error) {
console.error('POST /books failed:', error.message);
return res.status(500).json({ message: 'Internal server error' });
}
};

// PUT /books/:id
const updateBookHandler = async (req, res) => {
const requestedId = req.params.id;
const { authorId, title, publicationDate } = req.body;

if (!authorId || !title || !publicationDate) {
return res.status(400).json({
message: 'authorId, title, and publicationDate are required'
});
}

try {
const author = await getAuthorById(authorId);

if (!author) {
  return res.status(400).json({
    message: 'Author not found'
  });
}

const existingBook = await getBookById(requestedId);

if (!existingBook) {
  return res.status(404).json({
    message: 'Book not found'
  });
}

const updatedBook = {
  authorId,
  title,
  publicationDate
};

await updateBook(requestedId, updatedBook);

return res.status(200).json({
  id: requestedId,
  ...updatedBook
});

} catch (error) {
console.error('PUT /books/:id failed:', error.message);
return res.status(500).json({ message: 'Internal server error' });
}
};

// DELETE /books/:id
const deleteBookHandler = async (req, res) => {
const requestedId = req.params.id;

try {
const existingBook = await getBookById(requestedId);

if (!existingBook) {
  return res.status(404).json({
    message: 'Book not found'
  });
}

await deleteBook(requestedId);

return res.status(204).send();

} catch (error) {
console.error('DELETE /books/:id failed:', error.message);
return res.status(500).json({ message: 'Internal server error' });
}
};

export {
getBooksHandler,
getBookByIdHandler,
createBookHandler,
updateBookHandler,
deleteBookHandler
};
