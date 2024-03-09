import { ZodError, z } from "zod";

export interface StudentProfileFormValues {
	personalInfo: PersonalInformation;
	academicInfo: AcademicInformation;
	guardianInfo: GuardianInformation;
	medicalInfo: MedicalInformation;
	uploads: Uploads;
}

interface PersonalInformation {
	firstName: string;
	middleName: string;
	lastName: string;
	dateOfBirth: Date;
	gender: GenderEnum;
	phone: number | string;
	country: string;
	region: string;
	street: string;
}

enum GenderEnum {
	male = 'male',
	female = 'female'
}

interface AcademicInformation {
	grade: string;
	previousSchool: string;
	courses: string[];
}

interface GuardianInformation {
	guardianName: string;
	relationshipWithGuardian: string;
	guardianEmail: string;
	guardianNumber: number | string;
}

interface MedicalInformation {
	allergies?: string[]
}

interface Uploads {
	studentPhoto?: File;
	guardianId?: File;
}

export type StudentProfileFormErrors = {
	firstName: string;
	middleName: string;
	lastName: string;
	dateOfBirth: Date;
	gender: string;
	country: string;
	region: string;
	street: string;
	academicInfo: AcademicInformation;
	guardianInfo: GuardianInformation;
	medicalInfo: MedicalInformation;
	uploads: Uploads;
};

export type StudentProfileFormValidationErrors =
	ZodError<StudentProfileFormErrors>;

export const StudentProfileSchema = z.object({
	firstName: z.string({ required_error: 'First name field is required.' }),
	middleName: z.string({ required_error: 'Middle Name name field is required.' }),
	lastName: z.string({ required_error: 'Last name field is required.' }),
	dateOfBirth: z.string(),
	gender: z.string({ required_error: 'Gender is required' }),
	phone: z.string({ required_error: 'Your phone number is required.' }),
	country: z.string(),
	region: z.string().min(1, "region is required."),
	street: z.string().min(1, "Street name is required."),
	grade: z.string({ invalid_type_error: 'Year or grade must be a string', required_error: 'Your grade is required.' }),
	previousSchool: z.string({ required_error: 'Name of previous School is required.' }),
	courses: z.array(z.string()).min(4, 'Total of 8 Courses required. 4 Core and 4 Elective Courses'),
	guardianName: z.string({ required_error: 'Kindly enter the full name of your guardian.' }),
	guardianEmail: z.string({ required_error: 'Email of guardian is required.' }).email(),
	guardianNumber: z.string({ required_error: 'Phone number of guardian is required.' }),
	relationshipWithGuardian: z.string(), 
	allergies: z.string(), 
	studentPhoto: z.any()
});
