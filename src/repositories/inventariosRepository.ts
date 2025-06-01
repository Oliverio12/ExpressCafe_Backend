import {
  inventario,
  inventarioCreationAttributes
} from '../models/inventario';

export const inventariosRepository = {
  findAll: (): Promise<inventario[]> =>
    inventario.findAll(),

  findById: (id: number): Promise<inventario | null> =>
    inventario.findByPk(id),

  create: (data: inventarioCreationAttributes): Promise<inventario> =>
    inventario.create(data),

  update: (
    id: number,
    data: Partial<inventario>
  ): Promise<[number, inventario[]]> =>
    inventario.update(data, {
      where: { id_insumo: id },
      returning: true
    }),

  delete: (id: number): Promise<number> =>
    inventario.destroy({ where: { id_insumo: id } }),
};
