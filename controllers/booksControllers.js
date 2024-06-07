import { BookModel } from '../models/BookModel.js';
import { validate } from '../validators/index.js';
import { CreateAppError } from '../utils/createAppError.js';
import { processQuery } from '../utils/processQuery.js';

/** (GET REQUEST) */
async function getAllBooks(req, res) {
  const query = processQuery(req.query, BookModel);
  const books = await query;

  res.status(200).send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    result: books.length,
    books,
  });
}

/** (POST REQUEST) */
async function createBook(req, res, next) {
  const { error } = validate.createBook(req.body);
  if (error) return next(new CreateAppError(error.message, 400));

  const book = await BookModel.create(req.body);

  res.status(201).send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    book,
  });
}

/** (GET REQUEST) */
async function getBook(req, res, next) {
  const book = await BookModel.findById(req.params.id);
  if (!book) return next(new CreateAppError('Given id not found', 404));

  res.status(200).send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    book,
  });
}

/** (PUT REQUEST) */
async function updateBook(req, res, next) {
  const { error } = validate.createBook(req.body);
  if (error) return next(new CreateAppError(error.message, 400));

  const book = await BookModel.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });
  if (!book) return next(new CreateAppError('Given id not found', 404));

  res.status(200).send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    book,
  });
}

/** (PATCH REQUEST) */
async function patchBook(req, res, next) {
  const { error } = validate.patchBook(req.body);
  if (error) return next(new CreateAppError(error.message, 400));

  const book = await BookModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!book) return next(new CreateAppError('Given id not found', 404));

  res.status(200).send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    book,
  });
}

/** (DELETE REQUEST) */
async function deleteBook(req, res, next) {
  const book = await BookModel.findByIdAndDelete(req.params.id);
  if (!book) return next(new CreateAppError('Given id not found', 404));

  res.status(200).send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    book,
  });
}

/** (GET REQUEST) */
async function getAllReviews(req, res, next) {
  const reviews = await BookModel.findById(req.params.id).select(
    'reviews ratingAvg'
  );

  res.send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    result: reviews.length,
    reviews,
  });
}

/** (PATCH REQUEST)  */
async function createReview(req, res, next) {
  const book = await BookModel.findById(req.params.id);
  book.reviews.push(req.body);

  book.ratingAvg =
    book.reviews.reduce((acc, value) => acc + value.rating, 0) /
    book.reviews.length;

  const review = await BookModel.findByIdAndUpdate(req.params.id, book, {
    new: true,
  });

  res.send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    review,
  });
}

export const controllers = {
  getAllBooks,
  createBook,
  getBook,
  updateBook,
  patchBook,
  deleteBook,
  getAllReviews,
  createReview,
};
