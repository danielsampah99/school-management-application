import express, { Request, Response } from "express";
import rateLimiter from "../middleware/rateLimiter";
import Student, { validateStudent } from "../models/Student";
import * as _ from 'lodash'
import mongoose from "mongoose";

const router = express.Router()

router.get('/', rateLimiter, async (req: Request, res: Response) => {

	try {
		const students = await Student.find()


		if (!students || students.length === 0) {
			res.status(404).send(`Students not found`)
			return
		}
		console.dir(students)

		const filteredStudents = students.map((student) => _.pick(student, ['studentId', 'year']))
		res.status(200).json(filteredStudents)
	} catch (error) {
		console.error(error);
		res.status(500).send(`Internal Server Error.`)
	}
})

router.get('/:id', rateLimiter, async (req: Request, res: Response) => {
	try {
		const { id } = req.params

		const student = await Student.find({ studentId: id })

		if (!student || student.length === 0) {
			res.status(404).send(`Student not found`)
			return
		}

		res.status(200).json(student)
	} catch (error) {
		if (error instanceof mongoose.Error) {
			console.error('Error Message: ', error.message)
			console.error('Error Name: ', error.name);
			res.status(500).send(error.message)

			return
		}
		console.error(error);

		res.status(500).send(`Internal Server Error.`)
	}

})

router.post('/', rateLimiter,async (req:Request, res: Response) => {
	const { error } = validateStudent(req.body)

	if (error) {
		console.error(error.message)
		res.status(400).json(error.message)
		return
	}

	let student = await Student.findOne({studentId: req.body['studentId']})

	if (student) {
		console.error(`Unable to create student`)
		res.status(400).send(`Student exists.`)
		return
	}

	student = await Student.create(req.body)

	res.status(201).send(`Created successfully`)
})



export default router