import express from "express";
//const { auth } = require("../middlewares/utils.js");
const messages_router = express.Router();
import {
    createMessages,
    getAllUserMessages,
    deleteMessage,
} from "../controllers/messages.controllers.js";
  
messages_router.get('/', getAllUserMessages)
messages_router.post('/', createMessages)
messages_router.delete('/', deleteMessage)

export { messages_router}