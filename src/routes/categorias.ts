import { Router } from 'express';
import {
  getcategorias,
  getcategoriasById,
  createcategorias,
  updatecategorias,
  deletecategorias
} from '../controllers/categoriasController';

const router = Router();

router.get('/', getcategorias);
router.get('/:id', getcategoriasById);
router.post('/', createcategorias);
router.put('/:id', updatecategorias);
router.delete('/:id', deletecategorias);

export default router;
