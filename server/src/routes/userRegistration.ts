import express, { Request, Response } from "express";
import UserRegistration, {
	IUserRegistrationSchema,
	validateUserRegistration,
} from "../models/UserRegistration";
import _ from "lodash";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import "dotenv/config";

const route = express.Router();

route.post("/", async (req: Request, res: Response) => {
	const saltrounds: number = 10;
	const salt = await bcrypt.genSalt(saltrounds);
	const jwtSecretKey: string | undefined = process.env.JWTSECRETKEY;

	const { error } = validateUserRegistration(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = await UserRegistration.findOne({ email: req.body.email });
	if (user) return res.status(400).send(`User already registered.`);

	// TODO: change name to unique code.
	// user = await UserRegistration.findOne({ name: req.body.name });
	// if (!user) return res.status(400).send(`Invalid name submitted`);

	user = new UserRegistration(
		_.pick(req.body, ["name", "email", "password", "_id"]),
	);

	user.password = await bcrypt.hash(user.password, salt);

	await user.save();

	const token: string = user.generateAuthToken();

	res.header("x-auth-token", token).send(
		_.pick<IUserRegistrationSchema>(user, ["name", "email", "_id"]),
	);
});

export default route;
