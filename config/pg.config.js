import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

// Определяем, что используется: продакшен или локальная разработка
const isProduction = process.env.NODE_ENV === "production";

// Public URL для локальной разработки
// Internal URL для продакшена (Render)
const connectionString = isProduction
  ? process.env.DATABASE_INTERNAL_URL
  : process.env.DATABASE_URL;

export const db = knex({
  client: "pg",
  connection: {
    connectionString,
    // SSL включаем только для Public URL
    ssl: isProduction ? undefined : { rejectUnauthorized: false }
  },
  migrations: {
    directory: "./migrations"
  }
});

export default db;
