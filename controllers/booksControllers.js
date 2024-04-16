//TODO
//claudia should start working here
//import mongoose from "mongoose";
import {BookModel} from '../models/BookModel.js';
import {log} from '../logs/index.js';

//to GET all books
async function getAllBooks(req, res) {
  try {
    const books = await BookModel.find();

    res.status(200).send({
      status: 'success',
      result: books.length,
      data: books,
      message: 'One GET to rule them all!',
    });
  } catch (error) {
    log.error(error);
  }
}

//to CREATE a new book
async function createNewBook(req, res) {
  try {
    const book = await BookModel.create(req.body);

    res.status(201).send({status: 'success', data: book});
  } catch (error) {
    log.error(error);
    // 401, 403, 400
    res.status(500).send({status: 'error', message: error.message});
  }
}

//to GET a book by the ID
async function getBookWithId(req, res) {
  try {
    const book = await BookModel.findById(req.params.id);

    res.status(200).send({status: 'success', data: book});
  } catch (error) {
    console.log(error);

    res.status(404).send({status: 'error', message: error.message});
  }
}

//to Update new data to a book by the ID PUT
async function updateBookWithId(req, res) {
  try {
    const book = await BookModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).send({status: 'success', data: book});
  } catch (error) {
    console.log(error);

    res.status(500).send({status: 'error', message: error.message});
  }
}

//PATCH change parcially the data of the book
async function patchBookWithId(req, res) {
  try {
    const book = await BookModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).send({status: 'success', data: book});
  } catch (error) {
    console.log(error);

    res.status(500).send({status: 'error', message: error.message});
  }
}

async function deleteBookWithId(req, res) {
  try {
    const book = await BookModel.findByIdAndDelete(req.params.id);

    res.status(200).send({
      status: 'success',
      data: book,
      message: `Id: ${req.params.id} has been deleted`,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({status: 'error', message: error.message});
  }
}

//export the function
export const controllers = {
  getAllBooks,
  createNewBook,
  getBookWithId,
  updateBookWithId,
  patchBookWithId,
  deleteBookWithId,
};
