import { router } from 'express';
import * as pcPartController from '../controllers/pcPartController';

const router = express.Router();

router.get('/', pcPartController.getAllParts);
router.get('/:id', pcPartController.getPartById);
router.post('/', pcPartController.createPart);
router.patch('/:id', pcPartController.updatePart);
router.delete('/:id', pcPartController.deletePart);

export default router;