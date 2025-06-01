import { Request, Response } from 'express';
import { productosRepository } from '../repositories/productosRepository';

export const getproductos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const items = await productosRepository.findAll();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener productos' });
  }
};

export const getproductosById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const item = await productosRepository.findById(id);
    if (!item) {
      res.status(404).json({ message: 'productos no encontrado' });
      return;
    }
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener productos' });
  }
};

export const createproductos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const payload = req.body;
    const newItem = await productosRepository.create(payload);
    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear productos' });
  }
};

export const updateproductos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const [count, rows] = await productosRepository.update(id, req.body);
    if (count === 0) {
      res.status(404).json({ message: 'productos no encontrado' });
      return;
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar productos' });
  }
};

export const deleteproductos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const deleted = await productosRepository.delete(id);
    if (deleted === 0) {
      res.status(404).json({ message: 'productos no encontrado' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar productos' });
  }
};
