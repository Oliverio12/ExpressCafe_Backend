import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

export const sequelize = new Sequelize(
  process.env.NAME_BD!,      // nombre de BD
  process.env.USERS_BD!,     // usuario
  process.env.PASSWORD_BD!,  // contraseña
  {
    host: process.env.HOST_BD,
    port: Number(process.env.PORT_BD),
    dialect: 'postgres',
    logging: console.log,
  }
);

