import { Request, Response } from 'express';
import { comprasRepository } from '../repositories/comprasRepository';

export const getcompras = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const items = await comprasRepository.findAll();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener compras' });
  }
};

export const getcomprasById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const item = await comprasRepository.findById(id);
    if (!item) {
      res.status(404).json({ message: 'compras no encontrado' });
      return;
    }
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener compras' });
  }
};

export const createcompras = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const payload = req.body;
    const newItem = await comprasRepository.create(payload);
    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear compras' });
  }
};

export const updatecompras = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const [count, rows] = await comprasRepository.update(id, req.body);
    if (count === 0) {
      res.status(404).json({ message: 'compras no encontrado' });
      return;
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar compras' });
  }
};

export const deletecompras = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const deleted = await comprasRepository.delete(id);
    if (deleted === 0) {
      res.status(404).json({ message: 'compras no encontrado' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar compras' });
  }
};
