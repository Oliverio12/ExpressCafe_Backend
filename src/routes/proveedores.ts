import { Router } from 'express';
import {
  getproveedores,
  getproveedoresById,
  createproveedores,
  updateproveedores,
  deleteproveedores
} from '../controllers/proveedoresController';

const router = Router();

router.get('/', getproveedores);
router.get('/:id', getproveedoresById);
router.post('/', createproveedores);
router.put('/:id', updateproveedores);
router.delete('/:id', deleteproveedores);

export default router;
