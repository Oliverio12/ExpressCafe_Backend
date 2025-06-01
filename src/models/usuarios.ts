import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { refreshtokens, refreshtokensId } from './refreshtokens';
import type { roles, rolesId } from './roles';

export interface usuariosAttributes {
  id_usuario: number;
  nombre: string;
  apellidos: string;
  email: string;
  password_hash: string;
  fecha_registro: Date;
  id_rol: number;
}

export type usuariosPk = "id_usuario";
export type usuariosId = usuarios[usuariosPk];
export type usuariosOptionalAttributes = "id_usuario" | "fecha_registro";
export type usuariosCreationAttributes = Optional<usuariosAttributes, usuariosOptionalAttributes>;

export class usuarios extends Model<usuariosAttributes, usuariosCreationAttributes> implements usuariosAttributes {
  id_usuario!: number;
  nombre!: string;
  apellidos!: string;
  email!: string;
  password_hash!: string;
  fecha_registro!: Date;
  id_rol!: number;

  // usuarios belongsTo roles via id_rol
  id_rol_role!: roles;
  getId_rol_role!: Sequelize.BelongsToGetAssociationMixin<roles>;
  setId_rol_role!: Sequelize.BelongsToSetAssociationMixin<roles, rolesId>;
  createId_rol_role!: Sequelize.BelongsToCreateAssociationMixin<roles>;
  // usuarios hasMany refreshtokens via id_usuario
  refreshtokens!: refreshtokens[];
  getRefreshtokens!: Sequelize.HasManyGetAssociationsMixin<refreshtokens>;
  setRefreshtokens!: Sequelize.HasManySetAssociationsMixin<refreshtokens, refreshtokensId>;
  addRefreshtoken!: Sequelize.HasManyAddAssociationMixin<refreshtokens, refreshtokensId>;
  addRefreshtokens!: Sequelize.HasManyAddAssociationsMixin<refreshtokens, refreshtokensId>;
  createRefreshtoken!: Sequelize.HasManyCreateAssociationMixin<refreshtokens>;
  removeRefreshtoken!: Sequelize.HasManyRemoveAssociationMixin<refreshtokens, refreshtokensId>;
  removeRefreshtokens!: Sequelize.HasManyRemoveAssociationsMixin<refreshtokens, refreshtokensId>;
  hasRefreshtoken!: Sequelize.HasManyHasAssociationMixin<refreshtokens, refreshtokensId>;
  hasRefreshtokens!: Sequelize.HasManyHasAssociationsMixin<refreshtokens, refreshtokensId>;
  countRefreshtokens!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof usuarios {
    return usuarios.init({
    id_usuario: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
      unique: "usuarios_email_key"
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false
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
    tableName: 'usuarios',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "usuarios_email_key",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "usuarios_pkey",
        unique: true,
        fields: [
          { name: "id_usuario" },
        ]
      },
    ]
  });
  }
}
