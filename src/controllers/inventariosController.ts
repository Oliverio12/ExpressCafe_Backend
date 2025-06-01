import { Request, Response } from 'express';
import { inventariosRepository } from '../repositories/inventariosRepository';

export const getinventarios = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const items = await inventariosRepository.findAll();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener inventarios' });
  }
};

export const getinventariosById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const item = await inventariosRepository.findById(id);
    if (!item) {
      res.status(404).json({ message: 'inventarios no encontrado' });
      return;
    }
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener inventarios' });
  }
};

export const createinventarios = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const payload = req.body;
    const newItem = await inventariosRepository.create(payload);
    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear inventarios' });
  }
};

export const updateinventarios = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const [count, rows] = await inventariosRepository.update(id, req.body);
    if (count === 0) {
      res.status(404).json({ message: 'inventarios no encontrado' });
      return;
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar inventarios' });
  }
};

export const deleteinventarios = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const deleted = await inventariosRepository.delete(id);
    if (deleted === 0) {
      res.status(404).json({ message: 'inventarios no encontrado' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar inventarios' });
  }
};
