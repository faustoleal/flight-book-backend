const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../utils/db");

class Aerodromos extends Model {}

Aerodromos.init(
  {
    aerodromo: {
      type: DataTypes.STRING(4),
      primaryKey: true,
      allowNull: false,
      validate: {
        isAlpha: {
          args: true,
          msg: "Aerodromo no puede contener numeros o espacios",
        },
        notNull: {
          msg: "Aerodromo no puede estar vacio",
        },
        len: {
          args: [3, 4],
          msg: "El aerodromo no puede tener mas de 4 letras o menos de 3",
        },
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "aerodromos",
  }
);

module.exports = Aerodromos;
