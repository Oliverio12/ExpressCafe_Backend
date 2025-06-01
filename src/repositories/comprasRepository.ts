import {
  compras,
  comprasCreationAttributes
} from '../models/compras';

export const comprasRepository = {
  findAll: (): Promise<compras[]> =>
    compras.findAll(),

  findById: (id: number): Promise<compras | null> =>
    compras.findByPk(id),

  create: (data: comprasCreationAttributes): Promise<compras> =>
    compras.create(data),

  update: (
    id: number,
    data: Partial<compras>
  ): Promise<[number, compras[]]> =>
    compras.update(data, {
      where: { id_compra: id },
      returning: true
    }),

  delete: (id: number): Promise<number> =>
    compras.destroy({ where: { id_compra: id } }),
};
