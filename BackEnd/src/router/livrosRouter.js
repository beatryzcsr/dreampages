import { Router } from 'express';
import {
  listarLivros,
  buscarLivroPorId,
  criarLivro,
  atualizarLivro,
  deletarLivro,
} from '../controllers/livrosController.js';
import { verificarToken } from '../middleware/livrosMiddleware.js';

// Cria um roteador do Express para organizar as rotas da API
const router = Router();

// Mapeamento das rotas do CRUD de livros
// GET /livros -> lista todos os livros
router.get('/', verificarToken, listarLivros);

// GET /livros/:id -> busca um livro pelo ID
router.get('/:id', verificarToken, buscarLivroPorId);

// POST /livros -> cadastra um novo livro
router.post('/', verificarToken, criarLivro);

// PUT /livros/:id -> atualiza um livro existente
router.put('/:id', verificarToken, atualizarLivro);

// DELETE /livros/:id -> exclui um livro pelo ID
router.delete('/:id', verificarToken, deletarLivro);

export default router;