import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import livrosRouter from './src/router/livrosRouter.js';
import authRouter from './src/router/authRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carrega as variáveis de ambiente definidas no arquivo .env do backend,
// mesmo quando o servidor for iniciado a partir da pasta raiz do workspace.
dotenv.config({ path: path.join(__dirname, '.env') });

// Cria a aplicação Express
const app = express();

// Porta em que o backend vai rodar
// Se nenhuma porta for definida no ambiente, usa 5000 como padrão
const PORT = process.env.PORT || 5000;

// Middlewares globais da aplicação
// CORS permite que o frontend acesse a API mesmo em outra porta/domínio
app.use(cors());

// Permite ler JSON enviado pelo frontend em requisições POST/PUT
app.use(express.json());
app.use('/auth', authRouter);

// Registra as rotas de livros na aplicação
// Todas as rotas do arquivo livrosRouter começam com /livros
app.use('/livros', livrosRouter);
app.get('/classificacoes', listarClassificacoes);

// Inicia o servidor HTTP na porta configurada
const server = app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// Exibe o motivo real quando a porta não pode ser usada.
server.on('error', (error) => {
  console.error('Erro ao iniciar o servidor:', error.message);
  process.exitCode = 1;
  server.close();
});

