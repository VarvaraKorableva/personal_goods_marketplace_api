import express from "express";
//const { auth } = require("../middlewares/utils.js");
const item_router = express.Router();
import {
    createItem,
    getAllItemsByCategoryId,
    getAllItemsByUserId,
    getAllItemsByCityId,
    deleteItem
} from "../controllers/items.controllers.js";
  
item_router.get('/categoryId', getAllItemsByCategoryId)
item_router.get('/userId', getAllItemsByUserId)
item_router.get('/cityId', getAllItemsByCityId)
item_router.post('/', createItem)
item_router.delete('/', deleteItem)

export { item_router }