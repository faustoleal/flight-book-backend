const Sequelize = require("sequelize");
const { DB_NAME, DB_USER, DB_PASSWORD } = require("./config");

const sequelize = new Sequelize(`${DB_NAME}`, `${DB_USER}`, `${DB_PASSWORD}`, {
  host: "localhost",
  dialect: "postgres",
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
