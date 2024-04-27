import {TourModel} from '../models/TourModel.js';
import {CreateAppError} from '../utils/createAppError.js';
import {processQuery} from '../utils/processQuery.js';

/**
 * Get (GET REQUEST) all tours from the database
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 */
async function getAllTours(req, res) {
  /** Call util function to process query request */
  const query = processQuery(req.query, TourModel);

  /** Execute query request to database */
  const tours = await query;

  /** Send a successful response with the tours data */
  res.status(200).send({
    status: 'success',
    result: tours.length,
    data: tours,
    message: 'All tours were requested',
  });
}

/**
 * Create (POST REQUEST) a new tour in the database
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 */
async function createNewTour(req, res) {
  const tour = await TourModel.create(req.body);

  /** Send a successful response with the new tour data */
  res.status(201).send({
    status: 'success',
    data: tour,
    message: 'New tour has been created',
  });
}

/**
 * Get (GET REQUEST) a tour from the database by its id
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next object function
 */
async function getTour(req, res, next) {
  const tour = await TourModel.findById(req.params.id);

  /** Check if the tour exists */
  if (!tour) return next(new CreateAppError('Given id not found', 404));

  /** Send a successful response with the tour data */
  res.status(200).send({
    status: 'success',
    data: tour,
    message: 'GET request for one tour with id',
  });
}

/**
 * Update (PUT REQUEST) a tour in the database by its id
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next object function
 */
async function updateTour(req, res, next) {
  const tour = await TourModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  /** Check if the tour exists */
  if (!tour) return next(new CreateAppError('Given id not found', 404));

  /** Send a successful response with the tour modified data */
  res.status(200).send({
    status: 'success',
    data: tour,
    message: 'PUT request to update a tour',
  });
}

/**
 * Modify (PATCH REQUEST) a book in the database by its id
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next object function
 */
async function patchTour(req, res, next) {
  const tour = await TourModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  /** Check if the tour exists */
  if (!tour) return next(new CreateAppError('Given id not found', 404));

  /** Send a successful response with the tour patched data */
  res.status(200).send({
    status: 'success',
    data: tour,
    message: 'PATCH request to modify a property of a tour',
  });
}

/**
 * Delete (DELETE REQUEST) a book in the database by its id
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next object function
 */
async function deleteTour(req, res, next) {
  const tour = await TourModel.findByIdAndDelete(req.params.id);

  /** Check if the tour exists */
  if (!tour) return next(new CreateAppError('Given id not found', 404));

  /** Send a successful response with the tour deleted data */
  res.status(200).send({
    status: 'success',
    data: tour,
    message: `Tour ${req.params.id} has been deleted`,
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
