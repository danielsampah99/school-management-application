import { z } from "zod";
import { StudentProfileSchema } from "../../schema/studentProfile";
import { Fragment, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput, { isPossiblePhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import IconWrapper from "../IconWrapper";
import apiClient from "../../services/apiClient";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { Listbox, Transition } from "@headlessui/react";
import {
	ChevronUpDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from "@heroicons/react/20/solid";

type Inputs = z.infer<typeof StudentProfileSchema>;

type FieldName = keyof Inputs;

type Steps = {
	id: number;
	name: string;
	fields?: string[];
};

type Courses = {
	name: string;
	code: string;
};

type Genders = string[];

const steps: Steps[] = [
	{
		id: 1,
		name: "Personal Information",
		fields: [
			"firstName",
			"lastName",
			"middleName",
			"dateOfBirth",
			"gender",
			"phone",
			"country",
			"region",
			"street",
		],
	},
	{
		id: 2,
		name: "Academic Information",
		fields: ["grade", "previousSchool", "courses"],
	},
	{
		id: 3,
		name: "Guardian Information",
		fields: [
			"guardianName",
			"relationshipWithGuardian",
			"guardianEmail",
			"guardianNumber",
		],
	},
	{
		id: 4,
		name: "Medical Information",
		fields: ["Medical Summary"],
	},
	{ id: 5, name: "Upload", fields: ["studentPhoto"] },
	{ id: 6, name: "Complete" },
];

const Profile = () => {
	const [previousStep, setPreviousStep] = useState<number>(0);
	const [currentStep, setCurrentStep] = useState<number>(0);
	const [coursesData, setCoursesData] = useState<Courses[]>();

	useEffect(() => {
		const getAllCourses = async () => {
			try {
				const results = await apiClient.get<Courses[]>("api/courses");
				setCoursesData(results.data);
			} catch (error) {
				if (error instanceof AxiosError) {
					console.error("Error Message: ", error.message);
					toast.error(error.message);

					if (error.response)
						return console.error(
							"Error Response: ",
							error.response.data,
						);

					if (error.request)
						return console.error("Error Request: ", error.request);

					return;
				}

				console.log(error);
			}
		};
		getAllCourses();
	}, []);

	const {
		register,
		handleSubmit,
		watch,
		trigger,
		control,
		setValue,
		formState: { errors },
	} = useForm<Inputs>({ resolver: zodResolver(StudentProfileSchema) });

	const next = async () => {
		const fields = steps[currentStep].fields;
		const output = await trigger(fields as FieldName[], {
			shouldFocus: true,
		});

		if (!output) return;

		if (currentStep < steps.length - 1) {
			if (currentStep === steps.length - 2)
				await handleSubmit(onSubmit)()
		}
		setPreviousStep(currentStep);
		setCurrentStep((step) => step + 1);
	};

	const previous = () => {
		if (currentStep > 0) {
			setCurrentStep(previousStep);
			setPreviousStep((step) => step - 1);
		}
	};

	const onSubmit = (data: Inputs) => {
		setValue('studentPhoto', `${data.firstName}_${data.lastName}profileimage.png`)
		console.log('Data: ', data)
		console.log('Errors: ', errors)
	}

	const guardians: { name: string }[] = [
		{ name: "Parent" },
		{ name: "Uncle or Aunt" },
		{ name: "GrandParent" },
		{ name: "Sibling" },
	];

	const genders: Genders = ["Male", "Female"];

	return (
		<section className="flex h-full w-full flex-col justify-between p-12 dark:bg-gray-900">
			<nav aria-label="Progress">
				<ol
					role="list"
					className="sm:space-y-4 md:flex md:space-x-8 md:space-y-0"
				>
					{steps.map((step, index) => (
						<li key={step.id} className="md:flex-1">
							{currentStep > index ? (
								<div className="flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
									<span className="text-sm font-medium text-sky-600 transition-colors">
										{step.name}
									</span>
								</div>
							) : currentStep === index ? (
								<div
									aria-current="step"
									className="className='flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
								>
									<span className="text-sm font-medium text-sky-600 transition-colors">
										{step.name}
									</span>
								</div>
							) : (
								<div className="flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
									<span className="text-sm font-medium text-gray-500 transition-colors">
										{step.name}
									</span>
								</div>
							)}
						</li>
					))}
				</ol>
			</nav>

			<form className="pt-10 " onSubmit={handleSubmit(onSubmit)}>
				{currentStep === 0 && (
					<>
						<div className=" transition-transform duration-300">
							<h2 className="text-center font-semibold text-gray-900 dark:text-gray-300 sm:text-lg lg:text-xl">
								Personal Information
							</h2>
							<div className="grid grid-cols-6 gap-6 lg:mt-8">
								<div className="col-span-6 md:col-span-3 lg:col-span-2">
									<label
										className="block text-sm font-medium text-gray-900 dark:text-gray-200 md:text-base"
										htmlFor="firstName"
										aria-label="first name"
									>
										First Name
									</label>
									<input
										type="text"
										id="firstName"
										aria-autocomplete="inline"
										autoComplete="given-name"
										{...register("firstName")}
										placeholder="First Name"
										className="dark:border-700  form-input mt-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-900 shadow-sm placeholder:text-gray-400 hover:placeholder:italic dark:bg-gray-800 dark:placeholder:text-gray-300"
									/>
									{errors.firstName?.message && (
										<p className="mt-2 text-sm text-red-400">
											{errors.firstName.message}
										</p>
									)}
								</div>

								<div className="col-span-6 md:col-span-3 lg:col-span-2">
									<label
										className="block text-sm font-medium text-gray-900 dark:text-gray-200 md:text-base"
										htmlFor="middleName"
										aria-label="middle name"
									>
										Middle Name
									</label>
									<input
										type="text"
										id="middleName"
										aria-autocomplete="inline"
										autoComplete="additional-name"
										{...register("middleName")}
										placeholder="Middle Name"
										className="dark:border-700  form-input mt-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-900 shadow-sm placeholder:text-gray-400 hover:placeholder:italic dark:bg-gray-800 dark:placeholder:text-gray-300"
									/>
									{errors.middleName?.message && (
										<p className="mt-2 text-sm text-red-400">
											{errors.middleName.message}
										</p>
									)}
								</div>

								<div className="col-span-6 lg:col-span-2">
									<label
										className="block text-sm font-medium text-gray-900 dark:text-gray-200 md:text-base"
										htmlFor="lastName"
										aria-label="first name"
									>
										Last Name
									</label>
									<input
										type="text"
										id="lastName"
										aria-autocomplete="inline"
										autoComplete="family-name"
										{...register("lastName")}
										placeholder="Last Name"
										className="form-input  mt-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-900 shadow-sm placeholder:text-gray-400 hover:placeholder:italic dark:border-gray-700 dark:bg-gray-800 dark:placeholder:text-gray-300"
									/>
									{errors.lastName?.message && (
										<p className="mt-2 text-sm text-red-400">
											{errors.lastName.message}
										</p>
									)}
								</div>

								<div className="col-span-6 sm:col-span-3">
									<label
										className="block text-sm font-medium text-gray-900 dark:text-gray-200 md:text-base"
										htmlFor="dateOfBirth"
										aria-label="first name"
									>
										Date of Birth
									</label>
									<input
										type="date"
										id="dateOfBirth"
										aria-autocomplete="inline"
										autoComplete="bday"
										{...register("dateOfBirth")}
										placeholder="Date of Birth"
										className="mt-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-400 shadow-sm hover:placeholder:italic dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
									/>
									{errors.dateOfBirth?.message && (
										<p className="mt-2 text-sm text-red-400">
											{errors.dateOfBirth.message}
										</p>
									)}
								</div>

								<div className="col-span-6 w-full sm:col-span-3">
									<label
										htmlFor="gender"
										className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
									>
										Gender
									</label>
									<select
										id="gender"
										{...register("gender")}
										autoComplete="sex"
										defaultValue={"Male"}
										className="form-select w-full rounded-md border border-gray-200 text-sm text-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
									>
										{genders.map((gender, genderIndex) => (
											<option
												key={genderIndex}
												value={gender}
												className={
													"m-1 p-1 hover:mx-1 hover:rounded-md hover:bg-blue-500 hover:text-gray-200 focus:mx-1 focus:rounded-md focus:bg-sky-500 focus:text-white focus:ring-transparent active:rounded-md active:bg-amber-700 active:text-white/75 ui-open:bg-amber-800 ui-active:bg-sky-500"
												}
											>
												{gender}
											</option>
										))}
									</select>
								</div>

								<div className="col-span-6 lg:col-span-3 ">
									<label
										className="block text-sm font-medium text-gray-900 dark:text-gray-200 md:text-base"
										htmlFor="phone"
										aria-label="phone number"
									>
										Phone Number
									</label>

									<Controller
										control={control}
										name="phone"
										rules={{
											validate: (value) =>
												isPossiblePhoneNumber(
													`${value}`,
												),
										}}
										render={({
											field: { onChange, value },
										}) => (
											<PhoneInput
												onChange={onChange}
												value={value}
												id="phone"
												defaultCountry="GH"
												numberInputProps={{
													className:
														"dark:border-700 mt-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-400 shadow-sm hover:placeholder:italic dark:bg-gray-800 dark:text-gray-300",
												}}
											/>
										)}
									/>
									{errors.phone?.message && (
										<p className="mt-2 text-sm text-red-400">
											{errors.phone.message}
										</p>
									)}
								</div>

								<div className="col-span-6 md:col-span-3 lg:col-span-1">
									<label
										htmlFor="country"
										aria-label="country"
										className="block text-sm font-medium text-gray-900 dark:text-gray-200 md:text-base"
									>
										Country
									</label>
									<Controller
										control={control}
										name="country"
										render={({ field }) => (
											<CountryDropdown
												{...field}
												showDefaultOption={true}
												id="country"
												classes="mt-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-500 shadow-sm hover:placeholder:italic dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
											/>
										)}
									/>
									{errors.country?.message && (
										<p className="mt-2 text-sm text-red-400">
											{errors.country.message}
										</p>
									)}
								</div>

								<div className="col-span-6 md:col-span-3 lg:col-span-2">
									<label
										htmlFor="region"
										aria-label="region"
										className="block text-sm font-medium text-gray-900 dark:text-gray-200 md:text-base"
									>
										Region
									</label>
									<Controller
										control={control}
										name="region"
										render={({ field }) => (
											<RegionDropdown
												{...field}
												country={
													watch("country") || "Ghana"
												}
												id="region"
												classes="mt-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-500 shadow-sm hover:placeholder:italic dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
											/>
										)}
									/>
									{errors.region?.message && (
										<p className="mt-2 text-sm text-red-400">
											{errors.region.message}
										</p>
									)}
								</div>

								<div className="col-span-6">
									<label
										htmlFor="address"
										aria-label="address"
										className="block text-sm font-medium text-gray-900 dark:text-gray-200 md:text-base"
									>
										Address
									</label>
									<input
										type="text"
										id="address"
										aria-autocomplete="inline"
										autoComplete="street-address"
										{...register("street")}
										placeholder="Street address"
										className="mt-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-400 shadow-sm hover:placeholder:italic dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
									/>
									{errors.dateOfBirth?.message && (
										<p className="mt-2 text-sm text-red-400">
											{errors.dateOfBirth.message}
										</p>
									)}
								</div>
							</div>
						</div>
					</>
				)}

				{currentStep === 1 && (
					<div className="transition-transform duration-300">
						<h2 className="mb-4 text-center font-semibold text-gray-900 dark:text-gray-300 sm:text-lg lg:text-xl">
							Academic Information
						</h2>
						<div className="grid grid-cols-6 gap-6 lg:mt-8">
							<div className="col-span-6 md:col-span-2 lg:col-span-2">
								<label
									className="block text-sm font-medium text-gray-900 dark:text-gray-200 md:text-base"
									htmlFor="grade"
									aria-label="year or grade"
								>
									Grade
								</label>
								<select
									id="grade"
									{...register("grade")}
									className="mt-2 w-full rounded-md border border-gray-200 text-sm text-gray-800 shadow-sm hover:italic focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
								>
									<option value={"first"}>First</option>
									<option value={"second"}>Second</option>
									<option value={"third"}>Third</option>
								</select>
								{errors.grade?.message && (
									<p className="mt-2 text-sm text-red-400">
										{errors.grade.message}
									</p>
								)}
							</div>

							<div className="col-span-6 md:col-span-4">
								<label
									htmlFor="prevSchool"
									aria-label="Previous School or alma mater"
									className="block text-sm font-medium text-gray-900 dark:text-gray-200 md:text-base"
								>
									Previous School
								</label>
								<input
									type="text"
									id="prevSchool"
									aria-autocomplete="inline"
									autoComplete="on"
									{...register("previousSchool")}
									placeholder="Previous School"
									className="mt-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-400 shadow-sm hover:placeholder:italic dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
								/>
								{errors.previousSchool?.message && (
									<p className="mt-2 text-sm text-red-400">
										{errors.previousSchool.message}
									</p>
								)}
							</div>

							<div className="col-span-6">
								<label
									className="block text-sm font-medium text-gray-900 dark:text-gray-200 md:text-base"
									htmlFor="grade"
									aria-label="year or grade"
								>
									Select Courses you offer
								</label>
								<Controller
									name="courses"
									control={control}
									render={({ field }) => (
										<Listbox {...field} multiple as={"div"}>
											<Listbox.Button className="relative mt-2 w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
												<span className="block truncate">
													{field.value && field.value.length > 0
														? field.value.join(", ")
														: "All courses you offer."}
												</span>
												<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
													<ChevronUpDownIcon
														className="h-5 w-5 text-gray-400"
														aria-hidden="true"
													/>
												</span>
											</Listbox.Button>
											<Listbox.Options className="mt-1 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
												{coursesData?.map((course) => (
													<Listbox.Option
														className={
															"m-1 p-1 hover:mx-1 hover:rounded-md hover:bg-blue-500 hover:text-gray-200 focus:mx-1 focus:rounded-md focus:bg-sky-500 focus:text-white focus:ring-transparent active:rounded-md active:bg-amber-700 active:text-white/75 ui-open:bg-amber-800 ui-active:bg-sky-500 ui-active:text-white/90 ui-not-active:bg-white ui-not-active:text-black"
														}
														value={course.name}
														key={course.code}
													>
														{course.name}
													</Listbox.Option>
												))}
											</Listbox.Options>
										</Listbox>
									)}
								/>
								{errors.courses?.message && (
									<p className="mt-2 text-sm text-red-400">
										{errors.courses.message}
									</p>
								)}
							</div>
						</div>
					</div>
				)}

				{currentStep === 2 && (
					<div className="transition-transform duration-300">
						<h2 className="mb-4 text-center font-semibold text-gray-900 dark:text-gray-300 sm:text-lg lg:text-xl">
							Guardian Information
						</h2>
						<div className="grid grid-cols-6 gap-6 lg:mt-8">
							<div className="col-span-6 md:col-span-3 ">
								<label
									className="block text-sm font-medium text-gray-900 dark:text-gray-200 md:text-base"
									htmlFor="guardianName"
									aria-label="Guardian's name"
								>
									Full name of guardian
								</label>
								<input
									type="text"
									id="guardianName"
									aria-autocomplete="inline"
									autoComplete="name"
									{...register("guardianName")}
									placeholder="Guardian's full Name"
									className="dark:border-700  form-input mt-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-900 shadow-sm placeholder:text-gray-400 hover:placeholder:italic dark:bg-gray-800 dark:placeholder:text-gray-300"
								/>
								{errors.guardianName?.message && (
									<p className="mt-2 text-sm text-red-400">
										{errors.guardianName.message}
									</p>
								)}
							</div>

							<div className="col-span-6 md:col-span-3">
								<label
									className="block text-sm font-medium text-gray-900 dark:text-gray-200 md:text-base"
									htmlFor="grade"
									aria-label="year or grade"
								>
									Relationship with Guardian
								</label>
								<Controller
									name="relationshipWithGuardian"
									control={control}
									render={({ field }) => (
										<Listbox {...field} as={"div"}>
											<Listbox.Button className="relative mt-2 w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
												<span className="block truncate">
													{field.value ||
														"Relationship with Guardian."}
												</span>
												<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
													<ChevronUpDownIcon
														className="h-5 w-5 text-gray-400"
														aria-hidden="true"
													/>
												</span>
											</Listbox.Button>
											<Transition
												as={Fragment}
												enter="transition duration-100 ease-out"
												enterFrom="transform scale-95 opacity-0"
												enterTo="transform scale-100 opacity-100"
												leave="transition ease-in duration-200"
												leaveFrom="opacity-100 "
												leaveTo="opacity-0"
											>
												<Listbox.Options className="mt-1 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
													{guardians.map(
														(
															guardian,
															guardianIndex,
														) => (
															<Listbox.Option
																key={
																	guardianIndex
																}
																value={
																	guardian.name
																}
																className={
																	"m-1 p-1 hover:mx-1 hover:rounded-md hover:bg-blue-500 hover:text-gray-200 focus:mx-1 focus:rounded-md focus:bg-sky-500 focus:text-white focus:ring-transparent active:rounded-md active:bg-amber-700 active:text-white/75 ui-open:bg-amber-800 ui-active:bg-sky-500 ui-active:text-white/90 ui-not-active:bg-white ui-not-active:text-black"
																}
															>
																{guardian.name}
															</Listbox.Option>
														),
													)}
												</Listbox.Options>
											</Transition>
										</Listbox>
									)}
								/>
								{errors.relationshipWithGuardian?.message && (
									<p className="mt-2 text-sm text-red-400">
										{
											errors.relationshipWithGuardian
												.message
										}
									</p>
								)}
							</div>

							<div className="col-span-6 md:col-span-3">
								<label
									className="block text-sm font-medium text-gray-900 dark:text-gray-200 md:text-base"
									htmlFor="guardianEmail"
									aria-label="guardian's email address"
								>
									Guardian's email address
								</label>
								<input
									type="email"
									id="guardianEmail"
									autoComplete="email"
									{...register("guardianEmail")}
									placeholder="Guardian's email address"
									className="form-input  mt-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-900 shadow-sm placeholder:text-gray-400 hover:placeholder:italic dark:border-gray-700 dark:bg-gray-800 dark:placeholder:text-gray-300"
								/>
								{errors.guardianEmail?.message && (
									<p className="mt-2 text-sm text-red-400 lg:font-semibold">
										{errors.guardianEmail.message}
									</p>
								)}
							</div>

							<div className="col-span-6 md:col-span-3 ">
								<label
									className="block text-sm font-medium text-gray-900 dark:text-gray-200 md:text-base"
									htmlFor="guardianPhone"
									aria-label="Guardian's phone number"
								>
									Phone Number
								</label>

								<Controller
									control={control}
									name="guardianNumber"
									rules={{
										validate: (value) =>
											isPossiblePhoneNumber(`${value}`),
									}}
									render={({ field }) => (
										<PhoneInput
											{...field}
											id="guardianNumber"
											defaultCountry="GH"
											numberInputProps={{
												className:
													"dark:border-700 mt-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 shadow-sm hover:placeholder:italic dark:bg-gray-800 dark:text-gray-300",
											}}
										/>
									)}
								/>
								{errors.guardianNumber?.message && (
									<p className="mt-2 text-sm text-red-400">
										{errors.guardianNumber.message}
									</p>
								)}
							</div>
						</div>
					</div>
				)}

				{currentStep === 3 && (
					<div className="transition-transform duration-300">
						<h2 className="mb-4 text-center font-semibold text-gray-900 dark:text-gray-300 sm:text-lg lg:text-xl">
							Medical Information
						</h2>

						<div className="grid grid-cols-6 gap-6 lg:mt-8">
							<div className="col-span-6 ">
								<label
									className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
									htmlFor="allergies"
									aria-label="Medical Summary"
								>
									Medical Summary
								</label>
								<textarea
									{...register("allergies")}
									rows={6}
									cols={5}
									placeholder="Your medical summary here..."
									className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder:text-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
								/>

								{errors.allergies?.message && (
									<p className="mt-2 text-sm text-red-400">
										{errors.allergies.message}
									</p>
								)}
							</div>
						</div>
					</div>
				)}

				{currentStep === 4 && (
					<div className="transition-transform duration-300">
						<h2 className="mb-4 text-center font-semibold text-gray-900 dark:text-gray-300 sm:text-lg lg:text-xl">
							Image Upload
						</h2>

						<div className="grid grid-cols-6 gap-6 lg:mt-8">
							<div className="col-span-6 ">
								<label
									className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
									htmlFor="allergies"
									aria-label="Medical Summary"
								>
									Upload your profile Image
								</label>
								<input
									className="block w-full cursor-pointer rounded-lg py-1 border border-gray-300 bg-gray-50 max-sm:text-sm lg:text-lg text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
									aria-describedby="image_input_help"
									id="studentUpload"
									type="file"
									placeholder="Upload Profile image"
									{...register('studentPhoto')}
								/>
								<p
									className="mt-1 text-sm text-gray-500 dark:text-gray-300"
									id="file_input_help"
								>
									SVG, PNG, JPG or GIF (MAX. 800x400px).
								</p>

								{errors.studentPhoto?.message && (
									<p className="mt-2 text-sm text-red-400">
										{errors.studentPhoto.message}
									</p>
								)}
							</div>
						</div>
					</div>
				)}

				{currentStep === 5 && (
					<>
						<h2 className='text-base font-semibold leading-7 text-gray-900'>
							Complete
						</h2>
						<p className='mt-1 text-sm leading-6 text-gray-600'>
							Thank you for your submission.
						</p>
					</>
				)}
			</form>

			<div className="my-4 max-sm:mx-4">
				<div className="flex flex-grow justify-between lg:justify-end lg:space-x-5">
					<button
						type="button"
						onClick={previous}
						disabled={currentStep === 0}
						className="rounded-lg p-2 text-sm font-semibold text-sky-900 shadow-sm hover:bg-sky-50 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-50 dark:ring-zinc-800 dark:hover:bg-gray-700"
					>
						{
							<IconWrapper
								className={"h-8 w-8 sm:h-12 sm:w-12"}
								children={<ChevronLeftIcon />}
							/>
						}
					</button>
					<button
						type="button"
						disabled={currentStep === steps.length - 1}
						onClick={next}
						className="rounded-lg p-2 text-sm font-semibold text-sky-900 shadow-sm hover:bg-sky-50 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-50 dark:ring-zinc-800 dark:hover:bg-gray-700"
					>
						{
							<IconWrapper
								className={"h-8 w-8 sm:h-12 sm:w-12"}
								children={<ChevronRightIcon />}
							/>
						}
					</button>
				</div>
			</div>
		</section>
	);
};

export default Profile;
