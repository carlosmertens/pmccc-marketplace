import {VideoGameModel} from '../models/VideoGamesModel.js';
import {log} from '../logs/index.js';

async function getAllVideoGames(req, res, next) {
  try {
    const videogames = await VideoGameModel.find();
    res.status(200).send({
      status: 'success',
      result: videogames.length,
      data: videogames,
      message: 'hello',
    });
  } catch (error) {
    log.error(error);
  }
}

async function postOneVideoGame(req, res, next) {
  try {
    const videoGame = await VideoGameModel.create(req.body);
    res.status(201).send({status: 'success', data: videoGame});
  } catch (error) {
    res.status(500).send({status: error.message});
    log.error(error);
  }
}

async function getOneVideoGameId(req, res, next) {
  try {
    const videoGame = await VideoGameModel.findById(req.params.id);
    res.status(201).send({status: 'success', data: videoGame});
  } catch (error) {
    log.error(error);
  }
}

async function putOneVideoGameId(req, res, next) {
  try {
    const videoGame = await VideoGameModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true}
    );
    res.status(201).send({status: 'success', data: videoGame});
  } catch (error) {
    log.error(error);
  }
}

async function deleteOneVideoGameId(req, res, next) {
  try {
    const videoGame = await VideoGameModel.findByIdAndDelete(
      req.params.id,
      req.body
    );
    res.status(201).send({status: 'success', data: videoGame});
  } catch (error) {
    log.error(error);
  }
}

export const controllers = {
  getAllVideoGames,
  postOneVideoGame,
  putOneVideoGameId,
  getOneVideoGameId,
  deleteOneVideoGameId,
};
