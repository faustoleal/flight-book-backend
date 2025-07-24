const { Pilotos } = require("../models");
const { SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  console.log(error);
  if (error) {
    return res.status(400).send({ error: error.errors[0].message });
  }

  next();
};

const tokenExtractor = async (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer")) {
    request.token = authorization.substring(7);
  } else {
    request.token = null;
  }

  next();
};

const pilotoExtractor = async (request, response, next) => {
  if (!request.token) {
    return response.status(401).json({ error: "missing token" });
  } else {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    request.piloto = await Pilotos.findByPk(decodedToken.id);
  }
  next();
};

module.exports = {
  unknownEndpoint,
  pilotoExtractor,
  tokenExtractor,
  errorHandler,
};
