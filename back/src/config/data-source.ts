import { DataSource, DataSourceOptions } from "typeorm";
import { config as dotenvConfig } from "dotenv"
import { registerAs } from "@nestjs/config";

dotenvConfig({
    path: ".env"
});

const postgresDataSourceOptions: DataSourceOptions = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    schema: 'public',
    dropSchema: false,
    synchronize: false,
    logging: true,
    entities: ["dist/**/*.entity{.ts,.js}"],
    migrations: ["dist/migrations/*{.js,.ts}"],
    ssl: false,
}

export const postgresDataSourceConfig = registerAs("data-source", () => postgresDataSourceOptions)

export const connectionSource = new DataSource(postgresDataSourceOptions)