import { Router } from 'express';
import {
  getproductos,
  getproductosById,
  createproductos,
  updateproductos,
  deleteproductos
} from '../controllers/productosController';

const router = Router();

router.get('/', getproductos);
router.get('/:id', getproductosById);
router.post('/', createproductos);
router.put('/:id', updateproductos);
router.delete('/:id', deleteproductos);

export default router;
