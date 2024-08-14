import express from "express";

const conversations_router = express.Router();

import {
    createConversation,
    getAllUserConversations,
    //getLastMessagesForUser,
    //deleteConversationById,
//} from "../controllers/favoriteItems.controllers.js";
} from "../controllers/conversations.controllers.js";

conversations_router.post('/create_conversation', createConversation)
conversations_router.get('/get_all_user_conversations/:user_id', getAllUserConversations)
//conversations_router.get('/getLastMessagesForUser/:user_id', getLastMessagesForUser)


export { conversations_router } 