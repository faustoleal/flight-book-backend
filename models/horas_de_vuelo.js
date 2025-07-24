const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../utils/db");

class HorasDeVuelo extends Model {}

HorasDeVuelo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    dia: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Te olvidaste de poner el dia del vuelo",
        },
      },
    },
    horaSalida: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notNull: {
          msg: "La hora de salida es obligatoria ",
        },
      },
    },
    desde: {
      type: DataTypes.STRING(4),
      allowNull: false,
      references: { model: "aerodromos", key: "aerodromo" },
      validate: {
        isAlpha: {
          args: true,
          msg: "El aerodromo no puede contener espacios o numeros",
        },
        notNull: {
          msg: "El aerodromo de salida es obligatorio",
        },
        len: {
          args: [3, 4],
          msg: "El aerodromo no puede tener mas de 4 letras o menos de 3",
        },
      },
    },
    hasta: {
      type: DataTypes.STRING(4),
      allowNull: false,
      references: { model: "aerodromos", key: "aerodromo" },
      validate: {
        isAlpha: {
          args: true,
          msg: "El aerodromo de llegada no puede contener espacios o numeros",
        },
        notNull: {
          msg: "El aerodromo de llegada es obligatorio",
        },
        len: {
          args: [3, 4],
          msg: "El aerodromo no puede tener mas de 4 letras o menos de 3",
        },
      },
    },
    horaLlegada: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notNull: {
          msg: "La hora de llegada es obligatoria",
        },
      },
    },
    finalidad: {
      type: DataTypes.ENUM("ENT", "INST", "READP", "EXA"),
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo finalidad es obligatorio",
        },
      },
    },
    avionMatricula: {
      type: DataTypes.CHAR(6),
      allowNull: false,
      references: { model: "aviones", key: "matricula" },
      validate: {
        notNull: {
          msg: "Seleccionar un avion es necesario",
        },
      },
    },
    localDiaP: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
    },
    localDiaC: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
    },
    localNocheP: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
    },
    localNocheC: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
    },
    travesiaDiaP: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
    },
    travesiaDiaC: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
    },
    travesiaNocheP: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
    },
    travesiaNocheC: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
    },
    aterrizajes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Tiene que poner los aterrizajes realizados",
        },
      },
    },
    instructorDeVuelo: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
    },
    reactor: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
    },
    multiMotor: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
    },
    turboHelice: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
    },
    aeroaplicador: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
    },
    instrumentosRealP: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
    },
    instrumentosRealC: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
    },
    capota: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "horas_de_vuelos",
  }
);

module.exports = HorasDeVuelo;
