import {
  roles,
  rolesCreationAttributes
} from '../models/roles';

export const rolesRepository = {
  findAll: (): Promise<roles[]> =>
    roles.findAll(),

  findById: (id: number): Promise<roles | null> =>
    roles.findByPk(id),

  create: (data: rolesCreationAttributes): Promise<roles> =>
    roles.create(data),

  update: (
    id: number,
    data: Partial<roles>
  ): Promise<[number, roles[]]> =>
    roles.update(data, {
      where: { id_rol: id },
      returning: true
    }),

  delete: (id: number): Promise<number> =>
    roles.destroy({ where: { id_rol: id } }),
};
