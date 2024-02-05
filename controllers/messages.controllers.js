import {
    _createMessages,
    _getAllUserMessages,
    _deleteMessage,
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
  
  export const getAllUserMessages = (req, res) => {
    const { receiver_id, sender_id } = req.body
      _getAllUserMessages(receiver_id, sender_id)
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