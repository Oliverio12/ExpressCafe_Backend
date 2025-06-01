import { Request, Response } from 'express';
import { rolesRepository } from '../repositories/rolesRepository';

export const getroles = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const items = await rolesRepository.findAll();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener roles' });
  }
};

export const getrolesById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const item = await rolesRepository.findById(id);
    if (!item) {
      res.status(404).json({ message: 'roles no encontrado' });
      return;
    }
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener roles' });
  }
};

export const createroles = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const payload = req.body;
    const newItem = await rolesRepository.create(payload);
    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear roles' });
  }
};

export const updateroles = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const [count, rows] = await rolesRepository.update(id, req.body);
    if (count === 0) {
      res.status(404).json({ message: 'roles no encontrado' });
      return;
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar roles' });
  }
};

export const deleteroles = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const deleted = await rolesRepository.delete(id);
    if (deleted === 0) {
      res.status(404).json({ message: 'roles no encontrado' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar roles' });
  }
};
