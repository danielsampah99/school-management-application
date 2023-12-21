import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
interface DecodedToken {
	_id: string;
	role: string;
}

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.headers["x-auth-token"] as string;

		if (!token) return res.status(403).send("Forbidden request");

		if (token && token.startsWith("Bearer")) {
			const tokenOnly: string = token.split(" ")[1];

			const decoded = jwt.verify(
				tokenOnly,
				process.env.JWTSECRETKEY as string,
			) as DecodedToken;

			req.params.userId = decoded._id;
			req.params.userRole = decoded.role;

			next();
		} else {
			res.status(401).send("Unauthorized");
		}
	} catch (error) {
		console.log("authentication error: ", error);
		res.status(401).send("Unauthorized");
	}
};

export default authenticateToken;
