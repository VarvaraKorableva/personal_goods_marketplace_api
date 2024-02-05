import {
    _createItem,
    _getAllItemsByCategoryId,
    _getAllItemsByUserId,
    _getAllItemsByCityId,
    _deleteItem,
  } from "../models/items.models.js"
  
  export const createItem = (req, res) => {
      const { title, owner_id, category_id, city_id, price, size, color, condition, year_of_manufacture, description } = req.body;
      _createItem( title, owner_id, category_id, city_id, price, size, color, condition, year_of_manufacture, description )
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.status(404).json({ msg: "Error, category not added, try again" });
        });
  };
  
  export const getAllItemsByCategoryId = (req, res) => {
    const { category_id } = req.body;
    _getAllItemsByCategoryId(category_id)
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.status(404).json({ msg: "Not Found" });
        });
  };

  export const getAllItemsByUserId = (req, res) => {
    const { owner_id } = req.body;
    _getAllItemsByUserId(owner_id)
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.status(404).json({ msg: "Not Found" });
        });
  };

  export const getAllItemsByCityId = (req, res) => {
    const { city_id } = req.body;
    _getAllItemsByCityId(city_id)
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.status(404).json({ msg: "Not Found" });
        });
  };  
  
  export const deleteItem = (req, res) => {
      const { item_id } = req.body
      _deleteItem(item_id)
        .then((data) => {
          res.json(data).json({ msg: "Deleted" })
        })
        .catch((err) => {
          res.status(404).json({ msg: "Not Found" });
        });
  };