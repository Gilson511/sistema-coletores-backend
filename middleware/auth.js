// backend/middleware/auth.js
function autenticarToken(req, res, next) {
    const token = req.headers['authorization'];
  
    // Aqui você pode usar um token fixo ou comparar com JWT futuramente
    if (!token || token !== 'meu_token_supersecreto') {
      return res.status(401).json({ error: 'Acesso não autorizado' });
    }
  
    next(); // usuário está autenticado
  }
  
  module.exports = autenticarToken;
  