import { uploadSingle, _getAllImages, _getAllImagesByUserId, _deleteImage } from "../models/upload.models.js";
import dotenv from "dotenv";
dotenv.config();

export const _uploadSingle = async (req, res) => {

  const { key, mimetype, location, originalname } = req.file;
  const item_id = Number(req.body.str_item_id)

  try {
    const data = await uploadSingle(item_id, key, mimetype, location, originalname);
    console.log(' =>', data)
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllImagesByUserId = (req, res) => {
  const { owner_id } = req.params
  _getAllImagesByUserId(owner_id)
  .then((data) => {
      res.json(data);
  })
  .catch((err) => {
      res.status(404).json({ msg: "Not Found" });
  });
};

export const deleteImage = (req, res) => {
  const { images_of_goods_id } = req.params
  _deleteImage(images_of_goods_id)
  .then((data) => {
      res.json({ msg: "Deleted" })
  })
  .catch((err) => {
      res.status(404).json({ msg: "Not Found" });
  });
};

export const getAllImages = (req, res) => {
  _getAllImages()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(404).json({ msg: "Not Found" });
      });
}; 