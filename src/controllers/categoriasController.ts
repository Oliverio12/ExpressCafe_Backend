import { Request, Response } from 'express';
import { categoriasRepository } from '../repositories/categoriasRepository';

export const getcategorias = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const items = await categoriasRepository.findAll();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener categorias' });
  }
};

export const getcategoriasById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const item = await categoriasRepository.findById(id);
    if (!item) {
      res.status(404).json({ message: 'categorias no encontrado' });
      return;
    }
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener categorias' });
  }
};

export const createcategorias = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const payload = req.body;
    const newItem = await categoriasRepository.create(payload);
    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear categorias' });
  }
};

export const updatecategorias = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const [count, rows] = await categoriasRepository.update(id, req.body);
    if (count === 0) {
      res.status(404).json({ message: 'categorias no encontrado' });
      return;
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar categorias' });
  }
};

export const deletecategorias = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const deleted = await categoriasRepository.delete(id);
    if (deleted === 0) {
      res.status(404).json({ message: 'categorias no encontrado' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar categorias' });
  }
};
