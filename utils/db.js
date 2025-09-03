const Sequelize = require("sequelize");
const { DATABASE_URL, DB_NAME, DB_USER, DB_PASSWORD } = require("./config");

// conexion base de datos local

/* const sequelize = new Sequelize(`${DB_NAME}`, `${DB_USER}`, `${DB_PASSWORD}`, {
  host: "localhost",
  dialect: "postgres",
}); */

// Conexion Render

const sequelize = new Sequelize(`${DATABASE_URL}`, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Necesario para Render
    },
  },
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established succesfully");
  } catch (error) {
    console.log("Unable to connect to the database", error);
  }
};

module.exports = {
  connectToDatabase,
  sequelize,
};
