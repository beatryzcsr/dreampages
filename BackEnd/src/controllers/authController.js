import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../database/connection.js';

const segredo = () => process.env.JWT_SECRET || 'secret_jwt_default';

const criarToken = (usuario) => jwt.sign(
  { id: usuario.id, email: usuario.email },
  segredo(),
  { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
);

const validarDados = (email, senha) => {
  if (typeof email !== 'string' || !email.trim() || typeof senha !== 'string' || senha.length < 6) {
    return 'Informe um email válido e uma senha com pelo menos 6 caracteres.';
  }
  return null;
};

export const cadastrar = async (req, res) => {
  const { email, senha } = req.body;
  const erro = validarDados(email, senha);
  if (erro) return res.status(400).json({ mensagem: erro });

  try {
    const senhaHash = await bcrypt.hash(senha, 12);
    const { rows } = await pool.query(
      'INSERT INTO usuarios (email, senha) VALUES ($1, $2) RETURNING id, email;',
      [email.trim().toLowerCase(), senhaHash]
    );
    const usuario = rows[0];
    return res.status(201).json({ usuario, token: criarToken(usuario) });
  } catch (error) {
    if (error.code === '23505') return res.status(409).json({ mensagem: 'Este email já está cadastrado.' });
    console.error('Erro ao cadastrar usuário:', error);
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
};

export const login = async (req, res) => {
  const { email, senha } = req.body;
  const erro = validarDados(email, senha);
  if (erro) return res.status(400).json({ mensagem: erro });

  try {
    const { rows } = await pool.query('SELECT id, email, senha FROM usuarios WHERE email = $1 LIMIT 1;', [email.trim().toLowerCase()]);
    const usuario = rows[0];
    const senhaValida = usuario && await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return res.status(401).json({ mensagem: 'Email ou senha incorretos.' });

    return res.status(200).json({ usuario: { id: usuario.id, email: usuario.email }, token: criarToken(usuario) });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
};

export const recuperarSenha = async (req, res) => {
  const { email, senha } = req.body;
  const erro = validarDados(email, senha);
  if (erro) return res.status(400).json({ mensagem: erro });

  try {
    const senhaHash = await bcrypt.hash(senha, 12);
    const { rowCount } = await pool.query(
      'UPDATE usuarios SET senha = $1 WHERE email = $2;',
      [senhaHash, email.trim().toLowerCase()]
    );
    if (!rowCount) return res.status(404).json({ mensagem: 'Email não encontrado.' });
    return res.status(200).json({ mensagem: 'Senha atualizada com sucesso.' });
  } catch (error) {
    console.error('Erro ao recuperar senha:', error);
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
};