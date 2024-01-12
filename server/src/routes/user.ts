import express, { Request, Response } from "express";
import authenticateToken from "../middleware/authenticationToken";
import { currentUser } from "../controllers/user";

const router = express.Router();

router.get("/:id", authenticateToken, currentUser);

export default router;
