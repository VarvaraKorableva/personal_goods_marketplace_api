import express from "express";
//const { auth } = require("../middlewares/utils.js");
const messages_router = express.Router();
import {
    createMessages,
    getLastMessageFromEveryConversation,
    deleteMessage,
    getOneConversation,
    markMessagesAsRead,
    getUnreadbleMessages,
} from "../controllers/messages.controllers.js";
  
messages_router.get('/getLastMessageFromEveryConversation/:user_id', getLastMessageFromEveryConversation)
messages_router.get('/getOneConversation/:receiver_id/:sender_id/:item_id/:my_user_id', getOneConversation)
messages_router.get('/getUnreadbleMessages/:user_id', getUnreadbleMessages)

messages_router.post('/', createMessages)
messages_router.delete('/:message_id', deleteMessage)
messages_router.patch('/markMessagesAsRead/:conversation_id/:user_id', markMessagesAsRead)

export { messages_router}