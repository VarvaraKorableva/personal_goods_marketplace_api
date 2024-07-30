import {
    _createConversation,
    _deleteConversationById,
    _getAllUserConversations,
  } from "../models/conversations.models.js"


export const createConversation = (req, res) => {
    const { sender_id, receiver_id, item_id } = req.body;
    
    _createConversation( sender_id, receiver_id, item_id )
      .then((res) => {
        res.json({ msg: "Successfully added" });
      })
      .catch((err) => {
        res.status(404).json({ msg: "Error, message didn't send, try again" });
      });
};

export const deleteConversationById = (req, res) => {
    const { conversation_id, user_id } = req.body
    _deleteConversationById(conversation_id, user_id)
      .then((data) => {
        res.json({ msg: "Deleted" })
      })
      .catch((err) => {
        res.status(404).json({ msg: "Not Found" });
      });
};

export const getAllUserConversations = (req, res) => {
    
    const { user_id } = req.params
    _getAllUserConversations(user_id)
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.status(404).json({ msg: "Not Found" });
        });
  };
