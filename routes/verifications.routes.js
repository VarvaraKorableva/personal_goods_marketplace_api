import express from "express";
import {
    sendVerificationCode,
    verifyCode,
} from "../controllers/verifications.controllers.js";
  
const verification_router = express.Router();

verification_router.post('/verifyCode', verifyCode) //сравнение кода
verification_router.post('/sendVerificationCode', sendVerificationCode)

export { verification_router }
