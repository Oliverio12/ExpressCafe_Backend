// src/controllers/pedidosController.ts

import { Request, Response } from 'express';
import { pedidosRepository } from '../repositories/pedidosRepository';
import { pedidoitemsRepository } from '../repositories/pedidoitemsRepository';
import { sendEmail } from '../utils/mailer';
import { generateInvoicePdf, InvoiceData } from '../utils/invoice';
import { clientesRepository } from '../repositories/clientesRepository';
import { productosRepository } from '../repositories/productosRepository';

export const getpedidos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const items = await pedidosRepository.findAll();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener pedidos' });
  }
};

export const getpedidosById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const item = await pedidosRepository.findById(id);
    if (!item) {
      res.status(404).json({ message: 'Pedido no encontrado' });
      return;
    }
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener pedido' });
  }
};
export const createpedidos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // 1) Extraer id_cliente e items del body (solo id_producto y cantidad)
    const { id_cliente, items } = req.body as {
      id_cliente: number;
      items: Array<{ id_producto: number; cantidad: number }>;
    };

    // 2) Obtener datos del cliente
    const client = await clientesRepository.findById(id_cliente);
    if (!client) {
      res.status(404).json({ message: 'Cliente no encontrado' });
      return;
    }
    const clienteNombre = `${client.nombre} ${client.apellidos}`;
    const clienteEmail  = client.email;

    // 3) Crear el pedido (total provisional = 0)
    const order = await pedidosRepository.create({ id_cliente, total: 0 });

    // 4) Para cada item: obtener producto, calcular línea y guardar
    let total = 0;
    const invoiceItems: Array<{
      descripción: string;
      cantidad: number;
      precioUnit: number;
      total: number;
    }> = [];

    for (const it of items) {
      // 4.1) Traer datos del producto
      const product = await productosRepository.findById(it.id_producto);
      if (!product) {
        res.status(404).json({ message: `Producto ${it.id_producto} no existe` });
        return;
      }

      const precioUnit = Number(product.precio);
      const lineTotal  = precioUnit * it.cantidad;
      total += lineTotal;

      invoiceItems.push({
        descripción: product.descripcion ?? product.nombre,
        cantidad:     it.cantidad,
        precioUnit,
        total:        lineTotal
      });

      // 4.2) Guardar el item en la BD
      await pedidoitemsRepository.create({
        id_pedido:    order.id_pedido,
        id_producto:  it.id_producto,
        cantidad:     it.cantidad,
        precio_unit:  precioUnit
      });
    }

    // 5) Actualizar total acumulado en Pedidos
    await pedidosRepository.update(order.id_pedido, { total });

    // 6) Preparar datos de la factura
    const invoiceData: InvoiceData = {
      numero:  order.id_pedido,
      fecha:   new Date(),
      cliente: { nombre: clienteNombre, email: clienteEmail },
      items:   invoiceItems,
      total
    };

    // 7) Generar PDF y enviar por correo
    const pdfBuffer = await generateInvoicePdf(invoiceData);
    await sendEmail(
      clienteEmail,
      `Factura Pedido #${order.id_pedido}`,
      `<p>Hola ${clienteNombre},</p>
       <p>Adjuntamos la factura de tu pedido <strong>#${order.id_pedido}</strong> por un total de <strong>$${total.toFixed(2)}</strong>.</p>`,
      [{ filename: `factura_${order.id_pedido}.pdf`, content: pdfBuffer }]
    );

    // 8) Responder con el pedido y el total
    res.status(201).json({ pedido: order, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear pedido o enviar factura' });
  }
};

export const updatepedidos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const [count, rows] = await pedidosRepository.update(id, req.body);
    if (count === 0) {
      res.status(404).json({ message: 'Pedido no encontrado' });
      return;
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar pedido' });
  }
};

export const deletepedidos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const deleted = await pedidosRepository.delete(id);
    if (deleted === 0) {
      res.status(404).json({ message: 'Pedido no encontrado' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar pedido' });
  }
};
