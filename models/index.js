const Aviones = require("./aviones");
const Pilotos = require("./pilotos");
const HorasDeVuelo = require("./horas_de_vuelo");
const Aerodromos = require("./aerodromos");

Pilotos.hasMany(HorasDeVuelo);
HorasDeVuelo.belongsTo(Pilotos);

Aviones.hasMany(HorasDeVuelo, {
  foreignKey: "avionMatricula",
  sourceKey: "matricula",
});
HorasDeVuelo.belongsTo(Aviones, {
  as: "avion",
  foreignKey: "avionMatricula",
  targetKey: "matricula",
});

Pilotos.sync({ alter: true });
Aviones.sync({ alter: true });
Aerodromos.sync({ alter: true });
HorasDeVuelo.sync({ alter: true });

module.exports = {
  Pilotos,
  Aviones,
  Aerodromos,
  HorasDeVuelo,
};
