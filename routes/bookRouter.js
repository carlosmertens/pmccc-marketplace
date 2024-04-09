//TODO
//claudia should start working here
import { Router } from 'express';
import { controllers } from '../controllers/booksControllers.js';

export const bookRouter = Router();

// Ruta para crear un nuevo libro
bookRouter.route('/').get(controllers.getAllBooks)
