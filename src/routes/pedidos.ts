import { Router } from 'express';
import {
  getpedidos,
  getpedidosById,
  createpedidos,
  updatepedidos,
  deletepedidos
} from '../controllers/pedidosController';

const router = Router();

router.get('/', getpedidos);
router.get('/:id', getpedidosById);
router.post('/', createpedidos);
router.put('/:id', updatepedidos);
router.delete('/:id', deletepedidos);

export default router;
