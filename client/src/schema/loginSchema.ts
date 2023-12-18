import { ZodError, z } from "zod";

export interface LoginFormValues {
	email: string;
	password: string;
}

export interface LoginFormErrors {
	email?: string;
	password?: string;
}

export const loginSchema = z.object({
	email: z.string().email("Email must be a valid email address"),
	password: z
		.string()
		.min(8, "Password must have a minimun of 8 characters.")
		.max(12, "Password should not be more than 12 characters."),
});

export type LoginFormValidationErrors = ZodError<LoginFormValues>;
