import { Router } from 'express';
import { cadastrar, login, recuperarSenha } from '../controllers/authController.js';

const router = Router();

router.post('/register', cadastrar);
router.post('/login', login);
router.post('/recover', recuperarSenha);

export default router;