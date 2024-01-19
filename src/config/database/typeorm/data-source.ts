import "dotenv/config";
import { DataSource } from "typeorm";
import { Produtor } from "../../../domain/produtores/entities/Produtor";
import Fazenda from "../../../domain/fazendas/entities/Fazenda";

export const appDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [Produtor, Fazenda],
  subscribers: [],
  migrations: ["src/shared/migrations/typeorm/*.ts"],
});
