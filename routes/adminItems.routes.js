import express from "express";
//const { auth } = require("../middlewares/utils.js");
const adminItem_router = express.Router();
import {
    getAllItemsByUserIdAdmin,
    deleteItemAdmin,
    getAllItemsAdmin,
    getItemByIdAdmin,
    getItemsByCategoryRecursiveAdmin,
    updateModeratedAdmin,
} from "../controllers/adminitems.controllers.js";

adminItem_router.get('/admin/userId/:owner_id', getAllItemsByUserIdAdmin)
adminItem_router.get('/admin/all/:page/:limit', getAllItemsAdmin)
adminItem_router.get('/admin/all/:item_id', getItemByIdAdmin)
adminItem_router.patch('/admin/:item_id', deleteItemAdmin)
adminItem_router.get('/admin/getItemsByCategoryRecursive/:category_id', getItemsByCategoryRecursiveAdmin)

adminItem_router.patch('/admin/updateModerated/:item_id', updateModeratedAdmin)


export { adminItem_router }