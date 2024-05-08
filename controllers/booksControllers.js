import {BookModel} from '../models/BookModel.js';
import {CreateAppError} from '../utils/createAppError.js';
import {processQuery} from '../utils/processQuery.js';

/** Get (GET REQUEST) all books from the database */
async function getAllBooks(req, res) {
  /** Call util function to process query request */
  const query = processQuery(req.query, BookModel);

  /** Execute query request to database */
  const books = await query;

  /** Send a successful response with all books data */
  res.status(200).send({
    status: 'success',
    message: 'GET request to get all books was successful',
    result: books.length,
    data: books,
  });
}

/** Create (POST REQUEST) a new book in the database */
async function createNewBook(req, res) {
  const book = await BookModel.create(req.body);

  /** Send a successful response with the new book data */
  res.status(201).send({
    status: 'success',
    message: 'POST request to create a new book was successful',
    data: book,
  });
}

/** Get (GET REQUEST) a book from the database by its id */
async function getBook(req, res, next) {
  const book = await BookModel.findById(req.params.id);

  /** Check if the book exists */
  if (!book) return next(new CreateAppError('Given id not found', 404));

  /** Send a successful response with the book data */
  res.status(200).send({
    status: 'success',
    message: 'GET request for one book by id',
    data: book,
  });
}

/** Update (PUT REQUEST) a book in the database by its id */
async function updateBook(req, res, next) {
  const book = await BookModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  /** Check if the book exists */
  if (!book) return next(new CreateAppError('Given id not found', 404));

  /** Send a successful response with the updated book data */
  res.status(200).send({
    status: 'success',
    message: 'PUT request to update a book by id',
    data: book,
  });
}

/** Modify (PATCH REQUEST) a book in the database by its id */
async function patchBook(req, res, next) {
  const book = await BookModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  /** Check if the book exists */
  if (!book) return next(new CreateAppError('Given id not found', 404));

  /** Send a successful response with the updated book data */
  res.status(200).send({
    status: 'success',
    message: 'PATCH request to modify book successfully',
    data: book,
  });
}

/** Delete (DELETE REQUEST) a book in the database by its id */
async function deleteBook(req, res, next) {
  const book = await BookModel.findByIdAndDelete(req.params.id);

  /** Check if the book exists */
  if (!book) return next(new CreateAppError('Given id not found', 404));

  /** Send a successful response with the book data */
  res.status(200).send({
    status: 'success',
    message: `DELETE request for id: ${req.params.id} has been successfully`,
    data: book,
  });
}

export const controllers = {
  getAllBooks,
  createNewBook,
  getBook,
  updateBook,
  patchBook,
  deleteBook,
};
