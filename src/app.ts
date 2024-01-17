import express from "express";
import { routes } from "./http/routes";

const app = express();

app.use(routes);

export default app;
