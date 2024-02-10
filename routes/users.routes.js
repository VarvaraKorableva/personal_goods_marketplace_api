import express from "express";
const users_router = express.Router();
import {
    createUser,
    loginUser,
    getAllUsers,
    getUser,
    deleteUser,
} from "../controllers/users.controllers.js";

users_router.post('/signup', createUser)
users_router.post('/signin', loginUser)
  
users_router.get('/', getAllUsers)
users_router.get('/:user_id', getUser)
users_router.delete('/me', deleteUser)

export { users_router };