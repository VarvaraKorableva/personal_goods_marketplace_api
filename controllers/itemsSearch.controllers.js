import {
    _getAllItemsByCity,
    _getItemsByFilter,
} from "../models/itemsSearch.models.js"

export const getItemsByFilter = async (req, res) => {
    const { city, lowPrice, highPrice, condition, title } = req.query

    const filters = {
        city,
        lowPrice: lowPrice ? parseFloat(lowPrice) : undefined,
        highPrice: highPrice ? parseFloat(highPrice) : undefined,
        condition,
        title,
    };

    try {
        const data = await _getItemsByFilter(filters);
        res.json(data);
    } catch (err) {
        console.error('Error fetching items:', err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};
/*

const city = 'New York';
const lowPrice = 100;
const highPrice = 500;
const condition = 'new';
const title = 'laptop';

const queryString = new URLSearchParams({
    city,
    lowPrice,
    highPrice,
    condition,
    title
}).toString();

fetch(`/items?${queryString}`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
*/