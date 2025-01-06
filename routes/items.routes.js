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
    updateIsReserved,
    updateCity,
    updatePrice,
    updateDescription,
    updateCondition,
} from "../controllers/items.controllers.js";
import { getItemsByFilter } from "../controllers/itemsSearch.controllers.js"
  
item_router.get('/categoryId/:category_id', getAllItemsByCategoryId)
item_router.get('/userId/:owner_id', getAllItemsByUserId)
item_router.get('/all/:page/:limit', getAllItems)
item_router.get('/all/:item_id', getItemById)

item_router.get('/getItemsByFilter', getItemsByFilter)

item_router.post('/', createItem)
item_router.patch('/:item_id', deleteItem)

item_router.get('/getItemsBySubCategoriesByParentId/:parent_id', getItemsBySubCategoriesByParentId)
item_router.patch('/updateIsReserved/:item_id/:user_id', updateIsReserved)

item_router.patch('/updateCity/:item_id', updateCity)
item_router.patch('/updatePrice/:item_id', updatePrice)
item_router.patch('/updateDescription/:item_id', updateDescription)
item_router.patch('/updateCondition/:item_id', updateCondition)


export { item_router }