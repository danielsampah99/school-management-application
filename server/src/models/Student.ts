import mongoose, { Document } from "mongoose";
import UserRegistration from "./UserRegistration";
import Joi from "joi";

interface IStudent extends Document {
	user: typeof UserRegistration;
	studentId: string;
	year: string;
	dateRegistered: Date;
	courses: mongoose.Types.ObjectId[];
}

const studentSchema = new mongoose.Schema<IStudent>({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'UserRegistration',
		required: true,
		unique: true,
	},
	studentId: {
		type: String,
		required: true,
		unique: true,
	},
	year: {
		type: String,
		required: true,
	},
	dateRegistered: {
		type: Date,
		required: true,
		default: Date.now(),
	},
	courses: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Courses",
		},
	],
});

const Student = mongoose.model<IStudent>("Student", studentSchema);

export const validateStudent = (student: IStudent) => {
	const schema = Joi.object({
		user: Joi.string().hex().length(24),
		studentId: Joi.string().required(),
		year: Joi.string().required(),
		dateRegistered: Joi.date(),
		courses: Joi.array().items(Joi.string().hex().length(24)).required(),
	});

	return schema.validate(student);
};

export default Student;
