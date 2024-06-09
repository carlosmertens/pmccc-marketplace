import { PcPartModel } from '../models/PcPartModel.js';
import { validate } from '../validators/index.js';
import { CreateAppError } from '../utils/createAppError.js';
import { processQuery } from '../utils/processQuery.js';
import { calcRatingAvg } from '../utils/calcRatingAvg.js';

/** (GET REQUEST) */
async function getAllPcParts(req, res) {
  const query = processQuery(req.query, PcPartModel);
  const pcParts = await query;

  res.send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    result: pcParts.length,
    pcParts,
  });
}

/** (POST REQUEST) */
async function createPcPart(req, res) {
  const { error } = validate.createPcPart(req.body);
  if (error) return next(new CreateAppError(error.message, 400));

  const pcPart = await PcPartModel.create(req.body);

  res.status(201).send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    pcPart,
  });
}

/** (GET REQUEST) */
async function getPcPart(req, res, next) {
  const pcPart = await PcPartModel.findById(req.params.id);
  if (!pcPart) return next(new CreateAppError('Given id not found', 404));

  res.send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    pcPart,
  });
}

/** (PUT REQUEST) */
async function updatePcPart(req, res, next) {
  const { error } = validate.createPcPart(req.body);
  if (error) return next(new CreateAppError(error.message, 400));

  const pcPart = await PcPartModel.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });
  if (!pcPart) return next(new CreateAppError('Given id not found', 404));

  res.send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    pcPart,
  });
}

/**  (PATCH REQUEST) */
async function patchPcPart(req, res, next) {
  const { error } = validate.patchPcPart(req.body);
  if (error) return next(new CreateAppError(error.message, 400));

  const pcPart = await PcPartModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!pcPart) return next(new CreateAppError('Given id not found', 404));

  res.send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    pcPart,
  });
}

/** (DELETE REQUEST) */
async function deletePcPart(req, res, next) {
  const pcPart = await PcPartModel.findByIdAndDelete(req.params.id, {
    new: true,
  });
  if (!pcPart) return next(new CreateAppError('Given id not found', 404));

  res.send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    pcPart,
  });
}

/** (GET REQUEST) */
async function getAllReviews(req, res, next) {
  const data = await PcPartModel.findById(req.params.id).select(
    'reviews ratingAvg'
  );

  res.send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    result: data.reviews.length,
    reviews: data,
  });
}

/** (PATCH REQUEST)  */
async function createReview(req, res, next) {
  const { error } = validate.createReview(req.body);
  if (error) return next(new CreateAppError(error.message, 400));

  let pcPart = await PcPartModel.findById(req.params.id);
  pcPart.reviews.push(req.body);

  pcPart.ratingAvg = calcRatingAvg(pcPart.reviews);

  pcPart = await PcPartModel.findByIdAndUpdate(req.params.id, pcPart, {
    new: true,
  });

  res.send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    pcPart,
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
