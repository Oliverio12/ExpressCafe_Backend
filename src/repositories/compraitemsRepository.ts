import {
  compraitems,
  compraitemsCreationAttributes
} from '../models/compraitems';

export const compraitemsRepository = {
  findAll: (): Promise<compraitems[]> =>
    compraitems.findAll(),

  findById: (id: number): Promise<compraitems | null> =>
    compraitems.findByPk(id),

  create: (data: compraitemsCreationAttributes): Promise<compraitems> =>
    compraitems.create(data),

  update: (
    id: number,
    data: Partial<compraitems>
  ): Promise<[number, compraitems[]]> =>
    compraitems.update(data, {
      where: { id_detalle: id },
      returning: true
    }),

  delete: (id: number): Promise<number> =>
    compraitems.destroy({ where: { id_detalle: id } }),
};
