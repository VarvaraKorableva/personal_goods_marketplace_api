import {
    _createReview,
    _getAllMyReviews,
    _getAllUserReviews,
    _deleteReview,
    _getAllReviews
} from "../models/reviews.models.js"
  
export const createReview = (req, res) => {
    const { author_review_id, seller_id, text_review, score } = req.body;
    _createReview( author_review_id, seller_id, text_review, score )
    .then((data) => {
        res.json(data).json({ msg: "Successfully added" });
    })
    .catch((err) => {
        res.status(404).json({ msg: "Error, didn't addded, try again" });
    });
};
//which I wrote
export const getAllMyReviews = (req, res) => {
    const user_id  = req.params
    const author_id = Number(user_id.author_review_id)
    _getAllMyReviews(author_id)
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        res.status(404).json({ msg: err });
    });
};

export const getAllUserReviews = (req, res) => {
    const { seller_id } = req.params
    const id = Number(seller_id)
    _getAllUserReviews(id)
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        res.status(404).json({ msg: "Not Found" });
    });
};
  
export const deleteReview = (req, res) => {
    const { review_id } = req.params
    _deleteReview(review_id)
    .then(() => {
        res.json({ msg: "Deleted" })//status(204).
    })
    .catch((err) => {
        res.status(404).json({ msg: "Not Found" });
    });
};

export const getAllReviews = (req, res) => {
    _getAllReviews()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(404).json({ msg: "Not Found" });
      });
};
