import mongoose, { Document } from "mongoose";
import UserRegistration from "./UserRegistration";
import Joi from "joi";
import {v4 as uuidv4} from 'uuid'

export interface IStudent extends Document {
	user: mongoose.Schema.Types.ObjectId;
	studentId: string;
	year: string;
	dateRegistered: Date;
	courses: mongoose.Schema.Types.ObjectId[];
}

const studentSchema = new mongoose.Schema<IStudent>({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'UserRegistration',
		unique: true,
	},
	studentId: {
		type: String,
		required: true,
		unique: true,
		default: () => uuidv4().substring(0, 6)
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
			ref: "Course",
		},
	],
});

const Student = mongoose.model<IStudent>("Student", studentSchema);

export const validateStudent = (student: IStudent) => {
	const schema = Joi.object({
		user: Joi.string(),
		studentId: Joi.string().length(6),
		year: Joi.string().required(),
		dateRegistered: Joi.date(),
		courses: Joi.array().required(),
	});

	return schema.validate(student);
};

export default Student;
