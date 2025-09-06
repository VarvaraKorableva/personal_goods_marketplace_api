import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

export default {
  development: {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false } // обязательно для Public URL
    },
    migrations: {
      directory: "./migrations"
    }
  },
  production: {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_INTERNAL_URL,
      ssl: undefined // Internal URL не поддерживает SSL
    },
    migrations: {
      directory: "./migrations"
    }
  }
};
