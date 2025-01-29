import express from "express";
import { getPosts, getPost, addPost, updatePost, deletePost } from "../controllers/PostController.js";
import VerifyToken from "../Middleware/VerifyToken.js";

const router = express.Router();

// Route to get a list of posts
router.get("/getall", (req, res, next) => {
    // Log query parameters to debug
    console.log("Query parameters received from ThunderClient:", req.query);

    // Proceed to the next middleware (getPosts function)
    next();
}, getPosts);

// Route to get a single post by id
router.get("/find/:id", VerifyToken, getPost);

// Route to create a new post
router.post("/", VerifyToken, addPost);

// Route to update a post by id
router.put("/update/:id", VerifyToken, updatePost);

// Route to delete a post by id
router.delete("/delete/:id", VerifyToken, deletePost);

export default router;