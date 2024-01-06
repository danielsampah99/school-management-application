import express, { Request, Response } from "express";
import Course, { ICourses, validateCourses } from "../models/Courses";
import * as _ from "lodash";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
	const courses = await Course.find().sort({ name: 1 });

	if (!courses)
		return res.status(404).json({ message: "No results returned." });
	res.status(200).json(_.pick(courses, ["name", "code"]));
});


router.post("/", async (req: Request, res: Response) => {
	const { error } = validateCourses(req.body);

	if (error) return res.status(404).send(error?.message);

	let course = await Course.findOne({ name: req.body['name'] })
	if (course) return res.status(400).json(`Unable to create the ${req.body['name']} course as it already exits.`)

	console.log('course: ', course);

	course = await Course.create(_.pick(req.body, ["name", "code"]))
	console.log(course);

	res.status(201).send(`Course with details ${JSON.stringify(req.body)} created successfully.`)


});


router.put('/:id', async (req: Request, res: Response) => {

	const { id } = req.params

	const { error } = validateCourses(req.body)
	if (error) {
		console.error(error.message);
		res.status(400).json(error.message)
		return
	}

	const course = await Course.findOneAndUpdate({ name: id }, _.pick(req.body, ['name', 'code']), { returnOriginal: false })
	if (!course) return res.status(404).json(`${id} is an invalid course.`)

	res.status(201).json(`Course ${req.params['id']} was updated to ${JSON.stringify(_.pick<ICourses>(course, ['name']))}`)
})


router.delete('/:id',async (req:Request, res: Response) => {
	try {
		const {id} = req.params

		const {error} = validateCourses(req.body)
		if (error) res.status(400).json(error.message)

		const course = await Course.findOneAndDelete({name: id}, {name: req.body['name']})

		if (!course) res.status(404).send(`Unable to delete ${req.params['id']}`)

		res.status(200).json(`Deleted ${req.body.name}...`)


	} catch (error) {
		
	}
})



export default router;


