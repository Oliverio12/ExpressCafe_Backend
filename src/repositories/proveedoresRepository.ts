import {
  proveedores,
  proveedoresCreationAttributes
} from '../models/proveedores';

export const proveedoresRepository = {
  findAll: (): Promise<proveedores[]> =>
    proveedores.findAll(),

  findById: (id: number): Promise<proveedores | null> =>
    proveedores.findByPk(id),

  create: (data: proveedoresCreationAttributes): Promise<proveedores> =>
    proveedores.create(data),

  update: (
    id: number,
    data: Partial<proveedores>
  ): Promise<[number, proveedores[]]> =>
    proveedores.update(data, {
      where: { id_proveedor: id },
      returning: true
    }),

  delete: (id: number): Promise<number> =>
    proveedores.destroy({ where: { id_proveedor: id } }),
};
