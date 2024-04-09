//TODO
//claudia should start working here
//import mongoose from "mongoose";
import {BookModel} from '../models/BookModel.js';
import {log} from '../logs/index.js'



async function getAllBooks(req, res) {
  try {
    const books = await BookModel.find();

    res.status(200).send({status: 'success', data: books, msg:'hello there'});
  } catch (error) {
    log.error(error);
  }
}

export const controllers = {getAllBooks}