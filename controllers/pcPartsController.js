import {PcPartModel} from '../models/PcPartModel.js';
import {CreateAppError} from '../utils/createAppError.js';
import {processQuery} from '../utils/processQuery.js';

/**
 * Get (GET REQUEST) all pc parts from the database
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 */
async function getAllPcParts(req, res) {
  /** Call util function to process query request */
  const query = processQuery(req.query, PcPartModel);

  /** Execute query request to database */
  const pcParts = await query;

  /** Send a successful response with all pc parts data */
  res.status(200).send({
    status: 'success',
    message: 'GET request to get all pc parts was successful',
    result: pcParts.length,
    data: pcParts,
  });
}

/**
 * Create (POST REQUEST) a new pc part in the database
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 */
async function createNewPcPart(req, res) {
  const pcPart = await PcPartModel.create(req.body);

  /** Send a successful response with the new pc part data */
  res.status(201).send({
    status: 'success',
    message: 'POST request to create a new pc part was successful',
    data: pcPart,
  });
}

/**
 * Get (GET REQUEST) a pc part from the database by its id
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next object function
 */
async function getPcPart(req, res, next) {
  const pcPart = await PcPartModel.findById(req.params.id);

  /** Check if the pc part exists */
  if (!pcPart) return next(new CreateAppError('Given id not found', 404));

  /** Send a successful response with the pc part data */
  res.status(200).send({
    status: 'success',
    message: 'GET request for one pc part by id',
    data: pcPart,
  });
}

/**
 * Update (PUT REQUEST) a pc part in the database by its id
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next object function
 */
async function updatePcPart(req, res, next) {
  const pcPart = await PcPartModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  /** Check if the pc part exists */
  if (!pcPart) return next(new CreateAppError('Given id not found', 404));

  /** Send a successful response with the updated pc part data */
  res.status(200).send({
    status: 'success',
    message: 'PUT request to update a pcPart by id',
    data: pcPart,
  });
}

/**
 * Modify (PATCH REQUEST) a pc part in the database by its id
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next object function
 */
async function patchPcPart(req, res, next) {
  const pcPart = await PcPartModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  /** Check if the pc part exists */
  if (!pcPart) return next(new CreateAppError('Given id not found', 404));

  /** Send a successful response with the updated pc part data */
  res.status(200).send({
    status: 'success',
    message: 'PATCH request to modify pc part successfully',
    data: pcPart,
  });
}

/**
 * Delete (DELETE REQUEST) a pc part in the database by its id
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next object function
 */
async function deletePcPart(req, res, next) {
  const pcPart = await PcPartModel.findByIdAndDelete(req.params.id);

  /** Check if the pc part exists */
  if (!pcPart) return next(new CreateAppError('Given id not found', 404));

  /** Send a successful response with the pc part data */
  res.status(200).send({
    status: 'success',
    message: `DELETE request for id: ${req.params.id} has been successfully`,
    data: pcPart,
  });
}

export const controllers = {
  getAllPcParts,
  createNewPcPart,
  getPcPart,
  updatePcPart,
  patchPcPart,
  deletePcPart,
};
