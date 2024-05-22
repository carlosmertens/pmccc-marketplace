import { TourModel } from '../models/TourModel.js';
import { CreateAppError } from '../utils/createAppError.js';
import { processQuery } from '../utils/processQuery.js';

// TODO: Create Joi validation

/** (GET REQUEST) */
async function getAllTours(req, res) {
  const query = processQuery(req.query, TourModel);
  const tours = await query;

  res.status(200).send({
    status: 'success',
    message: 'All tours were requested',
    result: tours.length,
    data: tours,
  });
}

/** (POST REQUEST) */
async function createNewTour(req, res) {
  const tour = await TourModel.create(req.body);

  res.status(201).send({
    status: 'success',
    message: 'New tour has been created',
    data: tour,
  });
}

/** (GET REQUEST) */
async function getTour(req, res, next) {
  const tour = await TourModel.findById(req.params.id);
  if (!tour) return next(new CreateAppError('Given id not found', 404));

  res.status(200).send({
    status: 'success',
    message: 'GET request for one tour with id',
    data: tour,
  });
}

/** (PUT REQUEST) */
async function updateTour(req, res, next) {
  const tour = await TourModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!tour) return next(new CreateAppError('Given id not found', 404));

  res.status(200).send({
    status: 'success',
    message: 'PUT request to update a tour',
    data: tour,
  });
}

/** (PATCH REQUEST) */
async function patchTour(req, res, next) {
  const tour = await TourModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!tour) return next(new CreateAppError('Given id not found', 404));

  res.status(200).send({
    status: 'success',
    message: 'PATCH request to modify a property of a tour',
    data: tour,
  });
}

/** (DELETE REQUEST) */
async function deleteTour(req, res, next) {
  const tour = await TourModel.findByIdAndDelete(req.params.id);
  if (!tour) return next(new CreateAppError('Given id not found', 404));

  res.status(200).send({
    status: 'success',
    message: `Tour ${req.params.id} has been deleted`,
    data: tour,
  });
}

/** (GET REQUEST) */
async function getAllReviews(req, res, next) {
  const data = await TourModel.findById(req.params.id).select('reviews');

  res.send({
    status: 'success',
    message: 'Array containing all reviews has been requested',
    result: data.length,
    data,
  });
}

/** (PATCH REQUEST)  */
async function createNewReview(req, res, next) {
  const tour = await TourModel.findById(req.params.id);
  tour.reviews.push(req.body);

  tour.ratingAvg =
    tour.reviews.reduce((acc, value) => acc + value.rating, 0) /
    tour.reviews.length;

  const data = await TourModel.findByIdAndUpdate(req.params.id, tour, {
    new: true,
  });

  res.send({
    status: 'success',
    message: 'New review has been received',
    data,
  });
}

export const controllers = {
  getAllTours,
  createNewTour,
  getTour,
  updateTour,
  patchTour,
  deleteTour,
  getAllReviews,
  createNewReview,
};
