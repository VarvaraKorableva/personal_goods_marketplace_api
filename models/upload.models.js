import { db } from "../config/pg.config.js";
/*
export const uploadSingle = ({ key, mimetype, location, originalname, item_id }) => {
  return db("uploads").insert({ key, mimetype, location, originalname, item_id }, [
    "key",
    "mimetype",
    "location",
    "originalname",
    "item_id",
  ]);
};*/

export const uploadSingle = async (key, mimetype, location, originalname, item_id) => {
  try {
    const result = await db("uploads").insert({
      key, mimetype, location, originalname, item_id
    }).returning("*");

    return result[0];
  }catch (error) {
    throw new Error(`Error creating image: ${error.message}`);
  }
};



/*
create table uploads(
 images_of_goods_id SERIAL PRIMARY KEY,
 item_id INTEGER,
 key varchar(255),
 mimetype varchar(50),
 location varchar(1000),
 originalname varchar(1000),

 FOREIGN KEY (item_id) REFERENCES items(item_id) ON DELETE CASCADE
)
*/
