import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { pedidos, pedidosId } from './pedidos';
import type { roles, rolesId } from './roles';

export interface clientesAttributes {
  id_cliente: number;
  google_sub: string;
  nombre: string;
  apellidos: string;
  email: string;
  fecha_registro: Date;
  id_rol: number;
}

export type clientesPk = "id_cliente";
export type clientesId = clientes[clientesPk];
export type clientesOptionalAttributes = "id_cliente" | "fecha_registro";
export type clientesCreationAttributes = Optional<clientesAttributes, clientesOptionalAttributes>;

export class clientes extends Model<clientesAttributes, clientesCreationAttributes> implements clientesAttributes {
  id_cliente!: number;
  google_sub!: string;
  nombre!: string;
  apellidos!: string;
  email!: string;
  fecha_registro!: Date;
  id_rol!: number;

  // clientes hasMany pedidos via id_cliente
  pedidos!: pedidos[];
  getPedidos!: Sequelize.HasManyGetAssociationsMixin<pedidos>;
  setPedidos!: Sequelize.HasManySetAssociationsMixin<pedidos, pedidosId>;
  addPedido!: Sequelize.HasManyAddAssociationMixin<pedidos, pedidosId>;
  addPedidos!: Sequelize.HasManyAddAssociationsMixin<pedidos, pedidosId>;
  createPedido!: Sequelize.HasManyCreateAssociationMixin<pedidos>;
  removePedido!: Sequelize.HasManyRemoveAssociationMixin<pedidos, pedidosId>;
  removePedidos!: Sequelize.HasManyRemoveAssociationsMixin<pedidos, pedidosId>;
  hasPedido!: Sequelize.HasManyHasAssociationMixin<pedidos, pedidosId>;
  hasPedidos!: Sequelize.HasManyHasAssociationsMixin<pedidos, pedidosId>;
  countPedidos!: Sequelize.HasManyCountAssociationsMixin;
  // clientes belongsTo roles via id_rol
  id_rol_role!: roles;
  getId_rol_role!: Sequelize.BelongsToGetAssociationMixin<roles>;
  setId_rol_role!: Sequelize.BelongsToSetAssociationMixin<roles, rolesId>;
  createId_rol_role!: Sequelize.BelongsToCreateAssociationMixin<roles>;

  static initModel(sequelize: Sequelize.Sequelize): typeof clientes {
    return clientes.init({
    id_cliente: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    google_sub: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "clientes_google_sub_key"
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    apellidos: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: "clientes_email_key"
    },
    fecha_registro: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    id_rol: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'id_rol'
      }
    }
  }, {
    sequelize,
    tableName: 'clientes',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "clientes_email_key",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "clientes_google_sub_key",
        unique: true,
        fields: [
          { name: "google_sub" },
        ]
      },
      {
        name: "clientes_pkey",
        unique: true,
        fields: [
          { name: "id_cliente" },
        ]
      },
    ]
  });
  }
}
