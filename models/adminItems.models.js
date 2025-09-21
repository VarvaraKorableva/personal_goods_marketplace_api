import { db } from "../config/pg.config.js"

export const _getAllItemsAdmin = async ({ page = 1, limit = 20 }) => {
    
    try {
      const pageNum = parseInt(page, 10) || 1;
      const limitNum = parseInt(limit, 10) || 20;
      const offset = (pageNum - 1) * limitNum;
  
      const result = await db("items")
        .select("*")
        .where("deleted", false)
        .andWhere("moderated", false) 
        .orderBy("created_at", "desc")
        .limit(limitNum)
        .offset(offset);
  
      const [{ totalCount }] = await db("items")
        .where("deleted", false)
        .andWhere("moderated", false) 
        .count("* as totalCount");
  
      return {
        result,
        totalCount
      };
  
    } catch (error) {
      throw new Error(`error: ${error.message}`);
    }
  };

export const _deleteItemAdmin = (item_id) => {
    return db("items")
        .where({ item_id })
        .update({ deleted: true });
};

export const _getItemByIdAdmin = async (item_id) => {
    try {
      const result = await db("items as i")
        .select(
          "i.*",
          "u.username as owner_name",
          "u.telegram as owner_telegram",
          "c.category_id",
          "c.name as category_name",
          "c.parent_id as parent_category_id",
          "pc.name as parent_category_name"
        )
        .leftJoin("users as u", "i.owner_id", "u.user_id")
        .leftJoin("category as c", "i.category_id", "c.category_id")
        .leftJoin("category as pc", "c.parent_id", "pc.category_id")
        .where("i.item_id", item_id)
        .andWhere("i.deleted", false)
        .andWhere("moderated", false) 
  
      return result;
    } catch (error) {
      throw new Error(`Error in category.models: ${error.message}`);
    }
  };

export const _updateModeratedAdmin = async (item_id, moderated) => {
  try {
      const result = await db("items")
          .where({ item_id })
          .update({ moderated })
          .returning("*");

      return result[0];
  } catch (error) {
      console.error("Error updating price:", error);
      throw error;
  }
};

export const _getItemsByCategoryRecursiveAdmin = async (category_id) => {
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
        .andWhere("moderated", false) ;
  
      return items;
    } catch (error) {
      throw new Error(`Error in category.models: ${error.message}`);
    }
  };
  
  export const _getAllItemsByUserIdAdmin = async (owner_id) => {
    try {
        const result = await db("items").select("*").where({ owner_id }).andWhere("deleted", false).andWhere("moderated", true) ;
        return result
    } catch (error) {
        throw new Error(`error: ${error.message}`);
    }
};  