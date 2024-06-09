import { BookModel } from '../models/BookModel.js';
import { VideoGameModel } from '../models/VideoGameModel.js';
import { PcPartModel } from '../models/PcPartModel.js';
import { TourModel } from '../models/TourModel.js';

/** (GET REQUEST) */
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
    toursType: 1,
    name: 1,
  });

  const categoriesArray = [
    { _id: 1, name: 'Video-games', productType: 'category' },
    { _id: 2, name: 'Books', productType: 'category' },
    { _id: 3, name: 'Pc Parts', productType: 'category' },
    { _id: 4, name: 'Tours', productType: 'category' },
  ];

  let resources = [
    ...categoriesArray,
    ...booksArray,
    ...videoGamesArray,
    ...pcPartsArray,
    ...toursArray,
  ];

  res.send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    result: resources.length,
    data: resources,
  });
}

export const controllers = { getResourcesList };
