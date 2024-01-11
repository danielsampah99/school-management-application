import express, { Request, Response } from "express";
import rateLimiter from "../middleware/rateLimiter";
import Student, { IStudent, validateStudent } from "../models/Student";
import * as _ from "lodash";
import mongoose, { MongooseError, mongo } from "mongoose";
import authenticationToken from '../middleware/authenticationToken'
import ReqUser from "../models/ReqUser";
import Course from "../models/Course";
import UserRegistration from "../models/UserRegistration";

const router = express.Router();

router.get("/", rateLimiter, async (req: Request, res: Response) => {
	try {
		const students: IStudent[] = await Student.find(
			{},
			{
				_id: 0,
				user: 1,
				studentId: 1,
				dateRegistered: 1,
				year: 1,
				courses: 1,
			}
		)
			.populate("user", { email: 1, name: 1, _id: 0 })
			.populate("courses", { name: 1, code: 1, _id: 0 });

		if (!students || students.length === 0) {
			res.status(404).send(`Students not found`);
			return;
		}
		console.log(students);

		res.status(200).json(students);
	} catch (error) {
		if (error instanceof mongoose.Error.MissingSchemaError)
			return res.status(500).json(error.message);

		console.error(error);
		res.status(500).send(`Internal Server Error.`);
	}
});

router.get("/:id", rateLimiter, async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const student: IStudent[] = await Student.find(
			{ studentId: id },
			{
				_id: 0,
				user: 1,
				studentId: 1,
				year: 1,
				dateRegistered: 1,
				courses: 1,
			}
		)
			.populate("user", { name: 1, email: 1, _id: 0 })
			.populate("courses", { name: 1, code: 1, _id: 0 });

		if (!student || student.length === 0) {
			res.status(404).send(
				`The requested Student could not be found but may be available again in the future. Subsequent requests are permissible.`
			);
			return;
		}

		res.status(200).json(student);
	} catch (error) {
		if (error instanceof mongoose.Error) {
			console.error("Error Message: ", error.message);
			console.error("Error Name: ", error.name);
			res.status(500).send(error.message);

			return;
		}
		console.error(error);

		res.status(500).send(`Internal Server Error.`);
	}
});

router.post("/", [rateLimiter, authenticationToken], async (req: Request, res: Response) => {
	try {

		const { user } = (req as ReqUser)
		const requestBody: IStudent = { user: user._id, ...req.body }

		let coursesArray = requestBody.courses

		coursesArray = await Course.find({ name: { $in: coursesArray } }, { _id: 1, name: 0, code: 0, __v: 0 }).lean()

		requestBody.courses = coursesArray

		const { error } = validateStudent(requestBody);

		if (error) {
			console.error(error.message);
			res.status(400).json(error.message);
			return;
		}

		let student = await UserRegistration.findById(requestBody.user).select(['name', '-_id']);

		if (student) {
			console.error(`Unable to create student`);
			res.status(400).send(`Student exists.`);
			return;
		}

		await Student.create(requestBody);

		res.status(201).send(`Created successfully`);
	} catch (error) {

		if (error instanceof mongo.MongoServerError) {
			res.status(500).json({ 'Error':  error.name })
			return
		}

		console.error(error);
		res.status(500).send(error);
	}
});

router.put("/:id", rateLimiter, async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const {user} = (req as ReqUser).params

		console.log('id: ', id);
		console.log('params user: ', user);
		
		

		const { error } = validateStudent(req.body);

		if (error) {
			console.error("Error Message: ", error.details[0].message);
			console.error("Error message: ", error.message);

			res.status(400).json({ error: error.message });
			return;
		}

		const student = await Student.findOneAndUpdate({ user: id }, req.body, {
			returnOriginal: false,
		});

		if (!student) return res.status(404).send(`Student does not exist.`);

		res.status(200).json({
			message: "Successfully updated Student's details",
			data: student,
		});
	} catch (error) {
		console.error(error);
		res.status(500).send(`Internal Server Error`);
	}
});

router.delete("/:id", rateLimiter, async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const { error } = validateStudent(req.body);

		if (error) {
			console.error(error.message);
			res.status(400).json({ "Error: ": error.details[0].message });
		}

		const student = await Student.findOneAndDelete(
			{ user: id },
			{ includeResultMetadata: true }
		);

		if (!student) {
			res.status(404).send(`Student not found.`);
			return;
		}

		res.status(200).send(`Student successfully deleted`);
	} catch (error) {
		console.error(error);

		res.status(500).send(`Internal Server Error.`);
	}
});

export default router;
