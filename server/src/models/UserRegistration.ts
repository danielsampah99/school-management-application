import mongoose from "mongoose";
import Joi from "joi";
import { joiPasswordExtendCore } from "joi-password";
import * as jwt from "jsonwebtoken";
import "dotenv/config";

export interface IUserRegistrationSchema {
	save(): unknown;
	generateAuthToken(): string;
	name: string;
	email: string;
	password: string;
}

const userRegistrationSchema = new mongoose.Schema<IUserRegistrationSchema>({
	name: {
		type: String,
		unique: true,
		minlength: 8,
		maxlength: 8,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		minlength: 10,
		maxlength: 30,
		required: true,
	},
	password: {
		type: String,
		minlength: 8,
		maxlength: 1024,
		required: true,
	},
});

userRegistrationSchema.methods.generateAuthToken = function () {
	const token: string = jwt.sign(
		{ _id: this._id },
		process.env.JWTSECRETKEY!,
	);
	return token;
};

const UserRegistration = mongoose.model(
	"UserRegistration",
	userRegistrationSchema,
);

export const validateUserRegistration = (user: IUserRegistrationSchema) => {
	const schema = Joi.object({
		name: Joi.string().required().min(8).max(8),
		email: Joi.string()
			.required()
			.min(8)
			.max(255)
			.email({
				minDomainSegments: 2,
				tlds: { allow: ["com", "net", "org"] },
			}),
		password: Joi.extend(joiPasswordExtendCore)
			.string()
			.required()
			.min(8)
			.max(12)
			.lowercase()
			.minOfNumeric(1)
			.pattern(new RegExp("^[a-zA-Z0-9]{8,12}$")),
	});

	return schema.validate(user);
	// returns an object of error and value.
};

export default UserRegistration;
