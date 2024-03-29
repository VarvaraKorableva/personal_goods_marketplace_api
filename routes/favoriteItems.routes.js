import express from "express";
//const { auth } = require("../middlewares/utils.js");
const favoriteItems_router = express.Router();
import {
    addToFavoriteItems,
    deleteFavoriteItems,
    getAllMyFavoriteItems,
} from "../controllers/favoriteItems.controllers.js";
  
favoriteItems_router.get('/:favorite_collector_id', getAllMyFavoriteItems)
favoriteItems_router.post('/', addToFavoriteItems)
favoriteItems_router.delete('/:item_id', deleteFavoriteItems)

export { favoriteItems_router}