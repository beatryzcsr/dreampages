// Importa a conexão com o banco PostgreSQL
const pool = require("../database/connection");

// Busca todos os livros cadastrados no banco
async function listarLivros() {
  const result = await pool.query("SELECT * FROM livros ORDER BY idLivro");
  return result.rows;
}

// Busca um livro específico pelo ID
async function buscarLivroPorId(id) {
  const result = await pool.query("SELECT * FROM livros WHERE idLivro = $1", [id]);
  return result.rows[0];
}

// Cria um novo livro no banco
async function criarLivro({ titulo, sinopse, quantidade, preco, imagem, genero, classificacao, livraria, autor, editora }) {
  const result = await pool.query(
    "INSERT INTO livros (titulo, sinopse, quantidade, preco, imagem, genero, classificacao, livraria, autor, editora) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
    [titulo, sinopse, quantidade, preco, imagem, genero, classificacao, livraria, autor, editora]
  );

  return result.rows[0];
}

// Atualiza um livro existente pelo ID
async function atualizarLivro(id, { titulo, sinopse, quantidade, preco, imagem, genero, classificacao, livraria, autor, editora }) {
  const result = await pool.query(
    "UPDATE livros SET titulo = $1, sinopse = $2, quantidade = $3, preco = $4, imagem = $5, genero = $6, classificacao = $7, livraria = $8, autor = $9, editora = $10 WHERE idLivro = $11 RETURNING *",
    [titulo, sinopse, quantidade, preco, imagem, genero, classificacao, livraria, autor, editora, id]
  );

  return result.rows[0];
}

// Deleta um livro pelo ID
async function deletarLivro(id) {
  const result = await pool.query(
    "DELETE FROM livros WHERE idLivro = $1 RETURNING *",
    [id]
  );

  return result.rows[0];
}

// Exporta as funções para serem usadas pelos controllers
module.exports = {
  listarLivros,
  buscarLivroPorId,
  criarLivro,
  atualizarLivro,
  deletarLivro
};