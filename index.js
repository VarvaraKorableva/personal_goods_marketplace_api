import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { users_router } from "./routes/users.routes.js"
//import { files_router } from "./routes/upload.routes.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/users", users_router);
//app.use("/", files_router);

app.listen(process.env.PORT || 8080, () => {
  console.log(`run on ${process.env.PORT || 8080}`);
});