import { Router } from 'express';
import { controllers } from '../controllers/testControllers.js';

export const testRouter = Router();

testRouter
  .route('/')
  .get(controllers.getAllTests)
  .post(controllers.createNewTest);

testRouter
  .route('/:id')
  .get(controllers.getTestWithId)
  .put(controllers.updateTestWithId)
  .patch(controllers.patchTestWithId)
  .delete(controllers.deleteTestWithId);
