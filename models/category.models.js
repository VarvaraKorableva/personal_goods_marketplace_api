import { db } from "../config/pg.config.js"

export const _createCategory = async (name, is_good, parent_id) => {
  try {
    const result = await db("category").insert({
      name,
      is_good,
      parent_id
    }).returning("*");

    return result[0];
  }catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

export const _getAllCategory = async () => {
    try {
        const result = await db("category").select("*").orderBy("category_id")
        return result
    } catch (error) {
        throw new Error(`error in category.models: ${error.message}`);
    }
};
  
export const _deleteCategory = (category_id) => {
    return db("category").delete("*").where({ category_id })
  };

/*
CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    is_good BOOLEAN,
    parent_id INTEGER,//если я не передаю знаючит это категория, если передаю, это субкатегория
    FOREIGN KEY (parent_id) REFERENCES category(category_id) ON DELETE CASCADE
);
 */
