import {TourModel} from '../models/TourModel.js';
import {log} from '../logs/index.js';

/**
 * Get all tours from the database.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
async function getAllTours(req, res) {
  // Simple filtering
  const queryObj = {...req.query};
  log.http('req.query:', req.query);
  const excludedQueries = ['page', 'sort', 'limit', 'fields'];
  excludedQueries.forEach(field => delete queryObj[field]);

  // Advance filtering
  // Implement gte, gt, lt, lte operators
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

  // Create mongoose query request object
  let query = TourModel.find(JSON.parse(queryStr));

  // Sorting query
  if (req.query.sort) {
    const sort = req.query.sort;
    if (typeof sort === 'string') query = query.sort(sort.split(',').join(' '));
    else query = query.sort('-createdAt');
  }

  // Execute query request to database
  const tours = await query;

  res.status(200).send({
    status: 'success',
    result: tours.length,
    data: tours,
    message: 'All tours were requested',
  });
}

/**
 * Creates a new tour in the database.
 *
 * @param req - The request object.
 * @param res - The response object.
 */
async function createNewTour(req, res) {
  const tour = await TourModel.create(req.body);

  res.status(201).send({
    status: 'success',
    data: tour,
    message: 'New tour has been created',
  });
}

/**
 * Returns a tour document when a valid tour ID is provided.
 *
 * @param req - The request object.
 * @param res - The response object.
 */
async function getTour(req, res) {
  const tour = await TourModel.findById(req.params.id);

  if (!tour)
    return res.status(404).send({status: 'fail', message: 'Tour not found'});

  res.status(200).send({
    status: 'success',
    data: tour,
    message: 'GET request for one tour with id',
  });
}

/**
 * Updates a tour in the database.
 *
 * @param req - The request object.
 * @param res - The response object.
 */
async function updateTour(req, res) {
  const tour = await TourModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!tour)
    return res.status(404).send({status: 'fail', message: 'Tour not found'});

  res.status(200).send({
    status: 'success',
    data: tour,
    message: 'PUT request to update a tour',
  });
}

/**
 * Updates a tour in the database.
 *
 * @param req - The request object.
 * @param res - The response object.
 */
async function patchTour(req, res) {
  const tour = await TourModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!tour)
    return res.status(404).send({status: 'fail', message: 'Tour not found'});

  res.status(200).send({
    status: 'success',
    data: tour,
    message: 'PATCH request to modify a property of a tour',
  });
}

/**
 * Deletes a tour from the database.
 *
 * @param req - The request object.
 * @param res - The response object.
 */
async function deleteTour(req, res) {
  const tour = await TourModel.findByIdAndDelete(req.params.id);

  if (!tour)
    return res.status(404).send({status: 'fail', message: 'Tour not found'});

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
