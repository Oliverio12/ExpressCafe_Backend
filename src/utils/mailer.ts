import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  attachments?: { filename: string; content: Buffer }[]
) {
  // Creamos el transporter usando tu App Password de Gmail
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,  // usa SSL/TLS
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });

  // Preparamos el mensaje
  const mailOptions = {
    from: `"ExpressCafe" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html,
    attachments
  };

  // Enviamos
  const info = await transporter.sendMail(mailOptions);
  console.log('📧 Email enviado:', info.messageId);
  return info;
}
