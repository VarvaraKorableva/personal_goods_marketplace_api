//verifications.js
import express from "express";
//const { auth } = require("../middlewares/utils.js");
const verification_router = express.Router();
import {
    sendVerificationCode,
    verifyCode,
} from "../controllers/verifications.controllers.js";
  

verification_router.get('/verifyCode', verifyCode)
verification_router.post('/sendVerificationCode', sendVerificationCode)


export { verification_router }