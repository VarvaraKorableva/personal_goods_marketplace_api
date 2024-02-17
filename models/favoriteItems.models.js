import { db } from "../config/pg.config.js"

export const _addToFavoriteItems = async (favorite_collector_id, item_id) => {
  try {
    const result = await db("favorite_items").insert({
      favorite_collector_id, 
      item_id
    }).returning("*");

    return result[0];
  }catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

export const _getAllMyFavoriteItems = async (favorite_collector_id) => {
    try {
        const result = await db("favorite_items")
        .select("*")
        .where({ favorite_collector_id })
        return result
    } catch (error) {
        throw new Error(`Error in _getAllMyFavoriteItems: ${error.message}`);
    }
};
  
export const _deleteFavoriteItems = (item_id) => {
    return db("favorite_items").delete("*").where({ item_id })
};


/*CREATE TABLE favorite_items (
    favorite_items_id SERIAL PRIMARY KEY,
    favorite_collector_id INTEGER NOT NULL,
    item_id INTEGER NOT NULL,
    FOREIGN KEY (item_id) REFERENCES items(item_id) ON DELETE CASCADE,
    FOREIGN KEY (favorite_collector_id) REFERENCES users(user_id) ON DELETE CASCADE
);*/