import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { users_router } from "./routes/users.routes.js"
import { category_router } from "./routes/category.routes.js"
import { item_router } from "./routes/items.routes.js"
import { messages_router } from "./routes/messages.routes.js"
import {favoriteItems_router} from "./routes/favoriteItems.routes.js"
import {reviews_router} from "./routes/reviews.routes.js"
import { files_router } from "./routes/upload.routes.js"
import { verification_router } from "./routes/verifications.routes.js"
import { conversations_router } from "./routes/conversations.routes.js"
import { adminItem_router } from "./routes/adminItems.routes.js"

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
  credentials: true,
  origin: [
    'http://localhost:3001',
    'http://localhost:3000',
    'https://localhost:3001',
    'https://localhost:3000',
    'https://localhost:3002',
    'http://localhost:3002',
    'https://personal-goods-marketplace-client.onrender.com',
    'http://personal-goods-marketplace-client.onrender.com',
    'http://personal-goods-marketplace-api.onrender.com',
    'https://personal-goods-marketplace-api.onrender.com',
  ],
}));

app.use("/users", users_router);
app.use("/category", category_router);
app.use("/items", item_router);
app.use("/itemsAdmin", adminItem_router);
app.use("/messages", messages_router);
app.use("/favoriteItems", favoriteItems_router);
app.use("/reviews", reviews_router);
app.use("/files", files_router); //images
app.use("/verification", verification_router); 
app.use("/conversations", conversations_router);

app.listen(process.env.PORT || 8080, () => {
  console.log(`run on ${process.env.PORT || 8080}`);
});