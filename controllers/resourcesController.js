import {BookModel} from '../models/BookModel.js';
import {VideoGameModel} from '../models/VideoGameModel.js';
import {PcPartModel} from '../models/PcPartModel.js';
import {TourModel} from '../models/TourModel.js';

/**
 * @summary Get all types, names or titles of all resources (products, services) in the database
 * @description This endpoint returns an array of all resources (products, services) in the database, along with their types, names, or titles, depending on the query parameters.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with status, result, data, and message properties
 */
async function getResourcesList(req, res) {
  const booksArray = await BookModel.find().select({
    productType: 1,
    title: 1,
    genre: 1,
  });

  const videoGamesArray = await VideoGameModel.find().select({
    productType: 1,
    name: 1,
    genre: 1,
  });

  const pcPartsArray = await PcPartModel.find().select({
    productType: 1,
    name: 1,
    brand: 1,
    category: 1,
  });

  const toursArray = await TourModel.find().select({
    serviceType: 1,
    name: 1,
  });

  let resources = [
    ...booksArray,
    ...videoGamesArray,
    ...pcPartsArray,
    ...toursArray,
  ];

  res.status(200).send({
    status: 'success',
    result: resources.length,
    data: resources,
    message:
      'GET request to get all types, names or titles of all resources (products, services) in the database',
  });
}

export const controllers = {getResourcesList};
