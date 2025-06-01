import { google } from 'googleapis';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const {
  GMAIL_CLIENT_ID,
  GMAIL_CLIENT_SECRET,
  GMAIL_REDIRECT_URI,
  GMAIL_TOKEN_FILE
} = process.env;

export const oauth2Client = new google.auth.OAuth2(
  GMAIL_CLIENT_ID,
  GMAIL_CLIENT_SECRET,
  GMAIL_REDIRECT_URI
);

// Ruta donde guardaremos el token
export const TOKEN_PATH = path.resolve(GMAIL_TOKEN_FILE!);

/**
 * Lee el token desde disco (devuelve {} si no existe).
 */
export function loadGmailToken(): any {
  try {
    const content = fs.readFileSync(TOKEN_PATH, 'utf8');
    return JSON.parse(content);
  } catch {
    return {};
  }
}

/**
 * Guarda el token (con refresh_token) en disco.
 */
export function saveGmailToken(token: any) {
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(token, null, 2));
}
