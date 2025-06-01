import {
  pedidoitems,
  pedidoitemsCreationAttributes
} from '../models/pedidoitems';

export const pedidoitemsRepository = {
  findAll: (): Promise<pedidoitems[]> =>
    pedidoitems.findAll(),

  findById: (id: number): Promise<pedidoitems | null> =>
    pedidoitems.findByPk(id),

  create: (data: pedidoitemsCreationAttributes): Promise<pedidoitems> =>
    pedidoitems.create(data),

  update: (
    id: number,
    data: Partial<pedidoitems>
  ): Promise<[number, pedidoitems[]]> =>
    pedidoitems.update(data, {
      where: { id_detalle: id },
      returning: true
    }),

  delete: (id: number): Promise<number> =>
    pedidoitems.destroy({ where: { id_detalle: id } }),
};
