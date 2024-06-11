import { VideoGameModel } from '../models/VideoGameModel.js';
import { validate } from '../validators/index.js';
import { CreateAppError } from '../utils/createAppError.js';
import { processQuery } from '../utils/processQuery.js';
import { calcRatingAvg } from '../utils/calcRatingAvg.js';

/** (GET REQUEST) */
async function getAllVideoGames(req, res) {
  const query = processQuery(req.query, VideoGameModel);
  const videoGames = await query;

  res.send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    result: videoGames.length,
    videoGames,
  });
}

/** (POST REQUEST) */
async function createVideoGame(req, res, next) {
  const { error } = validate.createVideoGame(re.body);
  if (error) return next(new CreateAppError(error.message, 400));

  const videoGame = await VideoGameModel.create(req.body);

  res.status(201).send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    videoGame,
  });
}

/** (GET REQUEST) */
async function getVideoGame(req, res, next) {
  const videoGame = await VideoGameModel.findById(req.params.id);
  if (!videoGame) return next(new CreateAppError('Given id not found', 404));

  res.send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    videoGame,
  });
}

/** (PUT REQUEST) */
async function updateVideoGame(req, res, next) {
  const videoGame = await VideoGameModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      runValidators: true,
      new: true,
    }
  );
  if (!videoGame) return next(new CreateAppError('Given id not found', 404));

  res.send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    videoGame,
  });
}

/** (PATCH REQUEST) */
async function patchVideoGame(req, res, next) {
  const { error } = validate.patchVideoGame(req.body);
  if (error) return next(new CreateAppError(error.message, 400));

  const videoGame = await VideoGameModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  if (!videoGame) return next(new CreateAppError('Given id not found', 404));

  res.send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    videoGame,
  });
}

/** (DELETE REQUEST) */
async function deleteVideoGame(req, res, next) {
  const videoGame = await VideoGameModel.findByIdAndDelete(req.params.id, {
    new: true,
  });
  if (!videoGame) return next(new CreateAppError('Given id not found', 404));

  res.send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    videoGame,
  });
}

/** (GET REQUEST) */
async function getAllReviews(req, res) {
  const data = await VideoGameModel.findById(req.params.id).select(
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
  const { error } = validate.createReview(req.body);
  if (error) return next(new CreateAppError(error.message, 400));

  let videoGame = await VideoGameModel.findById(req.params.id);
  videoGame.reviews.push(req.body);

  videoGame.ratingAvg = calcRatingAvg(videoGame.reviews);

  videoGame = await VideoGameModel.findByIdAndUpdate(req.params.id, videoGame, {
    new: true,
  });

  res.send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    videoGame,
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
