import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import produtoRoutes from './src/routes/livrosRouter';

// Carrega as variáveis de ambiente definidas no arquivo .env
// Isso permite manter dados sensíveis, como porta e credenciais do banco, fora do código
dotenv.config();

// Cria a aplicação Express
const app = express();

// Porta em que o backend vai rodar
// Se nenhuma porta for definida no ambiente, usa 3000 como padrão
const PORT = process.env.PORT || 3000;

// Middlewares globais da aplicação
// CORS permite que o frontend acesse a API mesmo em outra porta/domínio
app.use(cors());

// Permite ler JSON enviado pelo frontend em requisições POST/PUT
app.use(express.json());

// Registra as rotas de livros na aplicação
// Todas as rotas do arquivo livrosRouter começam com /livros
app.use('/livros', produtoRoutes);

// Inicia o servidor HTTP na porta configurada
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});