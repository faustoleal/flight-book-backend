const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const { Pilotos } = require("../models");
const { SECRET } = require("../utils/config");

loginRouter.post("/", async (request, response) => {
  const { usuario, password } = request.body;

  const piloto = await Pilotos.findOne({
    where: {
      usuario: usuario,
    },
  });

  const passwordCorrect =
    piloto === null
      ? false
      : await bcrypt.compare(password, piloto.passwordHash);

  if (!(piloto && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const pilotoForToken = {
    usuario: piloto.usuario,
    id: piloto.id,
  };

  const token = jwt.sign(pilotoForToken, SECRET);

  response.status(200).send({ token, ...pilotoForToken });
});

module.exports = loginRouter;
