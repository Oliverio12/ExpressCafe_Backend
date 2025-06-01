import { Router } from 'express';
import {
  getcompras,
  getcomprasById,
  createcompras,
  updatecompras,
  deletecompras
} from '../controllers/comprasController';

const router = Router();

router.get('/', getcompras);
router.get('/:id', getcomprasById);
router.post('/', createcompras);
router.put('/:id', updatecompras);
router.delete('/:id', deletecompras);

export default router;
