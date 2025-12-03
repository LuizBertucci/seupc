import { Router } from 'express';
import { partController } from '../controllers/partController';

const router = Router();

router.get('/', partController.getAll);
router.get('/:id', partController.getById);
router.post('/', partController.create);
router.put('/:id', partController.update);
router.delete('/:id', partController.delete);

export default router;

