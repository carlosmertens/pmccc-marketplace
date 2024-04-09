import {log} from '../logs/index.js';

export const logger = (req, res, next) => {
  log.http(req.method + ' ' + req.url);
  next();
};
