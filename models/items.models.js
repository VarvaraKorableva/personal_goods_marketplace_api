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
    await db("users")
    .where({ user_id: owner_id })
    .increment("ad_count", 1);

    return result[0];
  }catch (error) {
    throw new Error(`Error creating item: ${error.message}`);
  }
};

//all my, (not all sellor)
export const _getAllItemsByUserId = async (owner_id) => {
    try {
        const result = await db("items")
        .select("*")
        .where({ owner_id })
        .andWhere("deleted", false)
        return result
    } catch (error) {
        throw new Error(`error: ${error.message}`);
    }
};

export const _getAllItemsByCityId = async (city_id) => {
    try {
        const result = await db("items").select("*").where({ city_id }).andWhere("deleted", false).andWhere("moderated", true) ;
        return result
    } catch (error) {
        throw new Error(`error in _getAllItemsByCityId: ${error.message}`);
    }
};

export const _deleteItem = async (item_id) => {
  try {
    // Находим владельца по item_id
    const item = await db("items")
      .select("owner_id")
      .where({ item_id })
      .first();

    if (!item) {
      throw new Error("Item not found");
    }

    // Помечаем объявление как удалённое
    await db("items")
      .where({ item_id })
      .update({ deleted: true });

    // Уменьшаем ad_count у владельца
    await db("users")
      .where({ user_id: item.owner_id })
      .decrement("ad_count", 1);

    return { success: true };
  } catch (error) {
    throw new Error(`Error deleting item: ${error.message}`);
  }
};


export const _getItemById = async (item_id) => {
    try {
      const result = await db("items as i")
        .select(
          "i.*",
          "u.username as owner_name",
          "u.telegram as owner_telegram",
          "c.category_id",
          "c.name as category_name",
          "c.parent_id as parent_category_id",
          "pc.name as parent_category_name",
          "pc.name_rus as parent_category_name_rus"
        )
        .leftJoin("users as u", "i.owner_id", "u.user_id")
        .leftJoin("category as c", "i.category_id", "c.category_id")
        .leftJoin("category as pc", "c.parent_id", "pc.category_id")
        .where("i.item_id", item_id)
        .andWhere("i.deleted", false)
        .andWhere("moderated", true) 
  
      return result;
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
export const _getItemsByCategoryRecursive = async (category_id) => {
    try {
      const categoryIds = new Set([Number(category_id)]);
      
      // рекурсивная функция для обхода категорий
      const getSubCategories = async (ids) => {
        const subCategories = await db("category")
          .select("category_id")
          .whereIn("parent_id", ids);
  
        if (subCategories.length > 0) {
          const newIds = subCategories.map(c => c.category_id);
  
          newIds.forEach(id => categoryIds.add(id));
  
          // рекурсивно спускаемся глубже
          await getSubCategories(newIds);
        }
      };
  
      await getSubCategories([category_id]);
  
      const items = await db("items")
        .select("*")
        .whereIn("category_id", [...categoryIds])
        .andWhere("deleted", false)
        .andWhere("moderated", true) ;
  
      return items;
    } catch (error) {
      throw new Error(`Error in category.models: ${error.message}`);
    }
  };*/

  // models/items.model.js
export const _getItems = async ({
  page = 1,
  limit = 20,
  categoryId = null,
  recursive = false,
  filters = {}
}) => {
  try {
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 20;
    const offset = (pageNum - 1) * limitNum;

    let baseQuery = db("items").where("deleted", false).andWhere("moderated", true);

    // категория + рекурсия
    if (categoryId) {
      let categoryIds = [Number(categoryId)];

      if (recursive) {
        const getSubCategories = async (ids, acc) => {
          const subCategories = await db("category")
            .select("category_id")
            .whereIn("parent_id", ids);

          if (subCategories.length > 0) {
            const newIds = subCategories.map(c => c.category_id);
            acc.push(...newIds);
            await getSubCategories(newIds, acc);
          }
        };

        const allIds = [...categoryIds];
        await getSubCategories(categoryIds, allIds);
        categoryIds = [...new Set(allIds)];
      }

      baseQuery = baseQuery.whereIn("category_id", categoryIds);
    }

    // фильтры
    if (filters.city) {
      baseQuery = baseQuery.andWhere("city", "ILIKE", `%${filters.city}%`);
    }
    if (filters.lowPrice !== undefined) {
      baseQuery = baseQuery.andWhere("price", ">=", filters.lowPrice);
    }
    if (filters.highPrice !== undefined) {
      baseQuery = baseQuery.andWhere("price", "<=", filters.highPrice);
    }
    if (filters.condition) {
      baseQuery = baseQuery.andWhere({ condition: filters.condition });
    }
    if (filters.title) {
      baseQuery = baseQuery.andWhere("title", "ILIKE", `%${filters.title}%`);
    }

    // подсчёт totalCount по тем же условиям
    const countRow = await baseQuery.clone().count("* as totalCount").first();
    const totalCount = Number(countRow?.totalCount) || 0;

    // выборка с пагинацией
    const result = await baseQuery
      .clone()
      .select("*")
      .orderBy("created_at", "desc")
      .limit(limitNum)
      .offset(offset);

    return { result, totalCount };
  } catch (error) {
    throw new Error(`error in getItems: ${error.message}`);
  }
};

  
/*

Все объявления с пагинацией:

getItems({ page: 1, limit: 20 });


Все объявления из категории с подкатегориями:

getItems({ categoryId: 5, recursive: true });


Только отфильтрованные по городу и цене:

getItems({ filters: { city: "Tel Aviv", lowPrice: 100, highPrice: 500 } });

*/


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