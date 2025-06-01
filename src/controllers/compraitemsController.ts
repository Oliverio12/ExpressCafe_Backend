import { Request, Response } from 'express';
import { compraitemsRepository } from '../repositories/compraitemsRepository';

export const getcompraitems = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const items = await compraitemsRepository.findAll();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener compraitems' });
  }
};

export const getcompraitemsById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const item = await compraitemsRepository.findById(id);
    if (!item) {
      res.status(404).json({ message: 'compraitems no encontrado' });
      return;
    }
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener compraitems' });
  }
};

export const createcompraitems = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const payload = req.body;
    const newItem = await compraitemsRepository.create(payload);
    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear compraitems' });
  }
};

export const updatecompraitems = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const [count, rows] = await compraitemsRepository.update(id, req.body);
    if (count === 0) {
      res.status(404).json({ message: 'compraitems no encontrado' });
      return;
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar compraitems' });
  }
};

export const deletecompraitems = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const deleted = await compraitemsRepository.delete(id);
    if (deleted === 0) {
      res.status(404).json({ message: 'compraitems no encontrado' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar compraitems' });
  }
};
