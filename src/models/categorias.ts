import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { productos, productosId } from './productos';

export interface categoriasAttributes {
  id_categoria: number;
  nombre: string;
  descripcion?: string;
}

export type categoriasPk = "id_categoria";
export type categoriasId = categorias[categoriasPk];
export type categoriasOptionalAttributes = "id_categoria" | "descripcion";
export type categoriasCreationAttributes = Optional<categoriasAttributes, categoriasOptionalAttributes>;

export class categorias extends Model<categoriasAttributes, categoriasCreationAttributes> implements categoriasAttributes {
  id_categoria!: number;
  nombre!: string;
  descripcion?: string;

  // categorias hasMany productos via id_categoria
  productos!: productos[];
  getProductos!: Sequelize.HasManyGetAssociationsMixin<productos>;
  setProductos!: Sequelize.HasManySetAssociationsMixin<productos, productosId>;
  addProducto!: Sequelize.HasManyAddAssociationMixin<productos, productosId>;
  addProductos!: Sequelize.HasManyAddAssociationsMixin<productos, productosId>;
  createProducto!: Sequelize.HasManyCreateAssociationMixin<productos>;
  removeProducto!: Sequelize.HasManyRemoveAssociationMixin<productos, productosId>;
  removeProductos!: Sequelize.HasManyRemoveAssociationsMixin<productos, productosId>;
  hasProducto!: Sequelize.HasManyHasAssociationMixin<productos, productosId>;
  hasProductos!: Sequelize.HasManyHasAssociationsMixin<productos, productosId>;
  countProductos!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof categorias {
    return categorias.init({
    id_categoria: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "categorias_nombre_key"
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'categorias',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "categorias_nombre_key",
        unique: true,
        fields: [
          { name: "nombre" },
        ]
      },
      {
        name: "categorias_pkey",
        unique: true,
        fields: [
          { name: "id_categoria" },
        ]
      },
    ]
  });
  }
}
