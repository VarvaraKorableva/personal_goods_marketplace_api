/*import dotenv from "dotenv";
dotenv.config();*/

import {
  _createCategory,
  _deleteCategory,
  _getAllCategory,
  _updateCategory,
  _updateCategorySlug,
  _updateCategoryParentId,
  _updateCategoryName,
  _updateCategoryNameEng,
} from "../models/category.models.js"

export const createCategory = (req, res) => {
    const { name, is_good, parent_id, image_url, slug, name_rus, is_real_estate, is_rent } = req.body;
    _createCategory( name, is_good, parent_id, image_url, slug, name_rus, is_real_estate, is_rent )
      .then((data) => {
        res.json({ msg: "Successfully added" });
      })
      .catch((err) => {
        console.error("Ошибка при добавлении категории:", err);
        res.status(500).json({ msg: "Error, category not added, try again", error: err.message });
      });
      
      
};

export const updateCategoryName = (req, res) => {
  const { category_id, name_rus } = req.body;
  _updateCategoryName( category_id, name_rus )
    .then((data) => {
      res.json({ msg: "Successfully updated" });
    })
    .catch((err) => {
      res.status(404).json({ msg: "Error, category not updated, try again" });
    });
};

export const updateCategoryNameEng = (req, res) => {
  const { category_id, name } = req.body;
  _updateCategoryNameEng( category_id, name )
    .then((data) => {
      res.json({ msg: "Successfully updated" });
    })
    .catch((err) => {
      res.status(404).json({ msg: "Error, category not updated, try again" });
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
    const { category_id } = req.params
    _deleteCategory(category_id)
      .then((data) => {
        res.json({ msg: "Deleted" })
      })
      .catch((err) => {
        res.status(404).json({ msg: "Not Found" });
      });
};

export const updateCategoryParentId = (req, res) => {
  const { category_id, parent_id } = req.body;
  _updateCategoryParentId( category_id, parent_id )
    .then((data) => {
      res.json({ msg: "Successfully updated" });
    })
    .catch((err) => {
      res.status(404).json({ msg: "Error, category not updated, try again" });
    });
};

