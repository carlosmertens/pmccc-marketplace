import { VideoGameModel } from '../models/VideoGameModel.js';
import { CreateAppError } from '../utils/createAppError.js';
import { processQuery } from '../utils/processQuery.js';

// TODO: Create Joi validation

/** (GET REQUEST) */
async function getAllVideoGames(req, res) {
  const query = processQuery(req.query, VideoGameModel);
  const data = await query;

  res.status(200).send({
    status: 'success',
    message: 'GET request to get all video games was successful',
    result: data.length,
    data,
  });
}

/** (POST REQUEST) */
async function createVideoGame(req, res) {
  const data = await VideoGameModel.create(req.body);

  res.status(201).send({
    status: 'success',
    message: 'POST request to create a new video game was successful',
    data,
  });
}

/** (GET REQUEST) */
async function getVideoGame(req, res, next) {
  const data = await VideoGameModel.findById(req.params.id);
  if (!data) return next(new CreateAppError('Given id not found', 404));

  res.status(200).send({
    status: 'success',
    message: 'GET request for one video game by id',
    data,
  });
}

/** (PUT REQUEST) */
async function updateVideoGame(req, res, next) {
  const data = await VideoGameModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!data) return next(new CreateAppError('Given id not found', 404));

  res.status(200).send({
    status: 'success',
    message: 'PUT request to update a video game by id',
    data,
  });
}

/** (PATCH REQUEST) */
async function patchVideoGame(req, res, next) {
  const data = await VideoGameModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!data) return next(new CreateAppError('Given id not found', 404));

  res.status(200).send({
    status: 'success',
    message: 'PATCH request to modify video game successfully',
    data,
  });
}

/** (DELETE REQUEST) */
async function deleteVideoGame(req, res, next) {
  const data = await VideoGameModel.findByIdAndDelete(req.params.id);
  if (!data) return next(new CreateAppError('Given id not found', 404));

  res.status(200).send({
    status: 'success',
    message: `DELETE request for id: ${req.params.id} has been successfully`,
    data,
  });
}

/** (GET REQUEST) */
async function getAllReviews(req, res, next) {
  const data = await VideoGameModel.findById(req.params.id).select('reviews');

  res.send({
    status: 'success',
    message: 'Array containing all reviews has been requested',
    result: data.length,
    data,
  });
}

/** (PATCH REQUEST)  */
async function createReview(req, res, next) {
  const game = await VideoGameModel.findById(req.params.id);
  game.reviews.push(req.body);

  game.ratingAvg =
    game.reviews.reduce((acc, value) => acc + value.rating, 0) /
    game.reviews.length;

  const data = await VideoGameModel.findByIdAndUpdate(req.params.id, game, {
    new: true,
  });

  res.send({
    status: 'success',
    message: 'New review has been received',
    data,
  });
}

export const controllers = {
  getAllVideoGames,
  createVideoGame,
  getVideoGame,
  updateVideoGame,
  patchVideoGame,
  deleteVideoGame,
  getAllReviews,
  createReview,
};
