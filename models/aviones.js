const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../utils/db");

class Aviones extends Model {}

Aviones.init(
  {
    matricula: {
      type: DataTypes.CHAR(6),
      primaryKey: true,
      allowNull: false,
      unique: {
        name: "matricula_unica",
        msg: "Esta matricula ya existe, ingrese otra por favor!",
      },
      validate: {
        notNull: {
          msg: "El campo matricula es obligatorio",
        },
        len: {
          args: [6, 6],
          msg: "La matricula tiene que tener 6 caracteres",
        },
      },
    },
    modelo: {
      type: DataTypes.STRING(25),
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo modelo no puede estar vacio",
        },
      },
    },
    potencia: {
      type: DataTypes.STRING(25),
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo potencia no puede estar vacio",
        },
      },
    },
    clase: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo clase no puede estar vacio",
        },
        is: {
          args: [/^[A-Za-zÁÉÍÓÚÑáéíóúñ.,;:'"!?()¡¿-]+$/],
          msg: "El campo clase no puede contener numeros ni espacios",
        },
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "aviones",
  }
);

module.exports = Aviones;
