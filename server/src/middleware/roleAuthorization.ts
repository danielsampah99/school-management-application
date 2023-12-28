import { NextFunction, Request, Response } from "express";

const roleAuthorization = (role: string) => {
	return (req: Request, res: Response, next: NextFunction) => {
		if (req.body["email"] === role)
			return res.status(401).send("Unathorized");

		next();
	};
};

export default roleAuthorization;
