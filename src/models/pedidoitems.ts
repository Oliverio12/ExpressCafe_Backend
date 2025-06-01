import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { pedidos, pedidosId } from './pedidos';
import type { productos, productosId } from './productos';

export interface pedidoitemsAttributes {
  id_detalle: number;
  id_pedido: number;
  id_producto: number;
  cantidad: number;
  precio_unit: number;
}

export type pedidoitemsPk = "id_detalle";
export type pedidoitemsId = pedidoitems[pedidoitemsPk];
export type pedidoitemsOptionalAttributes = "id_detalle";
export type pedidoitemsCreationAttributes = Optional<pedidoitemsAttributes, pedidoitemsOptionalAttributes>;

export class pedidoitems extends Model<pedidoitemsAttributes, pedidoitemsCreationAttributes> implements pedidoitemsAttributes {
  id_detalle!: number;
  id_pedido!: number;
  id_producto!: number;
  cantidad!: number;
  precio_unit!: number;

  // pedidoitems belongsTo pedidos via id_pedido
  id_pedido_pedido!: pedidos;
  getId_pedido_pedido!: Sequelize.BelongsToGetAssociationMixin<pedidos>;
  setId_pedido_pedido!: Sequelize.BelongsToSetAssociationMixin<pedidos, pedidosId>;
  createId_pedido_pedido!: Sequelize.BelongsToCreateAssociationMixin<pedidos>;
  // pedidoitems belongsTo productos via id_producto
  id_producto_producto!: productos;
  getId_producto_producto!: Sequelize.BelongsToGetAssociationMixin<productos>;
  setId_producto_producto!: Sequelize.BelongsToSetAssociationMixin<productos, productosId>;
  createId_producto_producto!: Sequelize.BelongsToCreateAssociationMixin<productos>;

  static initModel(sequelize: Sequelize.Sequelize): typeof pedidoitems {
    return pedidoitems.init({
    id_detalle: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_pedido: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pedidos',
        key: 'id_pedido'
      }
    },
    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'productos',
        key: 'id_producto'
      }
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    precio_unit: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'pedidoitems',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pedidoitems_pkey",
        unique: true,
        fields: [
          { name: "id_detalle" },
        ]
      },
    ]
  });
  }
}
