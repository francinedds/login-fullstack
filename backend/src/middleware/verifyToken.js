import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(' ')[1]; // Divide a string "Bearer <token>" em ["Bearer", "<token>"]. Pega só o token (posição 1).

  try {
    const decoded = jwt.verify(token, SECRET_KEY); // Verifica se o token é válido.
    req.user = decoded; // Armazena o payload decodificado em req.user.
    next();
  } catch {
    res.sendStatus(403); // Retorna 403 Forbidden se inválido.
  }
}

export default verifyToken;

// Esse arquivo define um middleware do Express que serve para proteger rotas. Ele verifica se o token JWT enviado no header Authorization é válido.
