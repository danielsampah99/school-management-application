import express from "express";
import rateLimiter from "../middleware/rateLimiter";
import { signIn } from "../controllers/signIn";

const router = express.Router();

router.post("/", rateLimiter, signIn);

export default router;
