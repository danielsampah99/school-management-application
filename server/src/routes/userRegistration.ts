import express, { Request, Response } from "express";
import UserRegistration, {
	IUserRegistrationSchema,
	validateUserRegistration,
} from "../models/UserRegistration";
import _ from "lodash";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import "dotenv/config";
import rateLimiter from "../middleware/rateLimiter";

const route = express.Router();

route.post("/", rateLimiter, async (req: Request, res: Response) => {
	const saltrounds: number = 10;
	const salt = await bcrypt.genSalt(saltrounds);

	const { error } = validateUserRegistration(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = await UserRegistration.findOne({ email: req.body.email });
	if (user) return res.status(400).send(`User already registered.`);

	user = new UserRegistration(
		_.pick(req.body, ["name", "email", "password",]),
	);

	user.password = await bcrypt.hash(user.password, salt);

	await user.save();

	// res.status(201).send(_.pick<IUserRegistrationSchema>(user, ["email"]));
	res.status(201).json(
		"Account successfully created. Kindly proceed to login.",
	);
});

export default route;
