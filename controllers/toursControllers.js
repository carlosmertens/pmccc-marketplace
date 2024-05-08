import {TourModel} from '../models/TourModel.js';
import {CreateAppError} from '../utils/createAppError.js';
import {processQuery} from '../utils/processQuery.js';

/** Get (GET REQUEST) all tours from the database */
async function getAllTours(req, res) {
  /** Call util function to process query request */
  const query = processQuery(req.query, TourModel);

  /** Execute query request to database */
  const tours = await query;

  /** Send a successful response with the tours data */
  res.status(200).send({
    status: 'success',
    message: 'All tours were requested',
    result: tours.length,
    data: tours,
  });
}

/** Create (POST REQUEST) a new tour in the database */
async function createNewTour(req, res) {
  const tour = await TourModel.create(req.body);

  /** Send a successful response with the new tour data */
  res.status(201).send({
    status: 'success',
    message: 'New tour has been created',
    data: tour,
  });
}

/** Get (GET REQUEST) a tour from the database by its id */
async function getTour(req, res, next) {
  const tour = await TourModel.findById(req.params.id);

  /** Check if the tour exists */
  if (!tour) return next(new CreateAppError('Given id not found', 404));

  /** Send a successful response with the tour data */
  res.status(200).send({
    status: 'success',
    message: 'GET request for one tour with id',
    data: tour,
  });
}

/** Update (PUT REQUEST) a tour in the database by its id */
async function updateTour(req, res, next) {
  const tour = await TourModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  /** Check if the tour exists */
  if (!tour) return next(new CreateAppError('Given id not found', 404));

  /** Send a successful response with the tour modified data */
  res.status(200).send({
    status: 'success',
    message: 'PUT request to update a tour',
    data: tour,
  });
}

/** Modify (PATCH REQUEST) a book in the database by its id */
async function patchTour(req, res, next) {
  const tour = await TourModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  /** Check if the tour exists */
  if (!tour) return next(new CreateAppError('Given id not found', 404));

  /** Send a successful response with the tour patched data */
  res.status(200).send({
    status: 'success',
    message: 'PATCH request to modify a property of a tour',
    data: tour,
  });
}

/** Delete (DELETE REQUEST) a book in the database by its id */
async function deleteTour(req, res, next) {
  const tour = await TourModel.findByIdAndDelete(req.params.id);

  /** Check if the tour exists */
  if (!tour) return next(new CreateAppError('Given id not found', 404));

  /** Send a successful response with the tour deleted data */
  res.status(200).send({
    status: 'success',
    message: `Tour ${req.params.id} has been deleted`,
    data: tour,
  });
}

export const controllers = {
  getAllTours,
  createNewTour,
  getTour,
  updateTour,
  patchTour,
  deleteTour,
};
