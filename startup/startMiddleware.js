import express from 'express';
import cors from 'cors';
import {logger} from '../middleware/logger.js';

export function startMiddleware(app) {
  app.use(express.urlencoded({extended: true}));
  app.use(express.json());
  app.use(cors());
  // app.use(express.static('public'));
  app.use(logger);
}
