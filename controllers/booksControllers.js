//TODO
//claudia should start working here
import { BookModel } from '../models/BookModel.js';
import { log } from '../logs/index.js';

async function createNewBook(req, res) {
    try {
        const book = await BookModel.create(req.body);
        res.status(201).send({ status: 'success', data: book });
    } catch (error) {
        log.error(error);
        res.status(500).send({ status: 'error in createNewBook', message: error.message });
    }
}

async function getAllBooks(req, res) {
  try {
    const books = await BookModel.find();

    res.status(200).send({ status: 'success', data: books });
    // res.status(200).send(books);
  } catch (error) {
    console.log(error);

    res.status(500).send({ status: 'error', message: 'Something went wrong' });
  }
}

async function getBookWithId(req, res) {
  try {
    const book = await BookModel.findById(req.params.id);

    res.status(200).send({ status: 'success', data: book });
  } catch (error) {
    console.log(error);

    res.status(500).send({ status: 'error', message: error.message });
  }
}

async function updateBookWithId(req, res) {
  try {
    const book = await BookModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).send({ status: 'success', data: book });
  } catch (error) {
    console.log(error);

    res.status(500).send({ status: 'error', message: error.message });
  }
}

async function patchBookWithId(req, res) {
  try {
    const book = await BookModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).send({ status: 'success', data: book });
  } catch (error) {
    console.log(error);

    res.status(500).send({ status: 'error', message: error.message });
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

    res.status(500).send({ status: 'error', message: error.message });
  }
}

export const controllers = {
  getAllBooks,
  createNewBook,
  getBookWithId,
  updateBookWithId,
  patchBookWithId,
  deleteBookWithId,
};