import {
    _createItem,
    _getAllItemsByCategoryId,
    _getAllItemsByUserId,
    _getAllItemsByCityId,
    _deleteItem,
    _getAllItems,
    _getItemById,
    _getItemsBySubCategoriesByParentId,
  
  } from "../models/items.models.js"
  
  export const createItem = (req, res) => {
      const { title, owner_id, category_id, city_id, price, size, color, condition, year_of_manufacture, description, city, } = req.body;
      _createItem( title, owner_id, category_id, city_id, price, size, color, condition, year_of_manufacture, description, city )
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.status(404).json({ msg: "Error, category not added, try again" });
        });
  };
  
  export const getAllItemsByCategoryId = (req, res) => {
    const { category_id } = req.params;
    _getAllItemsByCategoryId(category_id)
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.status(404).json({ msg: "Not Found" });
        });
  };

  export const getAllItemsByUserId = (req, res) => {
    const { owner_id } = req.params;
    _getAllItemsByUserId(owner_id)
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.status(404).json({ msg: "Not Found" });
        });
  };

  export const getItemById = (req, res) => {
    const { item_id } = req.params;
    _getItemById (item_id)
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.status(404).json({ msg: "Not Found" });
        });
  };

  export const getAllItems = (req, res) => {
    _getAllItems()
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.status(404).json({ msg: "Not Found" });
        });
  };  

  export const deleteItem = (req, res) => {
      const { item_id } = req.params
      _deleteItem(item_id)
        .then((data) => {
          res.json({ msg: "Deleted" })
        })
        .catch((err) => {
          res.status(404).json({ msg: "Not Found" });
        });
  };


  export const getItemsBySubCategoriesByParentId = (req, res) => {
    const { parent_id } = req.params;
    _getItemsBySubCategoriesByParentId(parent_id)
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.status(404).json({ msg: "Not Found" });
        });
  };
