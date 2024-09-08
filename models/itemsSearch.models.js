//items_search
import { db } from "../config/pg.config.js"

export const _getAllItemsByCity = async (city) => {
    try {
        const result = await db("items").select("*").where({ city })
        return result
    } catch (error) {
        throw new Error(`error in _getAllItemsByCity: ${error.message}`);
    }
};

export const _getItemsByFilter = async (filters) => {
    try {
        let query = db("items").select("*");

        if (filters.city) {
            query = query.where('city', 'ILIKE', `%${filters.city}%`); //{ city: filters.city } 
        }
        if (filters.lowPrice) {
            query = query.andWhere('price', '>=', filters.lowPrice);
        }
        if (filters.highPrice) {
            query = query.andWhere('price', '<=', filters.highPrice);
        }
        if (filters.condition) {
            query = query.andWhere({ condition: filters.condition });
        }
        if (filters.title) {
            query = query.andWhere('title', 'ILIKE', `%${filters.title}%`);
        }

        const result = await query;

        return result;
    } catch (error) {
        throw new Error(`error in _getItemsByFilter: ${error.message}`);
    }
};
