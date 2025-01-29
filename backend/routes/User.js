import express from "express";
import { getUsers,updateUser,deleteUser ,savePost,profilePosts,getNotificationNum} from "../controllers/UserController.js";
import {VerifyToken} from "../Middleware/VerifyToken.js"

const router = express.Router();

router.get("/", getUsers);
// router.get("/:id",VerifyToken, getUser);
router.put("/:id",VerifyToken, updateUser);
router.delete("/:id", VerifyToken,deleteUser);
router.post("/save",savePost);
router.get("/profilePosts", VerifyToken,profilePosts);
router.get("/notification", VerifyToken,getNotificationNum);


export default router;