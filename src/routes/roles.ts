import { Router } from 'express';
import {
  getroles,
  getrolesById,
  createroles,
  updateroles,
  deleteroles
} from '../controllers/rolesController';

const router = Router();

router.get('/', getroles);
router.get('/:id', getrolesById);
router.post('/', createroles);
router.put('/:id', updateroles);
router.delete('/:id', deleteroles);

export default router;
