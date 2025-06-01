import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import { clientesRepository } from '../repositories/clientesRepository';
import jwt from 'jsonwebtoken';

const CLIENT_ROLE_ID = Number(process.env.CLIENT_ROLE_ID!);
const JWT_SECRET = process.env.JWT_SECRET!;

passport.use(new GoogleStrategy({
  clientID:     process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL:  process.env.GOOGLE_CALLBACK_URL!,
}, 
async (accessToken, refreshToken, profile: Profile, done) => {
  try {
    // perfil de Google:
    const sub = profile.id;
    const email = profile.emails?.[0].value!;
    const nombre = profile.name?.givenName!;
    const apellidos = profile.name?.familyName!;

    // 1) Buscar o crear cliente
    let client = await clientesRepository.findBySub(sub);
    if (!client) {
      client = await clientesRepository.create({
        google_sub: sub,
        nombre,
        apellidos,
        email,
        id_rol: CLIENT_ROLE_ID
      });
    }

    // 2) Firmar nuestro propio JWT
    const token = jwt.sign(
      {
        id: client.id_cliente,
        email: client.email,
        role: CLIENT_ROLE_ID,
        nombre,
        apellidos
      },
      process.env.JWT_SECRET!,
      { expiresIn: '1m' }
    );

    // pasamos el token por done
    done(null, token);
  } catch (err) {
    done(err as Error);
  }
}));
