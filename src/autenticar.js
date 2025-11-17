const SEGURANCA_CODIGO = "b327e2fd15e96084b7dc52667a4296b0";
const seguranca = async (req, res, next) => {
  const label = "Authenticate";
  const token = req.header(label)?.replace("Bearer ", "");

  if (!token) {
    res.status(401).send("Token é obrigatrio");
    return;
  }

  try {
    const decodificado = jwt.verify(token, SEGURANCA_CODIGO);
    req.decodificado = decodificado;
    next();
  } catch (err) {
    res.status(401).send("Token inválido");
  }
};

module.exports = { seguranca, SEGURANCA_CODIGO };
