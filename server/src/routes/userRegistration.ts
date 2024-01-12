import express from "express";
import "dotenv/config";
import rateLimiter from "../middleware/rateLimiter";
import { registerUser } from "../controllers/register";

const route = express.Router();

route.post("/", rateLimiter, registerUser);

export default route;
