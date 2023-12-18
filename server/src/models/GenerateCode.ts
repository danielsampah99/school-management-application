import Joi from "joi";
import mongoose from "mongoose";

export interface IGenerateCode {
	code: string;
}

const generateCode = new mongoose.Schema<IGenerateCode>({
	code: String,
});

const GenerateCode = mongoose.model("GenerateCode", generateCode);

export function validateCode(code: IGenerateCode) {
	const schema = Joi.object({
		code: Joi.string().min(8).max(8),
	});
	return schema.validate(code);
}

export default GenerateCode;
