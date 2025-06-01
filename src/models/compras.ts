import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { compraitems, compraitemsId } from './compraitems';
import type { proveedores, proveedoresId } from './proveedores';

export interface comprasAttributes {
  id_compra: number;
  id_proveedor: number;
  fecha_compra: Date;
  total: number;
}

export type comprasPk = "id_compra";
export type comprasId = compras[comprasPk];
export type comprasOptionalAttributes = "id_compra" | "fecha_compra";
export type comprasCreationAttributes = Optional<comprasAttributes, comprasOptionalAttributes>;

export class compras extends Model<comprasAttributes, comprasCreationAttributes> implements comprasAttributes {
  id_compra!: number;
  id_proveedor!: number;
  fecha_compra!: Date;
  total!: number;

  // compras hasMany compraitems via id_compra
  compraitems!: compraitems[];
  getCompraitems!: Sequelize.HasManyGetAssociationsMixin<compraitems>;
  setCompraitems!: Sequelize.HasManySetAssociationsMixin<compraitems, compraitemsId>;
  addCompraitem!: Sequelize.HasManyAddAssociationMixin<compraitems, compraitemsId>;
  addCompraitems!: Sequelize.HasManyAddAssociationsMixin<compraitems, compraitemsId>;
  createCompraitem!: Sequelize.HasManyCreateAssociationMixin<compraitems>;
  removeCompraitem!: Sequelize.HasManyRemoveAssociationMixin<compraitems, compraitemsId>;
  removeCompraitems!: Sequelize.HasManyRemoveAssociationsMixin<compraitems, compraitemsId>;
  hasCompraitem!: Sequelize.HasManyHasAssociationMixin<compraitems, compraitemsId>;
  hasCompraitems!: Sequelize.HasManyHasAssociationsMixin<compraitems, compraitemsId>;
  countCompraitems!: Sequelize.HasManyCountAssociationsMixin;
  // compras belongsTo proveedores via id_proveedor
  id_proveedor_proveedore!: proveedores;
  getId_proveedor_proveedore!: Sequelize.BelongsToGetAssociationMixin<proveedores>;
  setId_proveedor_proveedore!: Sequelize.BelongsToSetAssociationMixin<proveedores, proveedoresId>;
  createId_proveedor_proveedore!: Sequelize.BelongsToCreateAssociationMixin<proveedores>;

  static initModel(sequelize: Sequelize.Sequelize): typeof compras {
    return compras.init({
    id_compra: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_proveedor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'proveedores',
        key: 'id_proveedor'
      }
    },
    fecha_compra: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'compras',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "compras_pkey",
        unique: true,
        fields: [
          { name: "id_compra" },
        ]
      },
    ]
  });
  }
}
