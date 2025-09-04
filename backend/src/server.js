import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import verifyToken from './middleware/verifyToken.js';
import { openDb } from './data/database.js';

const app = express();
app.use(cors());
app.use(express.json()); 

// Chave secreta definida no .env
const SECRET_KEY = process.env.SECRET_KEY;

// Rota de login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const db = await openDb();  //

  const user = await db.get(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password]
  );

  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

  res.json({ token });
});

// Rota de cadastro de usuário
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const db = await openDb();  //

  // Verificar se o usuário já existe
  const existingUser = await db.get('SELECT * FROM users WHERE username = ?', [username]);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists!' });
  }

  // Inserir novo usuário
  await db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);

  res.status(201).json({ message: 'User created successfully!' });
});

// Rota protegida — só acessa quem estiver autenticado com token JWT
app.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'Acesso autorizado', user: req.user });
});

// Inicia o servidor
app.listen(4000, () => console.log('Backend rodando na porta 4000'));

