//TODO
//claudia should start working here
import { Router } from 'express';
import { controllers } from '../controllers/booksControllers.js';

export const bookRouter = Router();

// Ruta para crear un nuevo libro
bookRouter
.route('/books')
.get(controllers.getAllBooks)
.post(controllers.createNewBook);

bookRouter
.route('/:id')
.get(controllers.getBookWithId)
.put(controllers.updateBookWithId)
.patch(controllers.patchBookWithId)
.delete(controllers.deleteBookWithId);

