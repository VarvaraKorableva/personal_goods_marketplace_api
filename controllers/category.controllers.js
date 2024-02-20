import dotenv from "dotenv";
dotenv.config();

import {
  _createCategory,
  _deleteCategory,
  _getAllCategory,
  _updateCategory,
  _updateCategorySlug,
} from "../models/category.models.js"

export const createCategory = (req, res) => {
    const { name, is_good, parent_id, image_url, slug } = req.body;
    _createCategory( name, is_good, parent_id, image_url, slug )
      .then((data) => {
        res.json({ msg: "Successfully added" });
      })
      .catch((err) => {
        res.status(404).json({ msg: "Error, category not added, try again" });
      });
};

export const updateCategory = (req, res) => {
  const { category_id, image_url } = req.body;
  _updateCategory( category_id, image_url )
    .then((data) => {
      res.json({ msg: "Successfully updated" });
    })
    .catch((err) => {
      res.status(404).json({ msg: "Error, category not updated, try again" });
    });
};

export const updateCategorySlug = (req, res) => {
  const { category_id, slug } = req.body;
  _updateCategorySlug( category_id, slug )
    .then((data) => {
      res.json({ msg: "Successfully updated" });
    })
    .catch((err) => {
      res.status(404).json({ msg: "Error, category not updated, try again" });
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
        res.json({ msg: "Deleted" })
      })
      .catch((err) => {
        res.status(404).json({ msg: "Not Found" });
      });
};