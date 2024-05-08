import {VideoGameModel} from '../models/VideoGameModel.js';
import {CreateAppError} from '../utils/createAppError.js';
import {processQuery} from '../utils/processQuery.js';

/** Get (GET REQUEST) all video games from the database */
async function getAllVideoGames(req, res) {
  /** Call util function to process query request */
  const query = processQuery(req.query, VideoGameModel);

  /** Execute query request to database */
  const videoGames = await query;

  /** Send a successful response with all video games data */
  res.status(200).send({
    status: 'success',
    message: 'GET request to get all video games was successful',
    result: videoGames.length,
    data: videoGames,
  });
}

/** Create (POST REQUEST) a new video game in the database */
async function createNewVideoGame(req, res) {
  const videoGame = await VideoGameModel.create(req.body);

  /** Send a successful response with the new video game data */
  res.status(201).send({
    status: 'success',
    message: 'POST request to create a new video game was successful',
    data: videoGame,
  });
}

/** Get (GET REQUEST) a video game from the database by its id */
async function getVideoGame(req, res, next) {
  const videoGame = await VideoGameModel.findById(req.params.id);

  /** Check if the video game exists */
  if (!videoGame) return next(new CreateAppError('Given id not found', 404));

  /** Send a successful response with the video game data */
  res.status(200).send({
    status: 'success',
    message: 'GET request for one video game by id',
    data: videoGame,
  });
}

/** Update (PUT REQUEST) a video game in the database by its id */
async function updateVideoGame(req, res, next) {
  const videoGame = await VideoGameModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  /** Check if the video game exists */
  if (!videoGame) return next(new CreateAppError('Given id not found', 404));

  /** Send a successful response with the updated video game data */
  res.status(200).send({
    status: 'success',
    message: 'PUT request to update a video game by id',
    data: videoGame,
  });
}

/** Modify (PATCH REQUEST) a video game in the database by its id */
async function patchVideoGame(req, res, next) {
  const videoGame = await VideoGameModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  /** Check if the video game exists */
  if (!videoGame) return next(new CreateAppError('Given id not found', 404));

  /** Send a successful response with the updated video game data */
  res.status(200).send({
    status: 'success',
    message: 'PATCH request to modify video game successfully',
    data: videoGame,
  });
}

/** Delete (DELETE REQUEST) a video game in the database by its id */
async function deleteVideoGame(req, res, next) {
  const videoGame = await VideoGameModel.findByIdAndDelete(req.params.id);

  /** Check if the video game exists */
  if (!videoGame) return next(new CreateAppError('Given id not found', 404));

  /** Send a successful response with the video game data */
  res.status(200).send({
    status: 'success',
    message: `DELETE request for id: ${req.params.id} has been successfully`,
    data: videoGame,
  });
}

export const controllers = {
  getAllVideoGames,
  createNewVideoGame,
  getVideoGame,
  updateVideoGame,
  patchVideoGame,
  deleteVideoGame,
};
