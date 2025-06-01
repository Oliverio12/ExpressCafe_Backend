// src/middlewares/authorizeAdmin.ts
import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from './auth';

export function authorizeAdmin(req: Request, res: Response, next: NextFunction) {
  const user = (req as AuthRequest).user;
  // asumimos USER_ROLE_ID=2 en .env
  const ADMIN_ROLE = Number(process.env.USER_ROLE_ID);
   if (!user || user.role !== ADMIN_ROLE) {
    res.status(403).json({ message: 'Acceso denegado' });
    return;   // únicamente salimos, sin devolver res
  }
  next();
}
