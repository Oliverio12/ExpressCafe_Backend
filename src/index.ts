// src/index.ts
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import gmailAuthRouter from './routes/gmailAuth';
import { sequelize } from './config/db';
import './config/passport';          // 1) Carga la estrategia de Google
import { initModels } from './models/init-models';

import authRouter from './routes/auth';   // 2) Router de auth
import apiRoutes   from './routes';       // y tus rutas de negocio

dotenv.config();
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Necesario para Passport (aunque uses session: false)
app.use(session({
  secret: process.env.SESSION_SECRET || '3150',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Conecta y arranca modelos
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado a la BD (Sequelize)');
    initModels(sequelize);
  } catch (error) {
    console.error('❌ No se pudo conectar con Sequelize:', error);
    process.exit(1);
  }
})();

// 3) Monta primero las rutas de Auth
app.use('/api/auth', authRouter);
app.use('/api/gmail', gmailAuthRouter);

// 4) Luego el resto de tu API
app.use('/api', apiRoutes);

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en puerto ${PORT}`);
});
