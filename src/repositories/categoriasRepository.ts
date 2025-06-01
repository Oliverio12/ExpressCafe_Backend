import {
  categorias,
  categoriasCreationAttributes
} from '../models/categorias';

export const categoriasRepository = {
  findAll: (): Promise<categorias[]> =>
    categorias.findAll(),

  findById: (id: number): Promise<categorias | null> =>
    categorias.findByPk(id),

  create: (data: categoriasCreationAttributes): Promise<categorias> =>
    categorias.create(data),

  update: (
    id: number,
    data: Partial<categorias>
  ): Promise<[number, categorias[]]> =>
    categorias.update(data, {
      where: { id_categoria: id },
      returning: true
    }),

  delete: (id: number): Promise<number> =>
    categorias.destroy({ where: { id_categoria: id } }),
};
