import { db } from "../config/pg.config.js";
/*
export const uploadSingle = async (item_id, key, mimetype, location, originalname ) => {
  return db("uploads").insert({ item_id, key, mimetype, location, originalname }, [
    "item_id",
    "key",
    "mimetype",
    "location",
    "originalname",
  ]);
}; */

export const uploadSingle = async (item_id, key, mimetype, location, originalname) => {

  try {
    const result = await db("uploads")
    .insert({ item_id, key, mimetype, location, originalname })
    .returning("*");
    return result[0];
  } catch (error) {
    console.error("Ошибка при вставке данных:", error);
    return null;
  }
};


export const _getAllImagesByUserId = async (owner_id) => {
  try {
      const result = await db("uploads").select("*").where({ owner_id })
      return result
  } catch (error) {
      throw new Error(`error: ${error.message}`);
  }
};

export const _getAllImages = async () => {
  try {
      const result = await db("uploads").select("*")
      return result
  } catch (error) {
      throw new Error(`Error in _getAllItemsImagesByUserId: ${error.message}`);
  }
};

export const _deleteImage = (images_of_goods_id) => {
  return db("uploads").delete("*").where({ images_of_goods_id })
};


/*
create table uploads(
 images_of_goods_id SERIAL PRIMARY KEY,
 item_id INTEGER,
 key varchar(255),
 mimetype varchar(50),
 location varchar(1000),////
 originalname varchar(1000),

 FOREIGN KEY (item_id) REFERENCES items(item_id) ON DELETE CASCADE
)
*/
