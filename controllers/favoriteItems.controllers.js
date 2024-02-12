import {
    _addToFavoriteItems,
    _deleteFavoriteItems,
    _getAllMyFavoriteItems,
} from "../models/favoriteItems.models.js"
  
export const addToFavoriteItems = (req, res) => {
    const { favorite_collector_id, item_id } = req.body;
    _addToFavoriteItems( favorite_collector_id, item_id )
    .then((data) => {
        res.json({ msg: "Successfully added" });
    })
    .catch((err) => {
        res.status(404).json({ msg: "Error, didn't addded, try again" });
    });
};
  
export const getAllMyFavoriteItems = (req, res) => {
    const { favorite_collector_id } = req.params
    _getAllMyFavoriteItems(favorite_collector_id)
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        res.status(404).json({ msg: "Not Found" });
    });
};
  
export const deleteFavoriteItems = (req, res) => {
    const { favorite_items_id } = req.params
    _deleteFavoriteItems(favorite_items_id)
    .then((data) => {
        res.json({ msg: "Deleted" })
    })
    .catch((err) => {
        res.status(404).json({ msg: "Not Found" });
    });
};