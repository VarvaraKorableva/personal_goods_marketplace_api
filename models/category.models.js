import { db } from "../config/pg.config.js"

export const _createCategory = async ( name, is_good, parent_id, image_url, slug, name_rus, is_real_estate ) => {
  try {
    const result = await db("category").insert({
      name,
      is_good,
      parent_id,
      image_url,
      slug,
      name_rus,
      is_real_estate
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

export const _updateCategory = async (category_id, image_url) => {
  try {
      const result = await db("category")
          .where({ category_id })
          .update({image_url})
          .returning("*");

      return result[0];
  } catch (error) {
      throw new Error(`Error updating category: ${error.message}`);
  }
};

export const _updateCategorySlug = async (category_id, slug) => {
  try {
      const result = await db("category")
          .where({ category_id })
          .update({slug})
          .returning("*");

      return result[0];
  } catch (error) {
      throw new Error(`Error updating category: ${error.message}`);
  }
};

export const _updateCategoryParentId = async (category_id, parent_id) => {
  try {
      const result = await db("category")
          .where({ category_id })
          .update({parent_id})
          .returning("*");

      return result[0];
  } catch (error) {
      throw new Error(`Error updating category: ${error.message}`);
  }
};

export const _updateCategoryName = async (category_id, name_rus) => {
  try {
      const result = await db("category")
          .where({ category_id })
          .update({name_rus})
          .returning("*");

      return result[0];
  } catch (error) {
      throw new Error(`Error updating category: ${error.message}`);
  }
};

export const _updateCategoryNameEng = async (category_id, name) => {
  
  try {
      const result = await db("category")
          .where({ category_id })
          .update({name})
          .returning("*");
          
      return result[0];
  } catch (error) {
      throw new Error(`Error updating category: ${error.message}`);
  }
};

/*
CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    is_good BOOLEAN,
    parent_id INTEGER,//если я не передаю знаючит это категория, если передаю, это субкатегория
    FOREIGN KEY (parent_id) REFERENCES category(category_id) ON DELETE CASCADE
);

ALTER TABLE category
ADD COLUMN image_url VARCHAR(255) DEFAULT 'https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D';

ALTER TABLE category
ADD COLUMN slug VARCHAR(30);
 */
