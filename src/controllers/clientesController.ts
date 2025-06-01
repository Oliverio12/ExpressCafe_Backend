// src/controllers/clientesController.ts

import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { clientesRepository } from '../repositories/clientesRepository';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const CLIENT_ROLE_ID = Number(process.env.CLIENT_ROLE_ID!);
const JWT_SECRET = process.env.JWT_SECRET!;
const oauthClient = new OAuth2Client(GOOGLE_CLIENT_ID);

// Login y registro automático vía Google OAuth2
export const googleLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { idToken } = req.body;
    if (!idToken) {
      res.status(400).json({ message: 'idToken es requerido' });
      return;
    }

    // 1) Verificar token con Google
    const ticket = await oauthClient.verifyIdToken({
      idToken,
      audience: GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();
    if (!payload) throw new Error('Google token inválido');

    const { sub, given_name, family_name, email } = payload;

    // 2) Buscar o crear cliente en nuestra BD
    let client = await clientesRepository.findBySub(sub);
    if (!client) {
      client = await clientesRepository.create({
        google_sub: sub,
        nombre: given_name!,
        apellidos: family_name!,
        email: email!,
        id_rol: CLIENT_ROLE_ID
      });
    }

    // 3) Generar nuestro JWT de acceso
    const accessToken = jwt.sign(
      { id: client.id_cliente, email: client.email, role: CLIENT_ROLE_ID },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ accessToken });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(401).json({ message: 'Autenticación con Google fallida' });
  }
};

// CRUD genérico para Clientes
export const getclientes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const items = await clientesRepository.findAll();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener clientes' });
  }
};

export const getclientesById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const item = await clientesRepository.findById(id);
    if (!item) {
      res.status(404).json({ message: 'Cliente no encontrado' });
      return;
    }
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener cliente' });
  }
};

export const createclientes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const payload = req.body;
    const newItem = await clientesRepository.create(payload);
    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear cliente' });
  }
};

export const updateclientes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const [count, rows] = await clientesRepository.update(id, req.body);
    if (count === 0) {
      res.status(404).json({ message: 'Cliente no encontrado' });
      return;
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar cliente' });
  }
};

export const deleteclientes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const deleted = await clientesRepository.delete(id);
    if (deleted === 0) {
      res.status(404).json({ message: 'Cliente no encontrado' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar cliente' });
  }
};
