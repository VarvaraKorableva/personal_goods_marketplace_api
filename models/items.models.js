import { db } from "../config/pg.config.js"
/*
export const _createItem = async (title, owner_id, category_id, city_id, price, size, color, condition, year_of_manufacture, description, city) => {
    try {
      // 1. Добавляем новый айтем
      const [newItem] = await db("items")
        .insert({
            title, 
            owner_id, 
            category_id, 
            city_id, price, 
            size, color, 
            condition, 
            year_of_manufacture, 
            description,
            city,
        })
        .returning("*");
  
      // 2. Находим юзера по owner_id
      const user = await db("users")
        .where("user_id", owner_id)
        .first();
  
      // 3. Возвращаем оба объекта
      return { item: newItem, user };
    } catch (error) {
      throw new Error(`Error creating item: ${error.message}`);
    }
  };*/

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
        
        const categories = await db("category").select("*").where({ parent_id: category_id });
        
        const categoryId = categories.map(category => category.category_id);
        categoryId.push(Number(category_id))
        
        const items = await db("items").select("*").whereIn("category_id", categoryId).andWhere("deleted", false);
        
        return items;
    
      } catch (error) {
        throw new Error(`Error in category.models: ${error.message}`);
      }
};

//all my, (not all sellor)
export const _getAllItemsByUserId = async (owner_id) => {
    try {
        const result = await db("items").select("*").where({ owner_id }).andWhere("deleted", false);
        return result
    } catch (error) {
        throw new Error(`error: ${error.message}`);
    }
};

export const _getAllItems = async ({ page = 1, limit = 20 }) => {
    try {
      const pageNum = parseInt(page, 10) || 1;
      const limitNum = parseInt(limit, 10) || 20;
      const offset = (pageNum - 1) * limitNum;
  
      const result = await db("items")
        .select("*")
        .where("deleted", false)
        .orderBy("created_at", "desc")
        .limit(limitNum)
        .offset(offset);
  
      const [{ totalCount }] = await db("items")
        .where("deleted", false)
        .count("* as totalCount");
  
      return {
        result,
        totalCount
      };
  
    } catch (error) {
      throw new Error(`error: ${error.message}`);
    }
  };

export const _getAllItemsByCityId = async (city_id) => {
    try {
        const result = await db("items").select("*").where({ city_id }).andWhere("deleted", false);
        return result
    } catch (error) {
        throw new Error(`error in _getAllItemsByCityId: ${error.message}`);
    }
};
/*  
export const _deleteItem = (item_id) => {
    return db("items").delete("*").where({ item_id })
};*/

export const _deleteItem = (item_id) => {
    return db("items")
        .where({ item_id })
        .update({ deleted: true });
};

export const _getItemById = async (item_id) => {
    try {
        const result = await db("items").select("*").where({ item_id }).andWhere("deleted", false);
        return result
    } catch (error) {
        throw new Error(`error: ${error.message}`);
    }
};

export const _getItemsBySubCategoriesByParentId = async (parent_id) => { /////category_id
    
    try {
      const categories = await db("category").select("*").where({ parent_id });
      const categoryId = categories.map(category => category.category_id);
      categoryId.push(Number(parent_id))
      
      //const items = await db("items").select("*").whereIn("category_id", categoryId);

      const categories2 = await db("category").select("*").whereIn("parent_id", categoryId);
      const categoryId2 = categories2.map(category => category.category_id);
      categoryId2.push(Number(parent_id))

      const items = await db("items").select("*").whereIn("category_id", categoryId2).andWhere("deleted", false);
      return items;
  
    } catch (error) {
      throw new Error(`Error in category.models: ${error.message}`);
    }
  };
  
  export const _updateIsReserved = async (item_id, user_id) => {
    try {
        const item = await db("items")
            .where({ item_id, owner_id: user_id })
            .first("reserved");

        if (item) {
            const newReservedValue = !item.reserved;

            const result = await db("items")
                .where({ item_id, owner_id: user_id })
                .update('reserved', newReservedValue)
                .returning("*");
    
            return result[0];
        } else {
            throw new Error("Item not found.");
        }
    } catch (error) {
        throw new Error(`Error updating reservation status: ${error.message}`);
    }
};


export const _updateImagesArr = async (item_id, imagesArr) => {
    try {
        const result = await db("items")
            .where({ item_id})
            .update('images', imagesArr)
            .returning("*");
            return result[0];
    } catch (error) {
        throw new Error(`Error updating reservation status: ${error.message}`);
    }
};

export const _updateCity = async (item_id, city) => {
    try {
        const result = await db("items")
            .where({ item_id })
            .update({ city })
            .returning("*");

        return result[0];
    } catch (error) {
        console.error("Error updating city:", error);
        throw error;
    }
};

export const _updatePrice = async (item_id, price) => {
    try {
        const result = await db("items")
            .where({ item_id })
            .update({ price })
            .returning("*");

        return result[0];
    } catch (error) {
        console.error("Error updating price:", error);
        throw error;
    }
};

export const _updateCondition = async (item_id, condition) => {
    try {
        const result = await db("items")
            .where({ item_id })
            .update({ condition })
            .returning("*");

        return result[0];
    } catch (error) {
        console.error("Error updating price:", error);
        throw error;
    }
};

export const _updateDescription = async (item_id, description) => {
    try {
        const result = await db("items")
            .where({ item_id })
            .update({ description })
            .returning("*");

        return result[0];
    } catch (error) {
        console.error("Error updating price:", error);
        throw error;
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
ADD COLUMN description VARCHAR(500) NOT NULL;     ///now it is 900 after 5.08.2024

ALTER TABLE items
ADD COLUMN city VARCHAR(25);


create table uploads(
 images_of_goods_id SERIAL PRIMARY KEY,
 item_id INTEGER,
 key varchar(255),
 mimetype varchar(50),
 location varchar(1000),
 originalname varchar(1000),

 FOREIGN KEY (item_id) REFERENCES items(item_id) ON DELETE CASCADE
)


ALTER TABLE items
ALTER COLUMN description TYPE VARCHAR(900);

ALTER TABLE items
ADD COLUMN reserved BOOLEAN DEFAULT FALSE;

ALTER TABLE items
ALTER COLUMN city TYPE VARCHAR(200);


ALTER TABLE items
ADD COLUMN images TEXT[];

ALTER TABLE items
ADD COLUMN deleted BOOLEAN DEFAULT FALSE;

ALTER TABLE items ADD COLUMN updated_at TIMESTAMP;

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = CURRENT_TIMESTAMP; -- Обновляем колонку при изменении
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_items_updated_at
BEFORE UPDATE ON items
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

*/