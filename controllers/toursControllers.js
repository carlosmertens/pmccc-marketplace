import { TourModel } from '../models/TourModel.js';
import { validate } from '../validators/index.js';
import { CreateAppError } from '../utils/createAppError.js';
import { apiQueries } from '../utils/apiQueries.js';
import { calcRatingAvg } from '../utils/calcRatingAvg.js';

/** (GET REQUEST) */
async function getAllTours(req, res) {
  const query = apiQueries(req.query, TourModel);
  const tours = await query;

  res.send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    result: tours.length,
    tours,
  });
}

/** (POST REQUEST) */
async function createTour(req, res, next) {
  const { error } = validate.createTour(req.body);
  if (error) return next(new CreateAppError(error.message, 400));

  const tour = await TourModel.create(req.body);

  res.status(201).send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    tour,
  });
}

/** (GET REQUEST) */
async function getTour(req, res, next) {
  const tour = await TourModel.findById(req.params.id);
  if (!tour) return next(new CreateAppError('Given id not found', 404));

  res.send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    tour,
  });
}

/** (PUT REQUEST) */
async function updateTour(req, res, next) {
  const { error } = validate.createTour(req.body);
  if (error) return next(new CreateAppError(error.message, 400));

  const tour = await TourModel.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });
  if (!tour) return next(new CreateAppError('Given id not found', 404));

  res.send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    tour,
  });
}

/** (PATCH REQUEST) */
async function patchTour(req, res, next) {
  const { error } = validate.patchTour(req.body);
  if (error) return next(new CreateAppError(error.message, 400));

  const tour = await TourModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!tour) return next(new CreateAppError('Given id not found', 404));

  res.send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    tour,
  });
}

/** (DELETE REQUEST) */
async function deleteTour(req, res, next) {
  const tour = await TourModel.findByIdAndDelete(req.params.id, { new: true });
  if (!tour) return next(new CreateAppError('Given id not found', 404));

  res.send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    tour,
  });
}

/** (GET REQUEST) */
async function getAllReviews(req, res, next) {
  const data = await TourModel.findById(req.params.id).select(
    'reviews, ratingAvg'
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
  const { error } = validate.createReview(req.body);
  if (error) return next(new CreateAppError(error.message, 400));

  let tour = await TourModel.findById(req.params.id);
  tour.reviews.push(req.body);

  tour.ratingAvg = calcRatingAvg(tour.reviews);

  tour = await TourModel.findByIdAndUpdate(req.params.id, tour, {
    new: true,
  });

  res.send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    tour,
  });
}

export const controllers = {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  patchTour,
  deleteTour,
  getAllReviews,
  createReview,
};
