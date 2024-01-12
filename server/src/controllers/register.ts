import UserRegistration, {
	validateUserRegistration,
} from "../models/UserRegistration";
import { Request, Response } from "express";
import _ from "lodash";
import * as bcrypt from "bcrypt";
import "dotenv/config";

export const registerUser = async (req: Request, res: Response) => {
	const saltrounds: number = 10;
	const salt = await bcrypt.genSalt(saltrounds);

	const { error } = validateUserRegistration(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = await UserRegistration.findOne({ email: req.body.email });
	if (user) return res.status(400).send(`User already registered.`);

	user = new UserRegistration(
		_.pick(req.body, ["name", "email", "password"]),
	);

	user.password = await bcrypt.hash(user.password, salt);

	await user.save();

	res.status(201).send("Account successfully created.");
};
