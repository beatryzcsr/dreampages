// Importa a biblioteca JWT para validar tokens de autenticação
const jwt = require('jsonwebtoken');

// verificar se o usuário está autenticado
function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;

  // verifica se o header existe e se começa com 'Bearer ', se nao, bloqueia
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ mensagem: 'Token não fornecido' });
  }

  // Separa a string 
  const token = authHeader.split(' ')[1];

  // Valida o token usando a chave secreta configurada em .env
  // Se não tiver, usa um valor padrão
  try {
    const secret = process.env.JWT_SECRET || 'secret_jwt_default';

    // Verifica se o token é válido e decodifica as informações
    const payload = jwt.verify(token, secret);

    // Salva os dados do usuário
    req.user = payload;

    next();
  } catch (erro) {
    // Se o token estiver expirado, bloqueia o acesso
    return res.status(401).json({ mensagem: 'Token inválido ou expirado' });
  }
}

module.exports = {
  verificarToken
};