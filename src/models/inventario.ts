import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { compraitems, compraitemsId } from './compraitems';

export interface inventarioAttributes {
  id_insumo: number;
  nombre: string;
  descripcion?: string;
  cantidad_disp: number;
  unidad_medida: string;
}

export type inventarioPk = "id_insumo";
export type inventarioId = inventario[inventarioPk];
export type inventarioOptionalAttributes = "id_insumo" | "descripcion";
export type inventarioCreationAttributes = Optional<inventarioAttributes, inventarioOptionalAttributes>;

export class inventario extends Model<inventarioAttributes, inventarioCreationAttributes> implements inventarioAttributes {
  id_insumo!: number;
  nombre!: string;
  descripcion?: string;
  cantidad_disp!: number;
  unidad_medida!: string;

  // inventario hasMany compraitems via id_insumo
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

  static initModel(sequelize: Sequelize.Sequelize): typeof inventario {
    return inventario.init({
    id_insumo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: "inventario_nombre_key"
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    cantidad_disp: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    unidad_medida: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'inventario',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "inventario_nombre_key",
        unique: true,
        fields: [
          { name: "nombre" },
        ]
      },
      {
        name: "inventario_pkey",
        unique: true,
        fields: [
          { name: "id_insumo" },
        ]
      },
    ]
  });
  }
}
