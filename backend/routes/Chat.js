import express from "express";
import {
    getChats,getChat,addChat,readChat
} from "../controllers/ChatController.js";
import VerifyToken from "../Middleware/VerifyToken.js";

const router =express.Router()

router.get("/",VerifyToken,getChats),
router.get("/:id",VerifyToken,getChat),
router.post("/:id",VerifyToken,addChat),
router.post("/read/:id",VerifyToken,readChat)


export default router;
