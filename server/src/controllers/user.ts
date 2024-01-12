import _ from "lodash";
import ReqUser from "../models/ReqUser";
import UserRegistration from "../models/UserRegistration";
import { Request, Response } from "express";

export const currentUser = async (req: Request, res: Response) => {
	try {
		const { email } = (req as ReqUser).params;

		const userDetails = await UserRegistration.findOne(
			{ email: { $eq: email } },
			{ email: 1, name: 1, _id: 0 },
		);

		if (!userDetails) return res.status(400).send("Invalid id.");

		res.status(200).json(_.pick(userDetails, ["name"]));
	} catch (error) {
		res.status(500).send("Internal Eerver Error.");
	}
};
