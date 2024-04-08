import { Router } from 'express';

export const toursRouter = Router();

toursRouter
  .route('/')
  .get((req, res) => {
    res.send('GET requested');
  })
  .post((req, res) => res.send('POST REQUESTED'));
