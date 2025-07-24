const aerodromosRouter = require("express").Router();
const { Aerodromos } = require("../models");

aerodromosRouter.get("/", async (req, res) => {
  const aerodromos = await Aerodromos.findAll();
  res.json(aerodromos);
});

aerodromosRouter.post("/", async (req, res, next) => {
  try {
    const aerodromo = await Aerodromos.create(req.body);
    res.status(201).json(aerodromo);
  } catch (error) {
    next(error);
  }
});

module.exports = aerodromosRouter;
