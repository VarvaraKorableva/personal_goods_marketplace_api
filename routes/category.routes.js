import express from "express";
//const { auth } = require("../middlewares/utils.js");
const category_router = express.Router();
import {
    createCategory,
    getAllCategory,
    deleteCategory,
    updateCategory,
    updateCategorySlug,
} from "../controllers/category.controllers.js";
  
category_router.get('/', getAllCategory)
category_router.post('/', createCategory)
category_router.delete('/', deleteCategory)

category_router.patch('/', updateCategory)


export { category_router }