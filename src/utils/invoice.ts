// src/utils/invoice.ts
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export interface InvoiceItem {
  descripción: string;
  cantidad: number;
  precioUnit: number;
  total: number;
}

export interface InvoiceData {
  numero: number;
  fecha: Date;
  cliente: { nombre: string; email: string };
  items: InvoiceItem[];
  total: number;
}

export function generateInvoicePdf(data: InvoiceData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const bufs: Buffer[] = [];
    const { width } = doc.page;

    doc.on('data', bufs.push.bind(bufs));
    doc.on('end', () => resolve(Buffer.concat(bufs)));
    doc.on('error', reject);

    
    // ---- Background Header ----
    doc
    .rect(0, 0, width, 80)
    .fill('#4F81BD')
    // ---- Logo ----
    const logoPath = path.resolve(__dirname, '../assets/logo.png');
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 50, 20, { width: 60 });
    }
    
    doc
    .fillColor('#FFFFFF')
    .fontSize(28)
    .text('ExpressCafe', 130, 30) // movido para no tapar el logo
    .fontSize(14)
    .text(`Factura Nº: ${data.numero}`, width - 200, 40, { align: 'right' })
    .fillColor('#000000'); // reset fill
    
    // ---- Invoice meta ----
    doc
      .moveDown(2)
      .fontSize(12)
      .text(`Fecha: ${data.fecha.toLocaleDateString()}`, 50, 110)
      .text(`Cliente: ${data.cliente.nombre}`, 50, 130)
      .moveDown();

    // ---- Table Header ----
    const tableTop = 170;
    const col1 = 50;
    const col2 = 300;
    const col3 = 360;
    const col4 = 440;

    doc
      .fontSize(12)
      .font('Helvetica-Bold')
      .fillColor('#FFFFFF')
      .rect(col1, tableTop, width - 100, 25)
      .fill('#4F81BD')
      .fillColor('#FFFFFF')
      .text('Descripción', col1 + 5, tableTop + 7)
      .text('Cant.', col2, tableTop + 7, { width: 50, align: 'right' })
      .text('Precio', col3, tableTop + 7, { width: 70, align: 'right' })
      .text('Total', col4, tableTop + 7, { width: 70, align: 'right' });

    // ---- Table Rows ----
    let rowY = tableTop + 25;
    doc.font('Helvetica').fontSize(10).fillColor('#000000');

    data.items.forEach((item, i) => {
      // shading pares
      if (i % 2 === 0) {
        doc
          .rect(col1, rowY, width - 100, 20)
          .fill('#F0F0F0')
          .fillColor('#000000');
      }

      doc
        .text(item.descripción, col1 + 5, rowY + 5)
        .text(item.cantidad.toString(), col2, rowY + 5, { width: 50, align: 'right' })
        .text(item.precioUnit.toFixed(2), col3, rowY + 5, { width: 70, align: 'right' })
        .text(item.total.toFixed(2), col4, rowY + 5, { width: 70, align: 'right' });

      // línea divisoria
      doc
        .strokeColor('#CCCCCC')
        .moveTo(col1, rowY + 20)
        .lineTo(width - 50, rowY + 20)
        .stroke();

      rowY += 20;
    });

    // ---- Total Box ----
    doc
      .font('Helvetica-Bold')
      .fontSize(12)
      .fillColor('#000000')
      .text(`Total a pagar: $${data.total.toFixed(2)}`, col1, rowY + 20, {
        align: 'right',
        width: width - 100
      });

    doc.end();
  });
}
