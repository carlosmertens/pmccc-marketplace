import { BookModel } from '../models/BookModel.js';
import { CreateAppError } from '../utils/createAppError.js';
import { apiQueries } from '../utils/apiQueries.js';
import { calcRatingAvg } from '../utils/calcRatingAvg.js';

/** (GET REQUEST) */
async function getAllBooks(req, res) {
  const query = apiQueries(req.query, BookModel);
  const books = await query;

  res.send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    result: books.length,
    books,
  });
}

/** (POST REQUEST) */
async function createBook(req, res, next) {
  const book = await BookModel.create(req.body);

  res.status(201).send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    book,
  });
}

/** (GET REQUEST)
 * /api/v2/books/
 */
async function getBook(req, res, next) {
  const book = await BookModel.findById(req.params.id);
  if (!book) return next(new CreateAppError('Given id not found', 404));

  res.send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    book,
  });
}

/** (PUT REQUEST) */
async function updateBook(req, res, next) {
  const book = await BookModel.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });
  if (!book) return next(new CreateAppError('Given id not found', 404));

  res.send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    book,
  });
}

/** (PATCH REQUEST) */
async function patchBook(req, res, next) {
  const book = await BookModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!book) return next(new CreateAppError('Given id not found', 404));

  res.send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    book,
  });
}

/** (DELETE REQUEST) */
async function deleteBook(req, res, next) {
  const book = await BookModel.findByIdAndDelete(req.params.id, { new: true });
  if (!book) return next(new CreateAppError('Given id not found', 404));

  res.send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    book,
  });
}

/** (GET REQUEST) */
async function getAllReviews(req, res) {
  const data = await BookModel.findById(req.params.id).select(
    'reviews ratingAvg'
  );

  res.send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    result: data.reviews.length,
    reviews: data,
  });
}

/** (POST REQUEST)  */
async function createReview(req, res, next) {
  let book = await BookModel.findById(req.params.id);
  book.reviews.push(req.body);

  book.ratingAvg = calcRatingAvg(book.reviews);

  book = await BookModel.findByIdAndUpdate(req.params.id, book, {
    new: true,
  });

  res.send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    book,
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
