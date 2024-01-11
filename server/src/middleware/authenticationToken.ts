import { NextFunction, Request, Response, request } from "express";
import * as jwt from "jsonwebtoken";
import ReqUser from "../models/ReqUser";

interface DecodedToken{
	_id: string;
	email: string;
	role: string;
}

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
	try {
		const request = req as ReqUser
		const token = request.headers["x-auth-token"] as string;

		if (!token) return res.status(403).send("Forbidden request");

		if (token && token.startsWith("Bearer")) {
			const tokenOnly: string = token.split(" ")[1];

			const decoded = jwt.verify(
				tokenOnly,
				process.env.JWTSECRETKEY as string,
			) as DecodedToken;

			request.user = {_id: decoded._id, email: decoded.email, role: decoded.role} 

			next();
		} else {
			res.status(401).send("Unauthorized");
		}
	} catch (error) {
		res.status(401).json({error: "Unauthorized", message: error});
	}
};

export default authenticateToken;
