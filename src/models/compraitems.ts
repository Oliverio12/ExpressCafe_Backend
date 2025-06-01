import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { compras, comprasId } from './compras';
import type { inventario, inventarioId } from './inventario';

export interface compraitemsAttributes {
  id_detalle: number;
  id_compra: number;
  id_insumo: number;
  cantidad: number;
  precio_unit: number;
}

export type compraitemsPk = "id_detalle";
export type compraitemsId = compraitems[compraitemsPk];
export type compraitemsOptionalAttributes = "id_detalle";
export type compraitemsCreationAttributes = Optional<compraitemsAttributes, compraitemsOptionalAttributes>;

export class compraitems extends Model<compraitemsAttributes, compraitemsCreationAttributes> implements compraitemsAttributes {
  id_detalle!: number;
  id_compra!: number;
  id_insumo!: number;
  cantidad!: number;
  precio_unit!: number;

  // compraitems belongsTo compras via id_compra
  id_compra_compra!: compras;
  getId_compra_compra!: Sequelize.BelongsToGetAssociationMixin<compras>;
  setId_compra_compra!: Sequelize.BelongsToSetAssociationMixin<compras, comprasId>;
  createId_compra_compra!: Sequelize.BelongsToCreateAssociationMixin<compras>;
  // compraitems belongsTo inventario via id_insumo
  id_insumo_inventario!: inventario;
  getId_insumo_inventario!: Sequelize.BelongsToGetAssociationMixin<inventario>;
  setId_insumo_inventario!: Sequelize.BelongsToSetAssociationMixin<inventario, inventarioId>;
  createId_insumo_inventario!: Sequelize.BelongsToCreateAssociationMixin<inventario>;

  static initModel(sequelize: Sequelize.Sequelize): typeof compraitems {
    return compraitems.init({
    id_detalle: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_compra: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'compras',
        key: 'id_compra'
      }
    },
    id_insumo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'inventario',
        key: 'id_insumo'
      }
    },
    cantidad: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    precio_unit: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'compraitems',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "compraitems_pkey",
        unique: true,
        fields: [
          { name: "id_detalle" },
        ]
      },
    ]
  });
  }
}
