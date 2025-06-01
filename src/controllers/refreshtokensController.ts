// src/controllers/refreshTokensController.ts
import { Request, Response } from 'express';
import { refreshTokensRepository } from '../repositories/refreshtokensRepository';

// Obtener todos (si realmente lo necesitas)
export const getRefreshTokens = async (
  req: Request, res: Response
): Promise<void> => {
  try {
    const items = await refreshTokensRepository.findAll();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener tokens' });
  }
};

// Buscar por ID
export const getRefreshTokenById = async (
  req: Request, res: Response
): Promise<void> => {
  const id = Number(req.params.id);
  const item = await refreshTokensRepository.findById(id);
  if (!item) {
    res.status(404).json({ message: 'Token no encontrado' });
    return;
  }
  res.json(item);
};

// Crear nuevo
export const createRefreshToken = async (
  req: Request, res: Response
): Promise<void> => {
  const payload = req.body;
  const newItem = await refreshTokensRepository.create(payload);
  res.status(201).json(newItem);
};

// Revocar por ID
export const revokeById = async (
  req: Request, res: Response
): Promise<void> => {
  const id = Number(req.params.id);
  await refreshTokensRepository.revokeById(id);
  res.status(204).send();
};

// Revocar por token
export const revokeByToken = async (
  req: Request, res: Response
): Promise<void> => {
  const { token } = req.body;
  await refreshTokensRepository.revokeByToken(token);
  res.status(204).send();
};
