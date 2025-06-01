import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { usuarios, usuariosId } from './usuarios';

export interface refreshtokensAttributes {
  id_token: number;
  id_usuario: number;
  token: string;
  issued_at: Date;
  expires_at: Date;
  is_revoked: boolean;
}

export type refreshtokensPk = "id_token";
export type refreshtokensId = refreshtokens[refreshtokensPk];
export type refreshtokensOptionalAttributes = "id_token" | "issued_at";
export type refreshtokensCreationAttributes = Optional<refreshtokensAttributes, refreshtokensOptionalAttributes>;

export class refreshtokens extends Model<refreshtokensAttributes, refreshtokensCreationAttributes> implements refreshtokensAttributes {
  id_token!: number;
  id_usuario!: number;
  token!: string;
  issued_at!: Date;
  expires_at!: Date;
  is_revoked!: boolean;

  // refreshtokens belongsTo usuarios via id_usuario
  id_usuario_usuario!: usuarios;
  getId_usuario_usuario!: Sequelize.BelongsToGetAssociationMixin<usuarios>;
  setId_usuario_usuario!: Sequelize.BelongsToSetAssociationMixin<usuarios, usuariosId>;
  createId_usuario_usuario!: Sequelize.BelongsToCreateAssociationMixin<usuarios>;

  static initModel(sequelize: Sequelize.Sequelize): typeof refreshtokens {
    return refreshtokens.init({
    id_token: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id_usuario'
      }
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: "refreshtokens_token_key"
    },
    issued_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    is_revoked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'refreshtokens',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "refreshtokens_pkey",
        unique: true,
        fields: [
          { name: "id_token" },
        ]
      },
      {
        name: "refreshtokens_token_key",
        unique: true,
        fields: [
          { name: "token" },
        ]
      },
    ]
  });
  }
}
