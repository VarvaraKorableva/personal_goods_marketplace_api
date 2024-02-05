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

export const _getAllCategory = () => {
  return db("сategory").select("*").orderBy("сategory_id");
};
  
export const _deleteCategory = (сategory_id) => {
    return db("сategory").delete("*").where({ сategory_id })
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
