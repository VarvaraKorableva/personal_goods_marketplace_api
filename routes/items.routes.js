import express from "express";
const item_router = express.Router();
import {
    createItem,
    getAllItemsByUserId,
    deleteItem,
    getItemById,
    updateIsReserved,
    updateCity,
    updatePrice,
    updateDescription,
    updateCondition,
    getItemsController,
} from "../controllers/items.controllers.js";

item_router.get('/userId/:owner_id', getAllItemsByUserId)
item_router.get('/all/getItems', getItemsController)
item_router.get('/all/:item_id', getItemById)
item_router.post('/', createItem)
item_router.patch('/:item_id', deleteItem)
item_router.patch('/updateIsReserved/:item_id/:user_id', updateIsReserved)
item_router.patch('/updateCity/:item_id', updateCity)
item_router.patch('/updatePrice/:item_id', updatePrice)
item_router.patch('/updateDescription/:item_id', updateDescription)
item_router.patch('/updateCondition/:item_id', updateCondition)

export { item_router }