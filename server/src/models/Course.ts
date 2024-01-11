import Joi from "joi";
import mongoose from "mongoose";

export interface ICourses {
	name: string;
	code: string;
}

const coursesSchema = new mongoose.Schema<ICourses>(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		code: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{ timestamps: true },
);

const Course = mongoose.model("Course", coursesSchema, "courses");

// VALIDATION FUNCTION.
export const validateCourses = (course: ICourses) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		code: Joi.string().required(),
	});

	return schema.validate(course);
};

export default Course;
