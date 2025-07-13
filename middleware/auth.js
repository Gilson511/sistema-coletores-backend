const jwt = require("jsonwebtoken");

function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: "Token não enviado" });
  }

  const [, token] = authHeader.split(" "); // divide "Bearer seu_token"

  try {
    const usuario = jwt.verify(token, "meu_token_supersecreto"); // mesma chave usada no login
    req.usuario = usuario;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
}

module.exports = autenticarToken;


