import { Router } from 'express';
import passport from 'passport';

const router = Router();

// 1) Aquí DEFINES los scopes obligatorios
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],   // ← MUY IMPORTANTE
    session: false                  // si no usas sesiones
  })
);

// 2) Callback de Google
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/api/auth/google/fail',
    session: false
  }),
  (req, res) => {
    // passport puso el JWT en req.user
    const token = req.user as string;
    res.redirect(`${process.env.FRONTEND_URL}/callback?accessToken=${token}`);
  }
);

router.get('/google/fail', (_req, res) => {
  res.status(401).json({ message: 'Autenticación con Google fallida' });
});

export default router;
