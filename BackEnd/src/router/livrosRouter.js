import { Router } from 'express';
import {
  listarLivros,
  buscarLivroPorId,
  criarLivro,
  atualizarLivro,
  deletarLivro,
} from '../controllers/livrosController.js';

// Cria um roteador do Express para organizar as rotas da API
const router = Router();

// Mapeamento das rotas do CRUD de livros
// GET /livros -> lista todos os livros
router.get('/', listarLivros);

// GET /livros/:id -> busca um livro pelo ID
router.get('/:id', buscarLivroPorId);

// POST /livros -> cadastra um novo livro
router.post('/', criarLivro);

// PUT /livros/:id -> atualiza um livro existente
router.put('/:id', atualizarLivro);

// DELETE /livros/:id -> exclui um livro pelo ID
router.delete('/:id', deletarLivro);

export default router;