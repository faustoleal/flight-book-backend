const pilotosRouter = require("express").Router();
const bcrypt = require("bcrypt");

const { Pilotos, HorasDeVuelo } = require("../models");

pilotosRouter.get("/", async (req, res) => {
  const pilotos = await Pilotos.findAll({
    attributes: { exclude: ["passwordHash"] },
    include: {
      model: HorasDeVuelo,
    },
  });
  res.json(pilotos);
});

pilotosRouter.get("/:id", async (req, res) => {
  const pilotos = await Pilotos.findByPk(req.params.id, {
    attributes: { exclude: ["passwordHash"] },
  });
  res.json(pilotos);
});

pilotosRouter.post("/", async (req, res, next) => {
  const { name, usuario, password } = req.body;

  if ((!password, !name, !usuario)) {
    res.status(400).json({ error: "el formulario no esta completo" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  try {
    const piloto = await Pilotos.create({
      name,
      usuario,
      passwordHash,
    });

    res.status(201).json(piloto);
  } catch (error) {
    next(error);
  }
});

module.exports = pilotosRouter;
