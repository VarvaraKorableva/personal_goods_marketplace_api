import { db } from "../config/pg.config.js";
/*
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
};*/

export const uploadSingle = async (item_id, key, mimetype, location, originalname) => {
  return await db("uploads").insert({
    item_id,
    key,
    mimetype,
    location,
    originalname
  }).returning("*");
};

export const _getAllImagesByUserId = async (owner_id) => {
  try {
      const result = await db("uploads").select("*").where({ owner_id })
      return result
  } catch (error) {
      throw new Error(`error: ${error.message}`);
  }
};

export const _getAllImagesByItemId = async (item_id) => {
  try {
      const result = await db("uploads").select("*").where({ item_id })
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

export const _uploadMultiple = async (user_id, item_id, files) => {
  
  try {
    const uploadedFiles = [];

    const fileKeys = ['firstFile', 'secondFile', 'thirdFile', 'fourthFile'];

    for (const key of fileKeys) {
      const fileArray = files[key];
      if (fileArray) {
        for (const file of fileArray) {
          
          const result = await db("uploads").insert({
            item_id,
            owner_id: user_id,
            key: file.key,
            mimetype: file.mimetype,
            location: file.location,
            originalname: file.originalname,
          }).returning("*");

          uploadedFiles.push(result[0]);
        }
      }
    }

    return uploadedFiles;
  } catch (error) {
    console.error("Ошибка при сохранении нескольких файлов:", error);
    throw error;
  }
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


ALTER TABLE uploads
ADD COLUMN owner_id INTEGER;

ALTER TABLE uploads
ADD CONSTRAINT fk_owner
FOREIGN KEY (owner_id) REFERENCES users(user_id)
ON DELETE CASCADE;
*/
