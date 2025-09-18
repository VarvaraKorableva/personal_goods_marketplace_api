import express from "express";
const users_router = express.Router();
import {
    createUser,
    loginUser,
    getAllUsers,
    getUser,
    deleteUser,
    logoutUser,
    adCountIncrement,
    adCountDecrement,
    updatePassword,
    updateTelegram,
} from "../controllers/users.controllers.js";

users_router.post('/signup', createUser)
users_router.post('/signin', loginUser)
users_router.get('/logout', logoutUser)
  
users_router.get('/', getAllUsers)
users_router.get('/:user_id', getUser)
users_router.delete('/me', deleteUser)

users_router.patch('/adCountIncrement/:user_id', adCountIncrement)
users_router.patch('/adCountDecrement/:user_id', adCountDecrement)

users_router.patch('/updatepassword', updatePassword)
users_router.patch('/updatetelegram', updateTelegram)

export { users_router };