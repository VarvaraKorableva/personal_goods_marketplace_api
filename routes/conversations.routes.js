import express from "express";

const conversations_router = express.Router();

import {
    createConversation,
    //getAllUserConversations,
    //getLastMessagesForUser,
    deleteConversation,
//} from "../controllers/favoriteItems.controllers.js";
} from "../controllers/conversations.controllers.js";

conversations_router.post('/create_conversation', createConversation)
//conversations_router.get('/get_all_user_conversations/:user_id', getAllUserConversations)
conversations_router.patch('/deleteConversation', deleteConversation)


export { conversations_router } 