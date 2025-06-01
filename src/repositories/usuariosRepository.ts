import { usuarios, usuariosCreationAttributes } from "../models/usuarios";

export const usuariosRepository = {
  findAll: (): Promise<usuarios[]> => usuarios.findAll(),

  findByEmail: (email: string): Promise<usuarios | null> =>
    usuarios.findOne({ where: { email } }),

  findById: (id: number): Promise<usuarios | null> =>
    usuarios.findByPk(id),

  create: (data: usuariosCreationAttributes): Promise<usuarios> =>
    usuarios.create(data),
  
  update: (
    id: number,
    data: Partial<usuarios>
  ): Promise<[number, usuarios[]]> =>
    usuarios.update(data, {
      where: { id_usuario: id },
      returning: true,
    }),

  delete: (id: number): Promise<number> =>
    usuarios.destroy({ where: { id_usuario: id } }),
  
};
