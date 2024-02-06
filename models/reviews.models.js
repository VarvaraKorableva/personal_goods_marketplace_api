import { db } from "../config/pg.config.js"

export const _createReview = async (author_review_id, seller_id, text_review, score) => {
  try {
    const result = await db("reviews").insert({
        author_review_id,
        seller_id,
        text_review,
        score
    }).returning("*");

    return result[0];
  }catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};
//which I wrote
export const _getAllMyReviews = async (author_review_id) => {
    console.log('_getAllMyReviews =>', {author_review_id})
    try {
        const result = await db("reviews")
        .select("*")
        .where({author_review_id})
        //.orderBy("timestamp", "asc");
        return result
    } catch (error) {
        throw new Error(`Error in _getAllMyReviews: ${error.message}`);
    }
};

export const _getAllUserReviews = async (seller_id) => {
    try {
        const result = await db("reviews")
        .select("*")
        .where({ seller_id })
        //.orderBy("timestamp", "asc");
        return result
    } catch (error) {
        throw new Error(`Error in messages.models: ${error.message}`);
    }
};

export const _getAllReviews = async () => {
    try {
        const result = await db("reviews")
        .select("*")
        return result
    } catch (error) {
        throw new Error(`Error in messages.models: ${error.message}`);
    }
};
  
export const _deleteReview = (review_id) => {
    return db("reviews").delete("*").where({ review_id })
};

/*
CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    author_review_id INTEGER NOT NULL,
    seller_id INTEGER NOT NULL,
    text_review VARCHAR(1000),
    score INTEGER CHECK (score >= 1 AND score <= 5),
    FOREIGN KEY (author_review_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (seller_id) REFERENCES users(user_id) ON DELETE CASCADE
);

ALTER TABLE reviews
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL;
*/