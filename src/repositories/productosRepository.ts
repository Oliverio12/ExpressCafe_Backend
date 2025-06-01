import {
  productos,
  productosCreationAttributes
} from '../models/productos';

export const productosRepository = {
  findAll: (): Promise<productos[]> =>
    productos.findAll(),

  findById: (id: number): Promise<productos | null> =>
    productos.findByPk(id),

  create: (data: productosCreationAttributes): Promise<productos> =>
    productos.create(data),

  update: (
    id: number,
    data: Partial<productos>
  ): Promise<[number, productos[]]> =>
    productos.update(data, {
      where: { id_producto: id },
      returning: true
    }),

  delete: (id: number): Promise<number> =>
    productos.destroy({ where: { id_producto: id } }),
};
