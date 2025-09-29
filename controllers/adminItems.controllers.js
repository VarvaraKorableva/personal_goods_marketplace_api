import {
    _getAllItemsByUserIdAdmin,
    _deleteItemAdmin,
    _getAllItemsAdmin,
    _getItemByIdAdmin,
    _getItemsByCategoryRecursiveAdmin,
    _updateModeratedAdmin,
  
  } from "../models/adminItems.models.js"



  export const getAllItemsByUserIdAdmin = (req, res) => {
    const { owner_id } = req.params;
    _getAllItemsByUserIdAdmin(owner_id)
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.status(404).json({ msg: "Not Found" });
        });
  };

  export const getItemByIdAdmin = (req, res) => {
    const { item_id } = req.params;
    _getItemByIdAdmin (item_id)
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.status(404).json({ msg: "Not Found" });
        });
  };

  export const getAllItemsAdmin = (req, res) => {
    const { page = 1, limit = 20 } = req.params;
    _getAllItemsAdmin({ page: parseInt(page), limit: parseInt(limit) })
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.status(404).json({ msg: "Not Found" });
        });
  };  

  export const deleteItemAdmin = (req, res) => {
      const { item_id } = req.params
      _deleteItemAdmin(item_id)
        .then((data) => {
          res.json({ msg: "Deleted" })
        })
        .catch((err) => {
          res.status(404).json({ msg: "Not Found" });
        });
  };

  //_getItemsByCategoryRecursive

  export const getItemsByCategoryRecursiveAdmin = (req, res) => {
    const { category_id } = req.params;
    _getItemsByCategoryRecursiveAdmin(category_id)
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.status(404).json({ msg: "Not Found" });
        });
  };

export const updateModeratedAdmin = (req, res) => {
  const { item_id, moderated } = req.body;
  
  _updateModeratedAdmin(item_id, moderated)
    .then((updatedItem) => {
      if (updatedItem) {
        res.json({ msg: "Successfully updated", item: updatedItem });
      } else {
        res.status(404).json({ msg: "Item not found" });
      }
    })
    .catch((err) => {
      console.error("Error updating Moderated:", err);
      res.status(500).json({ msg: "Error, try again" });
    });
};
