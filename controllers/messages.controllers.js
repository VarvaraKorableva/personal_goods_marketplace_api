import {
    _createMessages,
    _getLastMessageFromEveryConversation,
    
    _deleteMessage,
    _getOneConversation,
  } from "../models/messages.models.js"
  
  export const createMessages = (req, res) => {
      const { sender_id, receiver_id, message_text, item_id } = req.body;
      _createMessages( sender_id, receiver_id, message_text, item_id )
        .then((data) => {
          res.json({ msg: "Successfully added" });
        })
        .catch((err) => {
          res.status(404).json({ msg: "Error, message didn't send, try again" });
        });
  };

  export const getOneConversation = (req, res) => {
    const { receiver_id, sender_id, item_id } = req.params
    _getOneConversation(receiver_id, sender_id, item_id)
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.status(404).json({ msg: "Not Found" });
        });
  };
  
  export const getLastMessageFromEveryConversation = (req, res) => {
    const { user_id } = req.params
      _getLastMessageFromEveryConversation(user_id)
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.status(404).json({ msg: "Not Found" });
        });
  };
  
  export const deleteMessage = (req, res) => {
      const { message_id } = req.body
      _deleteMessage(message_id)
        .then((data) => {
          res.status(204).json({ msg: "Deleted" })
        })
        .catch((err) => {
          res.status(404).json({ msg: "Not Found" });
        });
  };