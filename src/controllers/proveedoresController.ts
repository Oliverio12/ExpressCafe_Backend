import { Request, Response } from 'express';
import { proveedoresRepository } from '../repositories/proveedoresRepository';

export const getproveedores = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const items = await proveedoresRepository.findAll();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener proveedores' });
  }
};

export const getproveedoresById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const item = await proveedoresRepository.findById(id);
    if (!item) {
      res.status(404).json({ message: 'proveedores no encontrado' });
      return;
    }
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener proveedores' });
  }
};

export const createproveedores = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const payload = req.body;
    const newItem = await proveedoresRepository.create(payload);
    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear proveedores' });
  }
};

export const updateproveedores = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const [count, rows] = await proveedoresRepository.update(id, req.body);
    if (count === 0) {
      res.status(404).json({ message: 'proveedores no encontrado' });
      return;
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar proveedores' });
  }
};

export const deleteproveedores = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const deleted = await proveedoresRepository.delete(id);
    if (deleted === 0) {
      res.status(404).json({ message: 'proveedores no encontrado' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar proveedores' });
  }
};
