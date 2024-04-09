import { PCPart } from '../models/pcPart';
import { log } from '../logs/index.js';

export const getAllParts = async (req, res) => {
  try {
    const parts = await PCPart.find();
    res.status(200).send({ status: 'success', data: parts });
  } catch (error) {
    res.status(500).send({ status: 'error', message: 'Something went wrong' });
  }
};

export const getPartById = async (req, res) => {
  try {
    const part = await PCPart.findById(req.params.id);
    if (!part) {
      return res.status(404).send({ status: 'error', message: 'Part not found' });
    }
    res.status(200).send({ status: 'success', data: part });
  } catch (error) {
    res.status(500).send({ status: 'error', message: error.message });
  }
};

export const createPart = async (req, res) => {
  try {
    const part = await PCPart.create(req.body);
    res.status(201).send({ status: 'success', data: part });
  } catch (error) {
    res.status(400).send({ status: 'error', message: error.message });
  }
};

export const updatePart = async (req, res) => {
  try {
    const part = await PCPart.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!part) {
      return res.status(404).send({ status: 'error', message: 'Part not found' });
    }
    res.status(200).send({ status: 'success', data: part });
  } catch (error) {
    res.status(400).send({ status: 'error', message: error.message });
  }
};

export const patchPart = async (req, res) => {
  try {
    const part = await PCPart.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!part) {
      return res.status(404).send({ status: 'error', message: 'Part not found' });
    }
    res.status(200).send({ status: 'success', data: part });
  } catch (error) {
    res.status(400).send({ status: 'error', message: error.message });
  }
};

export const deletePart = async (req, res) => {
  try {
    const part = await PCPart.findByIdAndDelete(req.params.id);
    if (!part) {
      return res.status(404).send({ status: 'error', message: 'Part not found' });
    }
    res.status(200).send({ status: 'success', data: part, message: `Id: ${req.params.id} has been deleted` });
  } catch (error) {
    res.status(500).send({ status: 'error', message: error.message });
  }
};

export const controllers = {
  getAllParts,
  getPartById,
  createPart,
  updatePart,
  patchPart,
  deletePart,
};