// test-factura.ts

import dotenv from 'dotenv';
dotenv.config();

import { generateInvoicePdf, InvoiceData } from './utils/invoice';
import { sendEmail } from './utils/mailer';

(async () => {
  try {
    // 1) Simula datos de factura
    const invoiceData: InvoiceData = {
      numero: 999,
      fecha: new Date(),
      cliente: {
        nombre: 'Amooooooooooooor',
        email: 'vaneoutsider@gmail.com'!   // reenvíalo a tu propia cuenta
      },
      items: [
        { descripción: 'Producto A', cantidad: 1, precioUnit: 10.0, total: 10.0 },
        { descripción: 'Producto B', cantidad: 2, precioUnit: 5.5, total: 11.0 }
      ],
      total: 21.0
    };

    // 2) Genera el PDF
    console.log('🖨️  Generando PDF de factura…');
    const pdfBuffer = await generateInvoicePdf(invoiceData);

    // 3) Envía el correo con el PDF adjunto
    console.log('✉️  Enviando correo con factura…');
    await sendEmail(
      invoiceData.cliente.email,
      `Facturacion #${invoiceData.numero}`,
      `<p>Hola ${invoiceData.cliente.nombre},</p>
       <p>Adjunto la factura de prueba <strong>#${invoiceData.numero}</strong>.</p>`,
      [{ filename: `factura_test_${invoiceData.numero}.pdf`, content: pdfBuffer }]
    );

    console.log('✅ Factura enviada correctamente');
  } catch (err) {
    console.error('❌ Error en test-factura:', err);
  }
})();
