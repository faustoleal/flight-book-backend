const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../utils/db");

class Pilotos extends Model {}

Pilotos.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        is: {
          args: [/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/],
          msg: "Solo se permiten letras y espacios.",
        },
        notNull: {
          msg: "El campo nombre no puede estar vacio",
        },
      },
    },
    usuario: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: {
        name: "usuario_unico",
        msg: "El usuario ya existe",
      },
      validate: {
        notNull: {
          msg: "El campo usuario no puede estar vacio",
        },
      },
    },
    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: {
          msg: "El password es requerido",
        },
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "pilotos",
  }
);

module.exports = Pilotos;
