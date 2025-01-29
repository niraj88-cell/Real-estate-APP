import express from "express";
import {
    addMessage
} from "../controllers/MessageController.js";
import VerifyToken from "../Middleware/VerifyToken.js";

const router =express.Router()
router.post("/:id",VerifyToken,addMessage);
export default router;
