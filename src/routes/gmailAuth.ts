import { Router, Request, Response } from 'express';
import { google } from 'googleapis';
import {
  oauth2Client,
  loadGmailToken,
  saveGmailToken
} from '../config/gmail';

const router = Router();

// 1) Iniciar el flujo: genera URL de consent
router.get('/oauth2', (_req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://mail.google.com/'],
    prompt: 'consent'     // forzar refresh_token siempre
  });
  res.redirect(authUrl);
});

// 2) Callback que Google invoca con el code
router.get('/oauth2/callback', async (req: Request, res: Response) => {
  try {
    const { code } = req.query;
    if (!code) throw new Error('No code en query');
    const { tokens } = await oauth2Client.getToken(code as string);
    // Guardamos el refresh_token (y demás) en disco
    saveGmailToken(tokens);
    // Ajustamos el cliente para enviar correos a partir de ahora
    oauth2Client.setCredentials(tokens);
    res.send('✅ Token guardado. Ya puedes enviar correos con Gmail OAuth2.');
  } catch (err: any) {
    console.error(err);
    res.status(500).send(`❌ OAuth callback error: ${err.message}`);
  }
});

export default router;
