const express = require("express");
const cors = require("cors");

const app = express();

const { PORT } = require("./utils/config");
const { connectToDatabase } = require("./utils/db");
const middelware = require("./utils/middelware");

const routers = {
  aviones: require("./controllers/aviones"),
  aerodromos: require("./controllers/aerodromos"),
  pilotos: require("./controllers/pilotos"),
  horas: require("./controllers/horas_de_vuelo"),
  login: require("./controllers/login"),
};

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());

app.use(middelware.tokenExtractor);

app.use("/api/aviones", routers.aviones);
app.use("/api/aerodromos", routers.aerodromos);
app.use("/api/pilotos", routers.pilotos);
app.use("/api/horas", routers.horas);
app.use("/api/login", routers.login);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`server runnig on port ${PORT}`);
  });
};

app.use(middelware.unknownEndpoint);
app.use(middelware.errorHandler);

start();
