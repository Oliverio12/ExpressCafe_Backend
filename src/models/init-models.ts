import type { Sequelize } from "sequelize";
import { categorias as _categorias } from "./categorias";
import type { categoriasAttributes, categoriasCreationAttributes } from "./categorias";
import { clientes as _clientes } from "./clientes";
import type { clientesAttributes, clientesCreationAttributes } from "./clientes";
import { compraitems as _compraitems } from "./compraitems";
import type { compraitemsAttributes, compraitemsCreationAttributes } from "./compraitems";
import { compras as _compras } from "./compras";
import type { comprasAttributes, comprasCreationAttributes } from "./compras";
import { inventario as _inventario } from "./inventario";
import type { inventarioAttributes, inventarioCreationAttributes } from "./inventario";
import { pedidoitems as _pedidoitems } from "./pedidoitems";
import type { pedidoitemsAttributes, pedidoitemsCreationAttributes } from "./pedidoitems";
import { pedidos as _pedidos } from "./pedidos";
import type { pedidosAttributes, pedidosCreationAttributes } from "./pedidos";
import { productos as _productos } from "./productos";
import type { productosAttributes, productosCreationAttributes } from "./productos";
import { proveedores as _proveedores } from "./proveedores";
import type { proveedoresAttributes, proveedoresCreationAttributes } from "./proveedores";
import { refreshtokens as _refreshtokens } from "./refreshtokens";
import type { refreshtokensAttributes, refreshtokensCreationAttributes } from "./refreshtokens";
import { roles as _roles } from "./roles";
import type { rolesAttributes, rolesCreationAttributes } from "./roles";
import { usuarios as _usuarios } from "./usuarios";
import type { usuariosAttributes, usuariosCreationAttributes } from "./usuarios";

export {
  _categorias as categorias,
  _clientes as clientes,
  _compraitems as compraitems,
  _compras as compras,
  _inventario as inventario,
  _pedidoitems as pedidoitems,
  _pedidos as pedidos,
  _productos as productos,
  _proveedores as proveedores,
  _refreshtokens as refreshtokens,
  _roles as roles,
  _usuarios as usuarios,
};

export type {
  categoriasAttributes,
  categoriasCreationAttributes,
  clientesAttributes,
  clientesCreationAttributes,
  compraitemsAttributes,
  compraitemsCreationAttributes,
  comprasAttributes,
  comprasCreationAttributes,
  inventarioAttributes,
  inventarioCreationAttributes,
  pedidoitemsAttributes,
  pedidoitemsCreationAttributes,
  pedidosAttributes,
  pedidosCreationAttributes,
  productosAttributes,
  productosCreationAttributes,
  proveedoresAttributes,
  proveedoresCreationAttributes,
  refreshtokensAttributes,
  refreshtokensCreationAttributes,
  rolesAttributes,
  rolesCreationAttributes,
  usuariosAttributes,
  usuariosCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const categorias = _categorias.initModel(sequelize);
  const clientes = _clientes.initModel(sequelize);
  const compraitems = _compraitems.initModel(sequelize);
  const compras = _compras.initModel(sequelize);
  const inventario = _inventario.initModel(sequelize);
  const pedidoitems = _pedidoitems.initModel(sequelize);
  const pedidos = _pedidos.initModel(sequelize);
  const productos = _productos.initModel(sequelize);
  const proveedores = _proveedores.initModel(sequelize);
  const refreshtokens = _refreshtokens.initModel(sequelize);
  const roles = _roles.initModel(sequelize);
  const usuarios = _usuarios.initModel(sequelize);

  productos.belongsTo(categorias, { foreignKey: "id_categoria"});
  categorias.hasMany(productos, { foreignKey: "id_categoria"});
  pedidos.belongsTo(clientes, { foreignKey: "id_cliente"});
  clientes.hasMany(pedidos, { foreignKey: "id_cliente"});
  compraitems.belongsTo(compras, { foreignKey: "id_compra"});
  compras.hasMany(compraitems, { foreignKey: "id_compra"});
  compraitems.belongsTo(inventario, { foreignKey: "id_insumo"});
  inventario.hasMany(compraitems, { foreignKey: "id_insumo"});
  pedidoitems.belongsTo(pedidos, { foreignKey: "id_pedido"});
  pedidos.hasMany(pedidoitems, { foreignKey: "id_pedido"});
  pedidoitems.belongsTo(productos, { foreignKey: "id_producto"});
  productos.hasMany(pedidoitems, { foreignKey: "id_producto"});
  compras.belongsTo(proveedores, { foreignKey: "id_proveedor"});
  proveedores.hasMany(compras, { foreignKey: "id_proveedor"});
  clientes.belongsTo(roles, { foreignKey: "id_rol"});
  roles.hasMany(clientes, { foreignKey: "id_rol"});
  usuarios.belongsTo(roles, { foreignKey: "id_rol"});
  roles.hasMany(usuarios, { foreignKey: "id_rol"});
  refreshtokens.belongsTo(usuarios, { foreignKey: "id_usuario"});
  usuarios.hasMany(refreshtokens, { foreignKey: "id_usuario"});

  return {
    categorias: categorias,
    clientes: clientes,
    compraitems: compraitems,
    compras: compras,
    inventario: inventario,
    pedidoitems: pedidoitems,
    pedidos: pedidos,
    productos: productos,
    proveedores: proveedores,
    refreshtokens: refreshtokens,
    roles: roles,
    usuarios: usuarios,
  };
}
