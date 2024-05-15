import {BookModel} from '../models/BookModel.js';
import {VideoGameModel} from '../models/VideoGameModel.js';
import {PcPartModel} from '../models/PcPartModel.js';
import {TourModel} from '../models/TourModel.js';

/** Get all resources (products, services) in the database */
async function getResourcesList(req, res) {
  const booksArray = await BookModel.find().select({
    productType: 1,
    name: 1,
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
    productType: 1,
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
    message: 'GET request to get all resources in the database sussccesful',
    result: resources.length,
    data: resources,
  });
}

export const controllers = {getResourcesList};
