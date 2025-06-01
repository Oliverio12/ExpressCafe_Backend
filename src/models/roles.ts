import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { clientes, clientesId } from './clientes';
import type { usuarios, usuariosId } from './usuarios';

export interface rolesAttributes {
  id_rol: number;
  nombre_rol: string;
}

export type rolesPk = "id_rol";
export type rolesId = roles[rolesPk];
export type rolesOptionalAttributes = "id_rol";
export type rolesCreationAttributes = Optional<rolesAttributes, rolesOptionalAttributes>;

export class roles extends Model<rolesAttributes, rolesCreationAttributes> implements rolesAttributes {
  id_rol!: number;
  nombre_rol!: string;

  // roles hasMany clientes via id_rol
  clientes!: clientes[];
  getClientes!: Sequelize.HasManyGetAssociationsMixin<clientes>;
  setClientes!: Sequelize.HasManySetAssociationsMixin<clientes, clientesId>;
  addCliente!: Sequelize.HasManyAddAssociationMixin<clientes, clientesId>;
  addClientes!: Sequelize.HasManyAddAssociationsMixin<clientes, clientesId>;
  createCliente!: Sequelize.HasManyCreateAssociationMixin<clientes>;
  removeCliente!: Sequelize.HasManyRemoveAssociationMixin<clientes, clientesId>;
  removeClientes!: Sequelize.HasManyRemoveAssociationsMixin<clientes, clientesId>;
  hasCliente!: Sequelize.HasManyHasAssociationMixin<clientes, clientesId>;
  hasClientes!: Sequelize.HasManyHasAssociationsMixin<clientes, clientesId>;
  countClientes!: Sequelize.HasManyCountAssociationsMixin;
  // roles hasMany usuarios via id_rol
  usuarios!: usuarios[];
  getUsuarios!: Sequelize.HasManyGetAssociationsMixin<usuarios>;
  setUsuarios!: Sequelize.HasManySetAssociationsMixin<usuarios, usuariosId>;
  addUsuario!: Sequelize.HasManyAddAssociationMixin<usuarios, usuariosId>;
  addUsuarios!: Sequelize.HasManyAddAssociationsMixin<usuarios, usuariosId>;
  createUsuario!: Sequelize.HasManyCreateAssociationMixin<usuarios>;
  removeUsuario!: Sequelize.HasManyRemoveAssociationMixin<usuarios, usuariosId>;
  removeUsuarios!: Sequelize.HasManyRemoveAssociationsMixin<usuarios, usuariosId>;
  hasUsuario!: Sequelize.HasManyHasAssociationMixin<usuarios, usuariosId>;
  hasUsuarios!: Sequelize.HasManyHasAssociationsMixin<usuarios, usuariosId>;
  countUsuarios!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof roles {
    return roles.init({
    id_rol: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre_rol: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "roles_nombre_rol_key"
    }
  }, {
    sequelize,
    tableName: 'roles',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "roles_nombre_rol_key",
        unique: true,
        fields: [
          { name: "nombre_rol" },
        ]
      },
      {
        name: "roles_pkey",
        unique: true,
        fields: [
          { name: "id_rol" },
        ]
      },
    ]
  });
  }
}
