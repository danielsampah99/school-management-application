import express from "express";
import * as _ from "lodash";
import rateLimiter from "../middleware/rateLimiter";
import {
	createOneCoures,
	deleteOneCourse,
	getAllCourses,
	getOneCourse,
	updateOneCourse,
} from "../controllers/courses";

const router = express.Router();

router.get("/", rateLimiter, getAllCourses);

router.get("/:id", rateLimiter, getOneCourse);

router.post("/", [rateLimiter], createOneCoures);

router.put("/:id", rateLimiter, updateOneCourse);

router.delete("/:id", rateLimiter, deleteOneCourse);

export default router;
