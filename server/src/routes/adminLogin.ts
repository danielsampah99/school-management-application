import express, { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import UserRegistration from "../models/UserRegistration";
import * as _ from "lodash";
import rateLimiter from "../middleware/rateLimiter";

const router = express.Router();

router.post("/", rateLimiter);

export default router;
