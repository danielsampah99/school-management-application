import express, { Request, Response } from "express";
import Course, { ICourses, validateCourses } from "../models/Course";
import * as _ from "lodash";
import mongoose from "mongoose";
import rateLimiter from "../middleware/rateLimiter";
import authenticationToken from "../middleware/authenticationToken";

const router = express.Router();

router.get("/", rateLimiter, async (req: Request, res: Response) => {
	try {
		const courses = await Course.find().sort("name");

		const filteredCourses = courses.map((course) =>
			_.pick(course, ["name", "code"]),
		);

		if (!courses || courses.length === 0)
			return res.status(404).json({ message: "No results returned." });

		res.status(200).json(filteredCourses);
	} catch (error) {
		if (error instanceof mongoose.Error.CastError)
			return res.status(501).json(error.message);

		res.status(500).send("Internal Server Error.");
	}
});

router.get("/:id", rateLimiter, async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const course = await Course.findOne({ name: id });

		if (!course) return res.status(404).json(`Course not found.`);

		res.status(200).json(_.pick(course, ["name", "code"]));
	} catch (error) {
		res.status(500).json(`Internal Server Error`);
	}
});

router.post("/", [rateLimiter], async (req: Request, res: Response) => {
	const { error } = validateCourses(req.body);

	if (error) return res.status(404).send(error?.message);

	let course = await Course.findOne({ name: req.body["name"] });
	if (course)
		return res
			.status(400)
			.json(
				`Unable to create the ${req.body["name"]} course as it already exits.`,
			);

	course = await Course.create(_.pick(req.body, ["name", "code"]));

	res.status(201).send(
		`Course with details ${JSON.stringify(req.body)} created successfully.`,
	);
});

router.put("/:id", rateLimiter, async (req: Request, res: Response) => {
	const { id } = req.params;

	const { error } = validateCourses(req.body);
	if (error) {
		res.status(400).json(error.message);
		return;
	}

	const course = await Course.findOneAndUpdate(
		{ name: id },
		_.pick(req.body, ["name", "code"]),
		{ returnOriginal: false },
	);
	if (!course) return res.status(404).json(`${id} is an invalid course.`);

	res.status(201).json(
		`Course ${req.params["id"]} was updated to ${JSON.stringify(
			_.pick<ICourses>(course, ["name"]),
		)}`,
	);
});

router.delete("/:id", rateLimiter, async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const { error } = validateCourses(req.body);
		if (error) res.status(400).json(error.message);

		const course = await Course.findOneAndDelete(
			{ name: id },
			{ name: req.body["name"] },
		);

		if (!course)
			res.status(404).send(`Unable to delete ${req.params["id"]}`);

		res.status(200).json(`Deleted ${req.body.name}...`);
	} catch (error) {}
});

export default router;
