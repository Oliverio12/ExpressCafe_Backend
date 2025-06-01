import {
  clientes,
  clientesCreationAttributes
} from '../models/clientes';

export const clientesRepository = {
  // CRUD genérico
  findAll: (): Promise<clientes[]> =>
    clientes.findAll(),

  findById: (id: number): Promise<clientes | null> =>
    clientes.findByPk(id),

  create: (data: clientesCreationAttributes): Promise<clientes> =>
    clientes.create(data),

  update: (
    id: number,
    data: Partial<clientes>
  ): Promise<[number, clientes[]]> =>
    clientes.update(data, {
      where: { id_cliente: id },
      returning: true
    }),

  delete: (id: number): Promise<number> =>
    clientes.destroy({ where: { id_cliente: id } }),

  // Métodos para Google OAuth2
  findBySub: (sub: string): Promise<clientes | null> =>
    clientes.findOne({ where: { google_sub: sub } })
};
