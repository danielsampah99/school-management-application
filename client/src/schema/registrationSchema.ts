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
	name: z.string().length(8),
	email: z.string().email(),
	password: z
		.string()
		.min(8)
		.max(15)
		.refine((value) => {
			return value.match(/.*[A-Z].*/) && value.match(/.*\d.*/);
		}),
});

export type RegistrationFormValidationErrors = ZodError<RegistrationFormValues>;
