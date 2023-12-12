import express, { Request, Response } from "express";
import Joi from "joi";
import { joiPasswordExtendCore } from "joi-password";
import { IUserLoginSchema } from "../models/UserLogin";
import UserRegistration from "../models/UserRegistration";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import "dotenv/config";
import _ from "lodash";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
	const jwtSecretKey: string | undefined = process.env.JWTSECRETKEY;
	const { error } = validateUserLogin(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = await UserRegistration.findOne({ email: req.body.email });
	if (!user) return res.status(400).send(`Invalid username or password.`);

	const result = await bcrypt.compare(req.body.password, user.password);
	if (!result) return res.status(400).send(`Invalid username or password.`);

	const token = user.generateAuthToken();

	res.header("x-auth-token", token).send(_.pick(user, ["id", "name"]));
});

export const validateUserLogin = (user: IUserLoginSchema) => {
	const schema = Joi.object({
		email: Joi.string()
			.required()
			.min(8)
			.max(255)
			.email({
				minDomainSegments: 2,
				tlds: { allow: ["net", "com", "org"] },
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
};

export default router;
