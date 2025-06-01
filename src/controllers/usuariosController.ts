import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { usuariosRepository } from '../repositories/usuariosRepository';
import { refreshTokensRepository } from '../repositories/refreshtokensRepository';

const JWT_SECRET = process.env.JWT_SECRET!;
const ACCESS_EXPIRES_IN = '1h';
const REFRESH_EXPIRES_DAYS = 7;

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre, apellidos, email, password, id_rol } = req.body;

    // 1) Verificar email no exista
    if (await usuariosRepository.findByEmail(email)) {
      res.status(400).json({ message: 'Email ya registrado' });
      return;
    }

    // 2) Hashear contraseña
    const password_hash = await bcrypt.hash(password, 10);

    // 3) Crear usuario
    const newUser = await usuariosRepository.create({
      nombre,
      apellidos,
      email,
      password_hash,
      id_rol,
    });

    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error registrando usuario' });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await usuariosRepository.findByEmail(email);
    if (!user) {
      res.status(401).json({ message: 'Credenciales inválidas' });
      return;
    }
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      res.status(401).json({ message: 'Credenciales inválidas' });
      return;
    }

    // 1) Generar access token
    const accessToken = jwt.sign(
      { id: user.id_usuario, email: user.email, role: user.id_rol },
      JWT_SECRET,
      { expiresIn: ACCESS_EXPIRES_IN }
    );

    // 2) Generar refresh token
    const refreshToken = jwt.sign(
      { id: user.id_usuario },
      JWT_SECRET,
      { expiresIn: `${REFRESH_EXPIRES_DAYS}d` }
    );

    // 3) Guardar refresh token en BD
    await refreshTokensRepository.create({
      id_usuario: user.id_usuario,
      token: refreshToken,
      expires_at: new Date(Date.now() + REFRESH_EXPIRES_DAYS * 24 * 3600 * 1000),
      is_revoked: false,
    });

    res.json({ accessToken, refreshToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body;
    const stored = await refreshTokensRepository.findByToken(refreshToken);
    if (!stored || stored.is_revoked || stored.expires_at < new Date()) {
      res.status(401).json({ message: 'Refresh token inválido' });
      return;
    }

    // 1) Verificar JWT
    const payload = jwt.verify(refreshToken, JWT_SECRET) as any;
    const userId = payload.id;

    // 2) Generar nuevos tokens
    const newAccess = jwt.sign(
      { id: userId, email: payload.email, role: payload.role },
      JWT_SECRET,
      { expiresIn: ACCESS_EXPIRES_IN }
    );
    const newRefresh = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: `${REFRESH_EXPIRES_DAYS}d` });

    // 3) Revocar y guardar
    await refreshTokensRepository.revokeById(stored.id_token);
    await refreshTokensRepository.create({
      id_usuario: userId,
      token: newRefresh,
      expires_at: new Date(Date.now() + REFRESH_EXPIRES_DAYS * 24 * 3600 * 1000),
      is_revoked: false,
    });

    res.json({ accessToken: newAccess, refreshToken: newRefresh });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al refrescar token' });
  }
};

export const logoutUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body;
    await refreshTokensRepository.revokeByToken(refreshToken);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al cerrar sesión' });
  }
};

export const getProfile = async (req: any, res: Response): Promise<void> => {
  try {
    // El middleware authenticateJWT habrá puesto req.user
    const userId = req.user.id;
    const user = await usuariosRepository.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error obteniendo perfil' });
  }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const all = await usuariosRepository.findAll();
    // eliminamos password_hash antes de enviar
    const safe = all.map(u => ({
      id_usuario: u.id_usuario,
      nombre: u.nombre,
      apellidos: u.apellidos,
      email: u.email,
      id_rol: u.id_rol,
      fecha_registro: u.fecha_registro
    }));
    res.json(safe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error obteniendo usuarios' });
  }
};

// Obtener un usuario por su ID (sin password)
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const u = await usuariosRepository.findById(id);
    if (!u) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }
    // “sanitizamos” el password_hash sacándolo de la respuesta
    const { password_hash, ...safe } = u.toJSON() as any;
    res.json(safe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error obteniendo usuario' });
  }
};



export const updateUser = async (req: any, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const { nombre, apellidos, email, id_rol } = req.body;
    const [count, updated] = await usuariosRepository.update(id, { nombre, apellidos, email, id_rol });
    if (count === 0) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }
    const { password_hash, ...safe } = updated[0].toJSON() as any;
    res.json(safe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error actualizando usuario' });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const deletedCount = await usuariosRepository.delete(id);
    if (deletedCount === 0) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error eliminando usuario' });
  }
};