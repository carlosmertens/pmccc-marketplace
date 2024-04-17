import {BookModel} from '../models/BookModel.js';

/**
 * Get (GET REQUEST) all books from the database
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 */
async function getAllBooks(req, res) {
  const books = await BookModel.find();

  /**
   * Send a successful response with all books data
   */
  res.status(200).send({
    status: 'success',
    result: books.length,
    data: books,
    message: 'GET request to get all books was successful',
  });
}

/**
 * Creates (POST REQUEST) a new book in the database
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 */
async function createNewBook(req, res) {
  const book = await BookModel.create(req.body);

  /**
   * Send a successful response with the new book data
   */
  res.status(201).send({
    status: 'success',
    data: book,
    message: 'POST request to create a new book was successful',
  });
}

/**
 * Get (GET REQUEST) a book from the database by its id
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 */
async function getBook(req, res) {
  const book = await BookModel.findById(req.params.id);

  /**
   * Check if the book exists
   */
  if (!book) {
    return res.status(404).send({
      status: 'fail',
      message: 'Book not found',
    });
  }

  /**
   * Send a successful response with the book data
   */
  res.status(200).send({
    status: 'success',
    data: book,
    message: 'GET request for one book by id',
  });
}

/**
 * Update (PUT REQUEST) a book in the database by its id
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 */
async function updateBook(req, res) {
  const book = await BookModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  /**
   * Check if the book exists
   */
  if (!book) {
    return res.status(404).send({
      status: 'fail',
      message: 'Book not found',
    });
  }

  /**
   * Send a successful response with the updated book data
   */
  res.status(200).send({
    status: 'success',
    data: book,
    message: 'PUT request to update a book by id',
  });
}

/**
 * Modify (PATCH REQUEST) a book in the database by its id
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 */
async function patchBook(req, res) {
  const book = await BookModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  /**
   * Check if the book exists
   */
  if (!book) {
    return res.status(404).send({
      status: 'fail',
      message: 'Book not found',
    });
  }

  /**
   * Send a successful response with the updated book data
   */
  res.status(200).send({
    status: 'success',
    data: book,
    message: 'PATCH request to modify book successfully',
  });
}

/**
 * Delete (DELETE REQUEST) a book in the database by its id
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 */
async function deleteBook(req, res) {
  const book = await BookModel.findByIdAndDelete(req.params.id);

  /**
   * Check if the book exists
   */
  if (!book) {
    return res.status(404).send({
      status: 'fail',
      message: 'Book not found',
    });
  }

  /**
   * Send a successful response with the book data
   */
  res.status(200).send({
    status: 'success',
    data: book,
    message: `DELETE request for id: ${req.params.id} has been successfully`,
  });
}

//export the function
export const controllers = {
  getAllBooks,
  createNewBook,
  getBook,
  updateBook,
  patchBook,
  deleteBook,
};
