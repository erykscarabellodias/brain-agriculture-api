import "express-async-errors";
import express from "express";
import { routes } from "./http/routes";
import "dotenv/config";
import capturaDeErros from "./http/middlewares/capturaDeErros";
import { appDataSource } from "./config/database/typeorm/data-source";

const app = express();

appDataSource.initialize();

app.use(express.json());

app.use(routes);

app.use(capturaDeErros);

export default app;
