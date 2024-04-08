import { TestModel } from '../models/TestModel.js';
import { log } from '../logs/index.js';

async function getAllTests(req, res) {
  try {
    const tests = await TestModel.find();

    res.status(200).send({ status: 'success', data: tests });
    // res.status(200).send(tests);
  } catch (error) {
    console.log(error);

    res.status(500).send({ status: 'error', message: 'Something went wrong' });
  }
}

async function createNewTest(req, res) {
  try {
    const test = await TestModel.create(req.body);

    res.status(201).send({ status: 'success', data: test });
  } catch (error) {
    log.error(error);

    res.status(500).send({ status: 'error', message: error.message });
    // res.status(500).send(error.message);
  }
}

async function getTestWithId(req, res) {
  try {
    const test = await TestModel.findById(req.params.id);

    res.status(200).send({ status: 'success', data: test });
  } catch (error) {
    console.log(error);

    res.status(500).send({ status: 'error', message: error.message });
  }
}

async function updateTestWithId(req, res) {
  try {
    const test = await TestModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).send({ status: 'success', data: test });
  } catch (error) {
    console.log(error);

    res.status(500).send({ status: 'error', message: error.message });
  }
}

async function patchTestWithId(req, res) {
  try {
    const test = await TestModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).send({ status: 'success', data: test });
  } catch (error) {
    console.log(error);

    res.status(500).send({ status: 'error', message: error.message });
  }
}

async function deleteTestWithId(req, res) {
  try {
    const test = await TestModel.findByIdAndDelete(req.params.id);

    res.status(200).send({
      status: 'success',
      data: test,
      message: `Id: ${req.params.id} has been deleted`,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({ status: 'error', message: error.message });
  }
}

// TODO:
// async function for PATCH, DELETE
// and import them with the controllers object

export const controllers = {
  getAllTests,
  createNewTest,
  getTestWithId,
  updateTestWithId,
  patchTestWithId,
  deleteTestWithId,
};
