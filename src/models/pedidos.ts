import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { clientes, clientesId } from './clientes';
import type { pedidoitems, pedidoitemsId } from './pedidoitems';

export interface pedidosAttributes {
  id_pedido: number;
  id_cliente: number;
  fecha_pedido: Date;
  estado_pedido: string;
  total: number;
}

export type pedidosPk = "id_pedido";
export type pedidosId = pedidos[pedidosPk];
export type pedidosOptionalAttributes = "id_pedido" | "fecha_pedido" | "estado_pedido";
export type pedidosCreationAttributes = Optional<pedidosAttributes, pedidosOptionalAttributes>;

export class pedidos extends Model<pedidosAttributes, pedidosCreationAttributes> implements pedidosAttributes {
  id_pedido!: number;
  id_cliente!: number;
  fecha_pedido!: Date;
  estado_pedido!: string;
  total!: number;

  // pedidos belongsTo clientes via id_cliente
  id_cliente_cliente!: clientes;
  getId_cliente_cliente!: Sequelize.BelongsToGetAssociationMixin<clientes>;
  setId_cliente_cliente!: Sequelize.BelongsToSetAssociationMixin<clientes, clientesId>;
  createId_cliente_cliente!: Sequelize.BelongsToCreateAssociationMixin<clientes>;
  // pedidos hasMany pedidoitems via id_pedido
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

  static initModel(sequelize: Sequelize.Sequelize): typeof pedidos {
    return pedidos.init({
    id_pedido: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'clientes',
        key: 'id_cliente'
      }
    },
    fecha_pedido: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    estado_pedido: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "pendiente"
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'pedidos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pedidos_pkey",
        unique: true,
        fields: [
          { name: "id_pedido" },
        ]
      },
    ]
  });
  }
}
