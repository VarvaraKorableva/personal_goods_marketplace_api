import express from "express";
import { upload } from "../utils/upload.utils.js";
import { _uploadSingle, getAllImages, getAllImagesByUserId, deleteImage } from "../controllers/upload.controllers.js";

export const files_router = express.Router();

files_router.post("/upload-single", upload.single("file"), _uploadSingle);
files_router.get("/images/all", getAllImages);
files_router.get("/images/:owner_id", getAllImagesByUserId);
files_router.delete("/image/:images_of_goods_id", deleteImage);