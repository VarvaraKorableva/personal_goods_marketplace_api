import {
  _createCategory,
  _deleteCategory,
  _getAllCategory,
} from "../models/category.models.js"

export const createCategory = (req, res) => {
    const { name, is_good, parent_id } = req.body;
    _createCategory( name, is_good, parent_id )
      .then((data) => {
        res.json({ msg: "Successfully added" });
      })
      .catch((err) => {
        res.status(404).json({ msg: "Error, category not added, try again" });
      });
};

export const getAllCategory = (req, res) => {
    _getAllCategory()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(404).json({ msg: "Not Found" });
      });
};

export const deleteCategory = (req, res) => {
    const { category_id } = req.body
    _deleteCategory(category_id)
      .then((data) => {
        res.json(data).json({ msg: "Deleted" })
      })
      .catch((err) => {
        res.status(404).json({ msg: "Not Found" });
      });
};