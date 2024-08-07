import express from "express";
//const { auth } = require("../middlewares/utils.js");
const item_router = express.Router();
import {
    createItem,
    getAllItemsByCategoryId,
    getAllItemsByUserId,
    deleteItem,
    getAllItems,
    getItemById,
    getItemsBySubCategoriesByParentId,
    
} from "../controllers/items.controllers.js";
  
item_router.get('/categoryId/:category_id', getAllItemsByCategoryId)
item_router.get('/userId/:owner_id', getAllItemsByUserId)
item_router.get('/all', getAllItems) //установить лимит на 40 последних 
item_router.get('/all/:item_id', getItemById)

item_router.post('/', createItem)
item_router.delete('/:item_id', deleteItem)

item_router.get('/getItemsBySubCategoriesByParentId/:parent_id', getItemsBySubCategoriesByParentId)

export { item_router }