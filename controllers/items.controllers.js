import {
    _createItem,
    _getAllItemsByUserId,
    _getAllItemsByCityId,
    _deleteItem,
    _getAllItems,
    _getItemById,
    _updateIsReserved,
    _updateCity,
    _updatePrice,
    _updateCondition,
    _updateDescription,
    _getItemsByCategoryRecursive,
    _getItems,
  
  } from "../models/items.models.js"
  
  export const createItem = (req, res) => {
      const { title, owner_id, category_id, city_id, price, size, color, condition, year_of_manufacture, description, city, } = req.body;
      _createItem( title, owner_id, category_id, city_id, price, size, color, condition, year_of_manufacture, description, city )
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          //res.status(404).json({ msg: "Error, category not added, try again" });
          console.error("Error creating item:", err);

    // Если есть код ошибки из базы — вернём его
    if (err.code) {
      return res.status(500).json({ 
        msg: "Database error", 
        code: err.code, 
        detail: err.detail || err.message 
      });
    }

    res.status(500).json({ 
      msg: "Unexpected error while creating item", 
      error: err.message 
    });
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
    const { page = 1, limit = 20 } = req.params;
    _getAllItems({ page: parseInt(page), limit: parseInt(limit) })
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

  //_getItemsByCategoryRecursive

  export const getItemsByCategoryRecursive = (req, res) => {
    const { category_id } = req.params;
    _getItemsByCategoryRecursive(category_id)
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.status(404).json({ msg: "Not Found" });
        });
  };

  export const updateIsReserved = (req, res) => {
    const { item_id, user_id } = req.params
    _updateIsReserved( item_id, user_id )
      .then((data) => {
        res.json({ msg: "Successfully updated" });
      })
      .catch((err) => {
        res.status(404).json({ msg: "Error, try again" });
      });
  };

  export const updateCity = (req, res) => {
    const { city } = req.body;
    const { item_id } = req.params;
    _updateCity(item_id, city)
      .then((updatedItem) => {
        if (updatedItem) {
          res.json({ msg: "Successfully updated", item: updatedItem });
        } else {
          res.status(404).json({ msg: "Item not found" });
        }
      })
      .catch((err) => {
        console.error("Error updating city:", err);
        res.status(500).json({ msg: "Error, try again" });
      });
};

export const updatePrice = (req, res) => {
  const { price } = req.body;
  const { item_id } = req.params;
  _updatePrice(item_id, price)
    .then((updatedItem) => {
      if (updatedItem) {
        res.json({ msg: "Successfully updated", item: updatedItem });
      } else {
        res.status(404).json({ msg: "Item not found" });
      }
    })
    .catch((err) => {
      console.error("Error updating price:", err);
      res.status(500).json({ msg: "Error, try again" });
    });
};

export const updateCondition = (req, res) => {
  const { condition } = req.body;
  const { item_id } = req.params;
  _updateCondition(item_id, condition)
    .then((updatedItem) => {
      if (updatedItem) {
        res.json({ msg: "Successfully updated", item: updatedItem });
      } else {
        res.status(404).json({ msg: "Item not found" });
      }
    })
    .catch((err) => {
      console.error("Error updating condition:", err);
      res.status(500).json({ msg: "Error, try again" });
    });
};

export const updateDescription = (req, res) => {
  const { description } = req.body;
  const { item_id } = req.params;
  _updateDescription(item_id, description)
    .then((updatedItem) => {
      if (updatedItem) {
        res.json({ msg: "Successfully updated", item: updatedItem });
      } else {
        res.status(404).json({ msg: "Item not found" });
      }
    })
    .catch((err) => {
      console.error("Error updating description:", err);
      res.status(500).json({ msg: "Error, try again" });
    });
};

export const getItemsController = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      categoryId,
      recursive = "false",
      city,
      lowPrice,
      highPrice,
      condition,
      title
    } = req.query;

    const filters = {
      city,
      lowPrice: lowPrice ? Number(lowPrice) : undefined,
      highPrice: highPrice ? Number(highPrice) : undefined,
      condition,
      title
    };

    const { result, totalCount } = await _getItems({
      page: Number(page),
      limit: Number(limit),
      categoryId: categoryId ? Number(categoryId) : undefined,
      recursive: recursive === "true",
      filters
    });

    // Возвращаем именно { result, totalCount } — чтобы фронт находил res.result и res.totalCount
    return res.status(200).json({
      success: true,
      result,
      totalCount,
      page: Number(page),
      limit: Number(limit)
    });
  } catch (error) {
    console.error("Error in getItemsController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};
