import { Request, Response } from 'express';
import { pedidoitemsRepository } from '../repositories/pedidoitemsRepository';

export const getpedidoitems = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const items = await pedidoitemsRepository.findAll();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener pedidoitems' });
  }
};

export const getpedidoitemsById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const item = await pedidoitemsRepository.findById(id);
    if (!item) {
      res.status(404).json({ message: 'pedidoitems no encontrado' });
      return;
    }
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener pedidoitems' });
  }
};

export const createpedidoitems = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const payload = req.body;
    const newItem = await pedidoitemsRepository.create(payload);
    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear pedidoitems' });
  }
};

export const updatepedidoitems = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const [count, rows] = await pedidoitemsRepository.update(id, req.body);
    if (count === 0) {
      res.status(404).json({ message: 'pedidoitems no encontrado' });
      return;
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar pedidoitems' });
  }
};

export const deletepedidoitems = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const deleted = await pedidoitemsRepository.delete(id);
    if (deleted === 0) {
      res.status(404).json({ message: 'pedidoitems no encontrado' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar pedidoitems' });
  }
};
