import { PcPartModel } from '../models/PcPartModel.js';
import { CreateAppError } from '../utils/createAppError.js';
import { processQuery } from '../utils/processQuery.js';

// TODO: Create Joi validation

/** (GET REQUEST) */
async function getAllPcParts(req, res) {
  const query = processQuery(req.query, PcPartModel);
  const data = await query;

  res.status(200).send({
    status: 'success',
    message: 'GET request to get all pc parts was successful',
    result: data.length,
    data,
  });
}

/** (POST REQUEST) */
async function createPcPart(req, res) {
  const data = await PcPartModel.create(req.body);

  res.status(201).send({
    status: 'success',
    message: 'POST request to create a new pc part was successful',
    data,
  });
}

/** (GET REQUEST) */
async function getPcPart(req, res, next) {
  const data = await PcPartModel.findById(req.params.id);
  if (!data) return next(new CreateAppError('Given id not found', 404));

  res.status(200).send({
    status: 'success',
    message: 'GET request for one pc part by id',
    data,
  });
}

/** (PUT REQUEST) */
async function updatePcPart(req, res, next) {
  const data = await PcPartModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!data) return next(new CreateAppError('Given id not found', 404));

  res.status(200).send({
    status: 'success',
    message: 'PUT request to update a pcPart by id',
    data,
  });
}

/**  (PATCH REQUEST) */
async function patchPcPart(req, res, next) {
  const data = await PcPartModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!data) return next(new CreateAppError('Given id not found', 404));

  res.status(200).send({
    status: 'success',
    message: 'PATCH request to modify pc part successfully',
    data,
  });
}

/** (DELETE REQUEST) */
async function deletePcPart(req, res, next) {
  const data = await PcPartModel.findByIdAndDelete(req.params.id);
  if (!data) return next(new CreateAppError('Given id not found', 404));

  res.status(200).send({
    status: 'success',
    message: `DELETE request for id: ${req.params.id} has been successfully`,
    data,
  });
}

/** (GET REQUEST) */
async function getAllReviews(req, res, next) {
  const data = await PcPartModel.findById(req.params.id).select('reviews');

  res.send({
    status: 'success',
    message: 'Array containing all reviews has been requested',
    result: data.length,
    data,
  });
}

/** (PATCH REQUEST)  */
async function createReview(req, res, next) {
  const part = await PcPartModel.findById(req.params.id);
  part.reviews.push(req.body);

  part.ratingAvg =
    part.reviews.reduce((acc, value) => acc + value.rating, 0) /
    part.reviews.length;

  const data = await PcPartModel.findByIdAndUpdate(req.params.id, part, {
    new: true,
  });

  res.send({
    status: 'success',
    message: 'New review has been received',
    data,
  });
}

export const controllers = {
  getAllPcParts,
  createPcPart,
  getPcPart,
  updatePcPart,
  patchPcPart,
  deletePcPart,
  getAllReviews,
  createReview,
};
