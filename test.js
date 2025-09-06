import { db } from "./config/pg.config.js";

db.raw("SELECT 1")
  .then(() => console.log("Connected!"))
  .catch(err => console.error("Connection failed:", err));
