import { db } from "../config/pg.config.js"

export const _createItem = async (title, owner_id, category_id, city_id, price, size, color, condition, year_of_manufacture, description, city) => {
  try {
    const result = await db("items").insert({
        title, 
        owner_id, 
        category_id, 
        city_id, price, 
        size, color, 
        condition, 
        year_of_manufacture, 
        description,
        city,
    }).returning("*");
    return result[0];
  }catch (error) {
    throw new Error(`Error creating item: ${error.message}`);
  }
};

export const _getAllItemsByCategoryId = async (category_id) => {
    try {
        const result = await db("items").select("*").where({ category_id }).orderBy("category_id")
        return result
    } catch (error) {
        throw new Error(`error in category.models: ${error.message}`);
    }
};
//all my, (not all sellor)
export const _getAllItemsByUserId = async (owner_id) => {
    try {
        const result = await db("items").select("*").where({ owner_id })
        return result
    } catch (error) {
        throw new Error(`error: ${error.message}`);
    }
};

export const _getAllItems = async () => {
    try {
        const result = await db("items").select("*").orderBy("item_id", "desc")
        .limit(40);
        return result
    } catch (error) {
        throw new Error(`error: ${error.message}`);
    }
};

export const _getAllItemsByCityId = async (city_id) => {
    try {
        const result = await db("items").select("*").where({ city_id })
        return result
    } catch (error) {
        throw new Error(`error in _getAllItemsByCityId: ${error.message}`);
    }
};
  
export const _deleteItem = (item_id) => {
    return db("items").delete("*").where({ item_id })
};

export const _getItemById = async (item_id) => {
    try {
        const result = await db("items").select("*").where({ item_id })
        return result
    } catch (error) {
        throw new Error(`error: ${error.message}`);
    }
};

/*
CREATE TABLE items (
    item_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    owner_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    city_id INTEGER,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    size VARCHAR(50),
    color VARCHAR(50),
    condition VARCHAR(255),
    year_of_manufacture INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,

    FOREIGN KEY (category_id) REFERENCES category(category_id) ON DELETE CASCADE,
    FOREIGN KEY (owner_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (city_id) REFERENCES cities(city_id) ON DELETE SET NULL
);


ALTER TABLE items
ADD COLUMN description VARCHAR(500) NOT NULL;

ALTER TABLE items
ADD COLUMN city VARCHAR(25);
*/