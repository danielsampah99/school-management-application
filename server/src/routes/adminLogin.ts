import express, { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import UserRegistration from "../models/UserRegistration";
import * as _ from "lodash";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
	const user = await UserRegistration.findOne({
		email: req.body.email,
		role: "admin",
	});
	if (!user) return res.status(400).send("Invalid username or password");

	const userPassword = await bcrypt.compare(req.body.password, user.password);
	if (!userPassword)
		return res.status(400).send("Invalid username or password");

	const token = user.generateAuthToken();

	res.header("x-auth-token", token)
		.status(200)
		.json({
			userInfo: _.pick(user, ["email", "name"]),
			message: "Login Successful",
		});
});

export default router;
