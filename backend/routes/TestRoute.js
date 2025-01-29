import express from "express";
import { shouldBeAdmin, shouldBeLoggedIn } from "../controllers/TestController.js";
import { VerifyToken } from "../Middleware/VerifyToken.js";

const router = express.Router();

router.get("/should-be-logged-in",VerifyToken, shouldBeLoggedIn);

router.get("/should-be-admin", shouldBeAdmin);

export default router;