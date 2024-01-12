import express, { Request, Response } from "express";
import Student, { IStudent, validateStudent } from "../models/Student";
import * as _ from "lodash";
import mongoose, { mongo } from "mongoose";
import ReqUser from "../models/ReqUser";
import Course from "../models/Course";

const router = express.Router();

export const getAllStudents = async (req: Request, res: Response) => {
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
				createdAt: 1,
				updatedAt: 1,
			},
		)
			.populate("user", { email: 1, name: 1, _id: 0 })
			.populate("courses", { name: 1, code: 1, _id: 0 });

		if (!students || students.length === 0) {
			res.status(404).send(`Students not found`);
			return;
		}

		res.status(200).json(students);
	} catch (error) {
		if (error instanceof mongoose.Error.MissingSchemaError)
			return res.status(500).json(error.message);

		res.status(500).send(`Internal Server Error.`);
	}
};

export const getOneStudent = async (req: Request, res: Response) => {
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
			},
		)
			.populate("user", { name: 1, email: 1, _id: 0 })
			.populate("courses", { name: 1, code: 1, _id: 0 });

		if (!student || student.length === 0) {
			res.status(404).send(
				`The requested Student does not exist but may be available again in the future. 
				Subsequent requests are permissible.`,
			);
			return;
		}

		res.status(200).json(student);
	} catch (error) {
		if (error instanceof mongoose.Error) {
			res.status(500).send(error.message);

			return;
		}

		res.status(500).send(`Internal Server Error.`);
	}
};

export const createOneStudent = async (req: Request, res: Response) => {
	try {
		const { user } = req as ReqUser;
		const requestBody: IStudent = { user: user._id, ...req.body };

		let coursesArray = requestBody.courses;

		coursesArray = await Course.find(
			{ name: { $in: coursesArray } },
			{ _id: 1, name: 0, code: 0, __v: 0 },
		).lean();

		requestBody.courses = coursesArray;

		const { error } = validateStudent(requestBody);

		if (error) {
			res.status(400).json(error.message);
			return;
		}

		let student = await Student.findOne({ user: user._id })
			.select(["studentId"])
			.populate("user", "name")
			.lean();

		if (student) {
			res.status(400).send(`Student exists.`);
			return;
		}

		await Student.create(requestBody);

		res.status(201).send(`Created successfully`);
	} catch (error) {
		if (error instanceof mongo.MongoServerError) {
			res.status(500).json({ Error: error.name });
			return;
		}

		if (error instanceof mongoose.Error.ValidationError) {
			res.status(400).json({
				"Error Name": error.name,
				"Error Message": error.message,
			});
			return;
		}

		res.status(500).send("Internal server Error.");
	}
};

export const updateOneStudent = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const request = req as ReqUser;
		const requestStudent: IStudent = {
			user: request.user._id,
			...req.body,
		};

		let courses = requestStudent.courses;
		courses = await Course.find({ name: { $in: courses } })
			.select("_id")
			.lean();
		requestStudent.courses = courses;

		if (id !== request.user.email)
			return res.status(404).json({ message: "Forbidden" });

		const { error } = validateStudent(requestStudent);

		if (error) {
			res.status(400).json({ error: error.message });
			return;
		}

		const student = await Student.findOneAndUpdate(
			{ user: { $eq: request.user._id } },
			requestStudent,
			{
				returnOriginal: false,
			},
		);

		if (!student) return res.status(404).send(`Student does not exist.`);

		res.status(200).json({
			message: "Successfully updated Student's details",
			data: _.pick(student, [
				"year",
				"dateRegistered",
				"studentId",
				"updatedAt",
			]),
		});
	} catch (error) {
		res.status(500).send(`Internal Server Error`);
	}
};

export const deleteOneStudent = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const request = req as ReqUser;

		if (id !== request.user.email) return res.status(401).send("Forbidden");

		const { error } = validateStudent(req.body);

		if (error) {
			res.status(400).json({ "Error: ": error.details[0].message });
		}

		const student = await Student.findOneAndDelete(
			{ user: { $eq: request.user._id } },
			{ includeResultMetadata: true },
		);

		if (!student) {
			res.status(404).send(`Student not found.`);
			return;
		}

		res.status(200).send(`Student successfully deleted`);
	} catch (error) {
		res.status(500).send(`Internal Server Error.`);
	}
};

export default router;
