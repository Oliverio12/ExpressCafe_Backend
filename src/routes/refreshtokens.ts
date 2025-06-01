import { Router } from 'express';
import {
  getRefreshTokens,
  getRefreshTokenById,
  createRefreshToken,
  revokeById,
  revokeByToken
} from '../controllers/refreshtokensController';

const router = Router();
router.get('/', getRefreshTokens);
router.get('/:id', getRefreshTokenById);
router.post('/', createRefreshToken);
router.post('/revoke/id/:id', revokeById);
router.post('/revoke', revokeByToken);


export default router;
