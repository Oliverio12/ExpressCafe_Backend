import { Router } from 'express';
import {
  getinventarios,
  getinventariosById,
  createinventarios,
  updateinventarios,
  deleteinventarios
} from '../controllers/inventariosController';

const router = Router();

router.get('/', getinventarios);
router.get('/:id', getinventariosById);
router.post('/', createinventarios);
router.put('/:id', updateinventarios);
router.delete('/:id', deleteinventarios);

export default router;
