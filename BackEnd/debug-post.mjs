import pool from './src/database/connection.js';

const resolverIdClassificacao = async (valor) => {
  if (Number.isInteger(valor) || (typeof valor === 'string' && /^\d+$/.test(valor))) {
    return Number(valor);
  }

  if (typeof valor !== 'string' || valor.trim() === '') {
    throw Object.assign(new Error('Classificação inválida'), { statusCode: 400 });
  }

  const { rows } = await pool.query(
    'SELECT idclassificacao FROM classificacao WHERE LOWER(classificacao) = LOWER($1) LIMIT 1;',
    [valor.trim()]
  );

  if (rows.length === 0) {
    const erro = new Error(`Classificação não encontrada: ${valor}`);
    erro.statusCode = 400;
    throw erro;
  }

  return rows[0].idclassificacao;
};

const body = {
  titulo: 'Dom Casmurro',
  sinopse: 'Livro clássico da literatura brasileira',
  quantidade: '10',
  preco: '39.9',
  imagem: 'https://images.com/capa.jpg',
  genero: 'Romance',
  classificacao: '12',
  livraria: 'Antafogica',
  autor: 'Machado de Assis',
};

try {
  const classificacaoId = await resolverIdClassificacao(body.classificacao);
  console.log('classificacaoId =', classificacaoId);
  const query = `
    INSERT INTO livros (titulo, sinopse, quantidade, preco, imagem, genero, classificacao, livraria, autor)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *;
  `;
  const values = [body.titulo, body.sinopse, body.quantidade, body.preco, body.imagem, body.genero, classificacaoId, body.livraria, body.autor];
  const result = await pool.query(query, values);
  console.log('RESULT', result.rows[0]);
} catch (error) {
  console.error('ERROR_MESSAGE:', error.message);
  console.error('ERROR_STATUS:', error.statusCode);
  console.error(error.stack);
  process.exitCode = 1;
} finally {
  await pool.end();
}
