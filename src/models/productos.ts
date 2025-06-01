import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { categorias, categoriasId } from './categorias';
import type { pedidoitems, pedidoitemsId } from './pedidoitems';

export interface productosAttributes {
  id_producto: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  id_categoria: number;
  disponible: boolean;
  imagen_url?: string;
}

export type productosPk = "id_producto";
export type productosId = productos[productosPk];
export type productosOptionalAttributes = "id_producto" | "descripcion" | "disponible" | "imagen_url";
export type productosCreationAttributes = Optional<productosAttributes, productosOptionalAttributes>;

export class productos extends Model<productosAttributes, productosCreationAttributes> implements productosAttributes {
  id_producto!: number;
  nombre!: string;
  descripcion?: string;
  precio!: number;
  id_categoria!: number;
  disponible!: boolean;
  imagen_url?: string;

  // productos belongsTo categorias via id_categoria
  id_categoria_categoria!: categorias;
  getId_categoria_categoria!: Sequelize.BelongsToGetAssociationMixin<categorias>;
  setId_categoria_categoria!: Sequelize.BelongsToSetAssociationMixin<categorias, categoriasId>;
  createId_categoria_categoria!: Sequelize.BelongsToCreateAssociationMixin<categorias>;
  // productos hasMany pedidoitems via id_producto
  pedidoitems!: pedidoitems[];
  getPedidoitems!: Sequelize.HasManyGetAssociationsMixin<pedidoitems>;
  setPedidoitems!: Sequelize.HasManySetAssociationsMixin<pedidoitems, pedidoitemsId>;
  addPedidoitem!: Sequelize.HasManyAddAssociationMixin<pedidoitems, pedidoitemsId>;
  addPedidoitems!: Sequelize.HasManyAddAssociationsMixin<pedidoitems, pedidoitemsId>;
  createPedidoitem!: Sequelize.HasManyCreateAssociationMixin<pedidoitems>;
  removePedidoitem!: Sequelize.HasManyRemoveAssociationMixin<pedidoitems, pedidoitemsId>;
  removePedidoitems!: Sequelize.HasManyRemoveAssociationsMixin<pedidoitems, pedidoitemsId>;
  hasPedidoitem!: Sequelize.HasManyHasAssociationMixin<pedidoitems, pedidoitemsId>;
  hasPedidoitems!: Sequelize.HasManyHasAssociationsMixin<pedidoitems, pedidoitemsId>;
  countPedidoitems!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof productos {
    return productos.init({
    id_producto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    precio: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    id_categoria: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categorias',
        key: 'id_categoria'
      }
    },
    disponible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    imagen_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'productos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "productos_pkey",
        unique: true,
        fields: [
          { name: "id_producto" },
        ]
      },
    ]
  });
  }
}
