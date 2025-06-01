import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { compras, comprasId } from './compras';

export interface proveedoresAttributes {
  id_proveedor: number;
  nombre: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  contacto?: string;
}

export type proveedoresPk = "id_proveedor";
export type proveedoresId = proveedores[proveedoresPk];
export type proveedoresOptionalAttributes = "id_proveedor" | "telefono" | "email" | "direccion" | "contacto";
export type proveedoresCreationAttributes = Optional<proveedoresAttributes, proveedoresOptionalAttributes>;

export class proveedores extends Model<proveedoresAttributes, proveedoresCreationAttributes> implements proveedoresAttributes {
  id_proveedor!: number;
  nombre!: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  contacto?: string;

  // proveedores hasMany compras via id_proveedor
  compras!: compras[];
  getCompras!: Sequelize.HasManyGetAssociationsMixin<compras>;
  setCompras!: Sequelize.HasManySetAssociationsMixin<compras, comprasId>;
  addCompra!: Sequelize.HasManyAddAssociationMixin<compras, comprasId>;
  addCompras!: Sequelize.HasManyAddAssociationsMixin<compras, comprasId>;
  createCompra!: Sequelize.HasManyCreateAssociationMixin<compras>;
  removeCompra!: Sequelize.HasManyRemoveAssociationMixin<compras, comprasId>;
  removeCompras!: Sequelize.HasManyRemoveAssociationsMixin<compras, comprasId>;
  hasCompra!: Sequelize.HasManyHasAssociationMixin<compras, comprasId>;
  hasCompras!: Sequelize.HasManyHasAssociationsMixin<compras, comprasId>;
  countCompras!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof proveedores {
    return proveedores.init({
    id_proveedor: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    direccion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    contacto: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'proveedores',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "proveedores_pkey",
        unique: true,
        fields: [
          { name: "id_proveedor" },
        ]
      },
    ]
  });
  }
}
