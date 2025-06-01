import { Router } from 'express';
import {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
  getProfile,
  getAllUsers,
  getUserById,
  updateUser, 
  deleteUser
} from '../controllers/usuariosController';
import { authenticateJWT } from '../middlewares/auth';
import { authorizeAdmin } from '../middlewares/authorizeAdmin';

const router = Router();

// Registro y login no requieren token
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshToken);
router.post('/logout', logoutUser);

// Perfil protegido: solo usuarios con JWT válido
router.get('/profile', authenticateJWT, getProfile);
router.get('/', authenticateJWT, getAllUsers);
router.get('/:id', authenticateJWT, getUserById);
router.put('/:id', authenticateJWT, authorizeAdmin, updateUser);
router.delete('/:id', authenticateJWT, authorizeAdmin, deleteUser);
export default router;
