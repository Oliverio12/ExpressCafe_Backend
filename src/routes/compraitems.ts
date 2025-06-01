import { Router } from 'express';
import {
  getcompraitems,
  getcompraitemsById,
  createcompraitems,
  updatecompraitems,
  deletecompraitems
} from '../controllers/compraitemsController';

const router = Router();

router.get('/', getcompraitems);
router.get('/:id', getcompraitemsById);
router.post('/', createcompraitems);
router.put('/:id', updatecompraitems);
router.delete('/:id', deletecompraitems);

export default router;
