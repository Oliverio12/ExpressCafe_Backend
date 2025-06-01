import {
  pedidos,
  pedidosCreationAttributes
} from '../models/pedidos';

export const pedidosRepository = {
  findAll: (): Promise<pedidos[]> =>
    pedidos.findAll(),

  findById: (id: number): Promise<pedidos | null> =>
    pedidos.findByPk(id),

  create: (data: pedidosCreationAttributes): Promise<pedidos> =>
    pedidos.create(data),

  update: (
    id: number,
    data: Partial<pedidos>
  ): Promise<[number, pedidos[]]> =>
    pedidos.update(data, {
      where: { id_pedido: id },
      returning: true
    }),

  delete: (id: number): Promise<number> =>
    pedidos.destroy({ where: { id_pedido: id } }),
};
