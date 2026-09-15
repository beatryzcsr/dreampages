// Importa a conexão com o banco 
import pool from '../database/connection.js';

// GET /livros - Lista todos os livros cadastrados
export const listarLivros = async (req, res) => {
  try {
    const query = 'SELECT * FROM dreampages ORDER BY idLivro;';
    const { rows } = await pool.query(query);

    // Retorna a lista em JSON pro frontend consumir
    return res.status(200).json(rows);
  } catch (error) {
    console.error('Erro ao listar livros:', error);
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

// GET /livros/:id - Busca um livro específico pelo ID
export const buscarLivroPorId = async (req, res) => {
  try {
    // Pega o parâmetro da URL /livros/:id
    const { id } = req.params;
    const query = 'SELECT * FROM dreampages WHERE idLivro = $1;';
    const { rows } = await pool.query(query, [id]);

    // Se não existir, responde 404
    if (rows.length === 0) {
      return res.status(404).json({ mensagem: 'Livro não encontrado' });
    }

    // Retorna o único livro encontrado
    return res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Erro ao buscar livro:', error);
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

// POST /livros - Cadastra um novo livro
export const criarLivro = async (req, res) => {
  try {
    // Extrai os dados 
    const { titulo, sinopse, quantidade, preco, imagem, genero, classificacao, livraria, autor } = req.body;

    //  inserção
    const query = `
      INSERT INTO livros (titulo, sinopse, quantidade, preco, imagem, genero, classificacao, livraria, autor)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;

    const values = [titulo, sinopse, quantidade, preco, imagem, genero, classificacao, livraria, autor];

    // o retorno do insert precisa ser capturado em rows
    const { rows } = await pool.query(query, values);

    return res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Erro ao criar livro:', error);
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

// PUT /livros/:id - Atualiza os dados de um livro existente
export const atualizarLivro = async (req, res) => {
  try {
    // Pega o ID da URL e os dados do corpo
    const { id } = req.params;
    const { titulo, sinopse, quantidade, preco, imagem, genero, classificacao, livraria, autor } = req.body;

    // atualizar os campos do livro
    const query = `
      UPDATE livros
      SET titulo = $1, sinopse = $2, quantidade = $3, preco = $4, imagem = $5, genero = $6, classificacao = $7, livraria = $8, autor = $9
      WHERE idLivro = $10
      RETURNING *;
    `;
    const values = [titulo, sinopse, quantidade, preco, imagem, genero, classificacao, livraria, autor, id];

    const { rows } = await pool.query(query, values);

    // erro se não achar
    if (rows.length === 0) {
      return res.status(404).json({ mensagem: 'Livro não encontrado' });
    }

    // Retorna o livro atualizado
    return res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Erro ao atualizar livro:', error);
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

// DELETE /livros/:id - Exclui um livro pelo ID
export const deletarLivro = async (req, res) => {
  try {
    const { id } = req.params;

    //  exclusão 
    const query = 'DELETE FROM livros WHERE idLivro = $1 RETURNING *;';
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ mensagem: 'Livro não encontrado' });
    }

    // 204 sucesso sem conteúdo
    return res.status(204).send();
  } catch (error) {
    console.error('Erro ao excluir livro:', error);
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};