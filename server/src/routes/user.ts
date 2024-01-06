import express, { Request, Response } from "express";
import authenticateToken from "../middleware/authenticationToken";
import UserRegistration from "../models/UserRegistration";
import _ from "lodash";

const router = express.Router();

router.get("/:id", authenticateToken, async (req: Request, res: Response) => {
	const email = req.params.id;

	const userDetails = await UserRegistration.findOne(
		{ email: req.params.email },
		{ email: 1, name: 1, _id: 0 },
	);

	if (!userDetails) return res.status(400).send("Invalid id.");

	res.status(200).json(_.pick(userDetails, ["name"]));
});

export default router;
