// src/routes/index.ts
import { Router } from 'express';

import rolesRouter from './roles';
import usuariosRouter from './usuarios';
import clientesRouter from './clientes';
import categoriasRouter from './categorias';
import productosRouter from './productos';
import pedidosRouter from './pedidos';
import inventarioRouter from './inventarios';
import proveedoresRouter from './proveedores';
import comprasRouter from './compras';
import refreshTokensRouter from './refreshtokens';
import compraitemsRouter  from './compraitems';
import pedidoitemsRouter  from './pedidoitems';

// …importa aquí todos los routers que tengas

const router = Router();

// Prefija cada router con el segmento que quieras en tu API:
router.use('/roles', rolesRouter);
router.use('/usuarios', usuariosRouter);
router.use('/clientes', clientesRouter);
router.use('/categorias', categoriasRouter);
router.use('/productos', productosRouter);
router.use('/pedidos', pedidosRouter);
router.use('/inventario', inventarioRouter);
router.use('/proveedores', proveedoresRouter);
router.use('/compras', comprasRouter);
router.use('/refresh-tokens', refreshTokensRouter);
router.use('/compraItem', compraitemsRouter);
router.use('/pedidoItem', pedidoitemsRouter);
// …añade más según tus rutas

export default router;
