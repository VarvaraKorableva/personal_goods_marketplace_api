import express from "express";
//const { auth } = require("../middlewares/utils.js");
const category_router = express.Router();
import {
    createCategory,
    getAllCategory,
    deleteCategory,
} from "../controllers/category.controllers.js";
  
category_router.get('/', getAllCategory)
category_router.post('/', createCategory)
category_router.delete('/', deleteCategory)

export { category_router }