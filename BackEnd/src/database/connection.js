import pkg from 'pg';
import dotenv from 'dotenv';

// variáveis de ambiente do arquivo .env
dotenv.config();

const { Pool } = pkg;

// conexões com o PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export default pool;