import express from "express";
import rateLimiter from "../middleware/rateLimiter";
import * as _ from "lodash";
import authenticationToken from "../middleware/authenticationToken";
import {
	createOneStudent,
	deleteOneStudent,
	getAllStudents,
	getOneStudent,
	updateOneStudent,
} from "../controllers/students";

const router = express.Router();

router.get("/", rateLimiter, getAllStudents);

router.get("/:id", rateLimiter, getOneStudent);

router.post("/", [rateLimiter, authenticationToken], createOneStudent);

router.put("/:id", [rateLimiter, authenticationToken], updateOneStudent);

router.delete("/:id", [rateLimiter, authenticationToken], deleteOneStudent);

export default router;
