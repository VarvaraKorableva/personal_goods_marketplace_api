import { uploadSingle } from "../models/upload.models.js";


export const _uploadSingle = async (req, res) => {
  const { key, mimetype, location, originalname } = req.file;
  const { item_id } = req.item_id;
  try {
    const row = await uploadSingle({ key, mimetype, location, originalname, item_id });
    res.json(row);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};