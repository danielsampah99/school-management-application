import express, { Request, Response } from "express";
import authenticateToken from "../middleware/authenticationToken";
import UserRegistration from "../models/UserRegistration";
import _ from "lodash";
import ReqUser from "../models/ReqUser";

const router = express.Router();

router.get("/:id", authenticateToken, async (req: Request, res: Response) => {
	const { email } = (req as ReqUser).params;

	const userDetails = await UserRegistration.findOne(
		{ email: email },
		{ email: 1, name: 1, _id: 0 },
	);

	if (!userDetails) return res.status(400).send("Invalid id.");

	res.status(200).json(_.pick(userDetails, ["name"]));
});

export default router;
