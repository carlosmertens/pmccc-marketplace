import {log} from '../logs/index.js';

export const errorHandler = (err, req, res, next) => {
  log.error(err.message);
  if (err.name === 'CastError') {
    return res.status(400).send({
      status: 'error',
      message: `Invalid ${err.path}: ${err.value}`,
    });
  } else {
    res.status(500).send({
      status: 'error',
      message: 'Error Handler: Something went wrong',
    });
  }
};
