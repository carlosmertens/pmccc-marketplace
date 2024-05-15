import {BookModel, validateBook} from '../models/BookModel.js';
import {CreateAppError} from '../utils/createAppError.js';
import {processQuery} from '../utils/processQuery.js';

/** (GET REQUEST) */
async function getAllBooks(req, res) {
  /** Process query request and execute it */
  const query = processQuery(req.query, BookModel);
  const data = await query;

  /** Send a successful response */
  res.status(200).send({
    status: 'success',
    message: 'GET request to get all books was successful',
    result: data.length,
    data,
  });
}

/** (POST REQUEST) */
async function createNewBook(req, res) {
  /** Validate data */
  const {error} = validateBook(req.body);
  if (error) return next(new CreateAppError(error.message, 400));

  /** Create new book */
  const book = await BookModel.create(req.body);

  /** Send a successful response */
  res.status(201).send({
    status: 'success',
    message: 'POST request to create a new book was successful',
    data: book,
  });
}

/** (GET REQUEST) */
async function getBook(req, res, next) {
  /** Get a book */
  const data = await BookModel.findById(req.params.id);
  if (!data) return next(new CreateAppError('Given id not found', 404));

  /** Send a successful response */
  res.status(200).send({
    status: 'success',
    message: 'GET request for one book by id',
    data,
  });
}

/** (PUT REQUEST) */
async function updateBook(req, res, next) {
  /** Validate data */
  const {error} = validateBook(req.body);
  if (error) return next(new CreateAppError(error.message, 400));

  /** Find and update a book */
  const data = await BookModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!data) return next(new CreateAppError('Given id not found', 404));

  /** Send a successful response  */
  res.status(200).send({
    status: 'success',
    message: 'PUT request to update a book by id',
    data,
  });
}

/** (PATCH REQUEST) */
async function patchBook(req, res, next) {
  // TODO: Validate Patch with Joi
  /** Find and update property(s) */
  const data = await BookModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!data) return next(new CreateAppError('Given id not found', 404));

  /** Send a successful response */
  res.status(200).send({
    status: 'success',
    message: 'PATCH request to modify book successfully',
    data,
  });
}

/** (DELETE REQUEST) */
async function deleteBook(req, res, next) {
  /** Find and delete a book */
  const data = await BookModel.findByIdAndDelete(req.params.id);
  if (!data) return next(new CreateAppError('Given id not found', 404));

  /** Send a successful response */
  res.status(200).send({
    status: 'success',
    message: `DELETE request for id: ${req.params.id} has been successfully`,
    data,
  });
}

/** (GET REQUEST) */
async function getAllReviews(req, res, next) {
  /** Find Reviews */
  const data = await BookModel.findById(req.params.id).select('reviews');

  /** Send a successful response */
  res.send({
    status: 'success',
    message: 'Array containing all reviews has been requested',
    result: data.length,
    data,
  });
}

/** (PATCH REQUEST)  */
async function createNewReview(req, res, next) {
  /** Find and update review property */
  const book = await BookModel.findById(req.params.id);
  book.reviews.push(req.body);

  /** Save back data */
  const data = await BookModel.findByIdAndUpdate(req.params.id, book, {
    new: true,
  });

  /** Send a successful response */
  res.send({
    status: 'success',
    message: 'New review has been received',
    data,
  });
}

export const controllers = {
  getAllBooks,
  createNewBook,
  getBook,
  updateBook,
  patchBook,
  deleteBook,
  getAllReviews,
  createNewReview,
};
