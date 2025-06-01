import { Router } from 'express';
import {
  getclientes,
  getclientesById,
  createclientes,
  updateclientes,
  deleteclientes,
  googleLogin   // importamos también la función de login Google
} from '../controllers/clientesController';

const router = Router();

// Google OAuth2
router.post('/google', googleLogin);

// CRUD genérico
router.get('/', getclientes);
router.get('/:id', getclientesById);
router.post('/', createclientes);
router.put('/:id', updateclientes);
router.delete('/:id', deleteclientes);

export default router;
