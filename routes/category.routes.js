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
    updateCategoryName,
} from "../controllers/category.controllers.js";
  
category_router.get('/', getAllCategory)
//category_router.post('/create', createCategory)
category_router.post('/create', (req, res, next) => {
    console.log("POST /category/create hit!");
    next();
  }, createCategory);
category_router.delete('/:category_id', deleteCategory)

category_router.patch('/', updateCategoryParentId)
category_router.patch('/updateimg', updateCategory)
category_router.patch('/updatename', updateCategoryName)


export { category_router }