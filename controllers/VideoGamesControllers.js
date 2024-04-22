import {VideoGameModel} from '../models/VideoGameModel.js';

/**
 * Get (GET REQUEST) all video games from the database
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 */
async function getAllVideoGames(req, res) {
  const videoGames = await VideoGameModel.find();

  /**
   * Send a successful response with all video games data
   */
  res.status(200).send({
    status: 'success',
    result: videoGames.length,
    data: videoGames,
    message: 'GET request to get all video games was successful',
  });
}

/**
 * Create (POST REQUEST) a new video game in the database
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 */
async function createNewVideoGame(req, res) {
  const videoGame = await VideoGameModel.create(req.body);

  /**
   * Send a successful response with the new video game data
   */
  res.status(201).send({
    status: 'success',
    data: videoGame,
    message: 'POST request to create a new video game was successful',
  });
}

/**
 * Get (GET REQUEST) a video game from the database by its id
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 */
async function getVideoGame(req, res) {
  const videoGame = await VideoGameModel.findById(req.params.id);

  /**
   * Check if the video game exists
   */
  if (!videoGame) {
    return res.status(404).send({
      status: 'fail',
      message: 'Video game not found',
    });
  }

  /**
   * Send a successful response with the video game data
   */
  res.status(200).send({
    status: 'success',
    data: videoGame,
    message: 'GET request for one video game by id',
  });
}

/**
 * Update (PUT REQUEST) a video game in the database by its id
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 */
async function updateVideoGame(req, res) {
  const videoGame = await VideoGameModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  /**
   * Check if the video game exists
   */
  if (!videoGame) {
    return res.status(404).send({
      status: 'fail',
      message: 'Video game not found',
    });
  }

  /**
   * Send a successful response with the updated video game data
   */
  res.status(200).send({
    status: 'success',
    data: videoGame,
    message: 'PUT request to update a video game by id',
  });
}

/**
 * Modify (PATCH REQUEST) a video game in the database by its id
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 */
async function patchVideoGame(req, res) {
  const videoGame = await VideoGameModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  /**
   * Check if the video game exists
   */
  if (!videoGame) {
    return res.status(404).send({
      status: 'fail',
      message: 'Video game not found',
    });
  }

  /**
   * Send a successful response with the updated video game data
   */
  res.status(200).send({
    status: 'success',
    data: videoGame,
    message: 'PATCH request to modify video game successfully',
  });
}

/**
 * Delete (DELETE REQUEST) a video game in the database by its id
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 */
async function deleteVideoGame(req, res) {
  const videoGame = await VideoGameModel.findByIdAndDelete(req.params.id);

  /**
   * Check if the video game exists
   */
  if (!videoGame) {
    return res.status(404).send({
      status: 'fail',
      message: 'Video game not found',
    });
  }

  /**
   * Send a successful response with the video game data
   */
  res.status(200).send({
    status: 'success',
    data: videoGame,
    message: `DELETE request for id: ${req.params.id} has been successfully`,
  });
}

//export the function
export const controllers = {
  getAllVideoGames,
  createNewVideoGame,
  getVideoGame,
  updateVideoGame,
  patchVideoGame,
  deleteVideoGame,
};
