import express from "express";
//const { auth } = require("../middlewares/utils.js");
const messages_router = express.Router();
import {
    createMessages,
    getLastMessageFromEveryConversation,
    deleteMessage,
    getOneConversation,
} from "../controllers/messages.controllers.js";
  
messages_router.get('/getLastMessageFromEveryConversation/:user_id', getLastMessageFromEveryConversation)
messages_router.get('/getOneConversation/:receiver_id/:sender_id/:item_id', getOneConversation)
//messages_router.get('/getOneConversation/:conversation_id', getOneConversation)

messages_router.post('/', createMessages)
messages_router.delete('/', deleteMessage)

export { messages_router}