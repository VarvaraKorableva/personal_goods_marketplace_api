import {
    _createConversation,
    //_deleteConversationById,
    //_getLastMessagesForUser,
    //_getAllUserConversations,
    _deleteConversation,
  } from "../models/conversations.models.js"


export const createConversation = (req, res) => {
    const { conversation_owner_id, item_owner_id, item_id } = req.body;
    
    _createConversation( conversation_owner_id, item_owner_id, item_id )
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(404).json({ msg: "Error, conversation didn't created, try again" });
      });
};

export const deleteConversation = (req, res) => {
    const { user_id, conversation_id } = req.body
    _deleteConversation(user_id, conversation_id )
      .then((data) => {
        res.json({ msg: "Deleted" })
      })
      .catch((err) => {
        res.status(404).json({ msg: "Not Found" });
      });
};
/*
export const getAllUserConversations = (req, res) => {
    
    const { user_id } = req.params
    _getAllUserConversations(user_id)
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.status(404).json({ msg: "Not Found" });
        });
  };*/
//_getLastMessagesForUser dont need
/*
export const getLastMessagesForUser = (req, res) => {
  const { user_id } = req.params
  console.log('req.params', req.params)
  _getLastMessagesForUser(user_id)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(404).json({ msg: "Not Found" });
      });
};*/