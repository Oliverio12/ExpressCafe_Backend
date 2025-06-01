import { Router } from 'express';
import {
  getpedidoitems,
  getpedidoitemsById,
  createpedidoitems,
  updatepedidoitems,
  deletepedidoitems
} from '../controllers/pedidoitemsController';

const router = Router();

router.get('/', getpedidoitems);
router.get('/:id', getpedidoitemsById);
router.post('/', createpedidoitems);
router.put('/:id', updatepedidoitems);
router.delete('/:id', deletepedidoitems);

export default router;
