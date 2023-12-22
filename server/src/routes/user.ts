import express, { Request, Response } from "express";
import authenticateToken from "../middleware/authenticationToken";
import UserRegistration, {
	IUserRegistrationSchema,
} from "../models/UserRegistration";
import _ from "lodash";

const router = express.Router();

router.get("/:id", authenticateToken, async (req: Request, res: Response) => {
	const userId = req.params.userId;
	const id = req.params.userId;

	const userDetails: IUserRegistrationSchema | null =
		await UserRegistration.findById(userId);
	if (!userDetails) return res.status(400).send("Invalid id.");

	res.status(200).json(_.pick(userDetails, ["id", "name", "email"]));
});

export default router;
