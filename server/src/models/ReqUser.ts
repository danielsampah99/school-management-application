import { Request } from "express";

interface ReqUser extends Request {
	user: IUser;
}

interface IUser {
	_id: string;
	email: string;
	role: string;
}

export type IUserLoginSchema = {
	email: string;
	password: string;
}

export default ReqUser