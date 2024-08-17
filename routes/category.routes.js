import express from "express";
//const { auth } = require("../middlewares/utils.js");
const category_router = express.Router();
import {
    createCategory,
    getAllCategory,
    deleteCategory,
    updateCategory,
    updateCategorySlug,
    updateCategoryParentId,
} from "../controllers/category.controllers.js";
  
category_router.get('/', getAllCategory)
category_router.post('/', createCategory)
category_router.delete('/:category_id', deleteCategory)

category_router.patch('/', updateCategoryParentId)
category_router.patch('/img', updateCategory)

export { category_router }