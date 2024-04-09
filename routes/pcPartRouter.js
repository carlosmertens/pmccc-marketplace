import { Router } from 'express';
import { controllers } from '../controllers/pcPartController.js';

export const pcPartrouter = Router();


pcPartrouter.get('/', controllers.getAllParts);
pcPartrouter.get('/:id', controllers.getPartById);
pcPartrouter.post('/', controllers.createPart);
pcPartrouter.patch('/:id', controllers.updatePart);
pcPartrouter.delete('/:id', controllers.deletePart);
