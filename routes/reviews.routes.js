import express from "express";
//const { auth } = require("../middlewares/utils.js");
const reviews_router = express.Router();
import {
    createReview,
    getAllMyReviews,
    getAllUserReviews,
    deleteReview,
    getAllReviews
} from "../controllers/reviews.controllers.js";
  
reviews_router.get('/authorreview/:author_review_id', getAllMyReviews) //which I wrote  
reviews_router.get('/sellerreview/:seller_id', getAllUserReviews)
reviews_router.post('/', createReview)
reviews_router.delete('/:review_id', deleteReview)
reviews_router.get('/', getAllReviews)


export { reviews_router }