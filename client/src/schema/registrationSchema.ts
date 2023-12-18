import { ZodError, z } from "zod";

export interface RegistrationFormValues {
	name: string;
	email: string;
	password: string;
}

export interface RegistrationFormErrors {
	name?: string;
	email?: string;
	password?: string;
}

export const RegistrationSchema = z.object({
	name: z
		.string()
		.max(20, "Full name cannot be more than 30 characters.")
		.min(4, "Name should at least be 4 of lenght 4 characters"),
	email: z.string().email(),
	password: z
		.string()
		.min(8, "password must be atleast 8 characters.")
		.max(15, "password should not be more than 15 characters."),
});

export type RegistrationFormValidationErrors = ZodError<RegistrationFormValues>;
