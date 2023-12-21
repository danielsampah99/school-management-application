import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginFormValues, loginSchema } from "../schema/loginSchema";
import email from "../assets/email.svg";
import password from "../assets/password.svg";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { AxiosResponse } from "axios";

const LoginMain = () => {
	const [showPassword, setShowPassword] = useState("password");
	const navigate = useNavigate();

	function handlePasswordClick() {
		setShowPassword(showPassword === "password" ? "text" : "password");
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = handleSubmit(async (data: LoginFormValues) => {
		try {
			const response: AxiosResponse = await apiClient.post(
				"/api/login",
				data,
			);
			toast.success("Welcome");

			const token = response.headers["x-auth-token"];

			localStorage.setItem("x-auth-token", token);
			navigate("/users/:id");
		} catch (error) {
			console.error(error);
			toast.error("Invalid username or password");
		}
	});

	return (
		<>
			<main className="flex h-[90vh] w-auto flex-col items-center  justify-center bg-white/75 p-3 transition-all delay-150 duration-500 dark:bg-stone-800">
				<div className="z-50 rounded-2xl border-inherit p-7 shadow-lg dark:bg-zinc-800 dark:text-gray-400 dark:shadow-black/50">
					<h1 className="mb-5 py-2 text-center text-3xl font-bold text-black/90 dark:text-gray-300 ">
						LOG IN
					</h1>
					<form onSubmit={onSubmit}>
						<label htmlFor="email">
							Email address
							{errors.email && (
								<div className="ml-1 inline text-sm font-medium text-red-700 dark:text-red-500">
									{errors.email.message}
								</div>
							)}
						</label>
						<div className="relative mt-1">
							<div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
								<img
									src={email}
									alt="email icon"
									height={20}
									width={20}
								/>
							</div>
							<input
								{...register("email")}
								autoComplete="email"
								type="email"
								id="email"
								placeholder="Enter your email address"
								className="form-input mb-5  block w-full rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-2 ps-10 text-base text-gray-900 hover:placeholder:italic focus:border-neutral-400  focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-zinc-300 dark:placeholder-gray-400  dark:focus:border-zinc-600 dark:focus:ring-stone-500"
							/>
						</div>
						<label htmlFor="email">Password</label>
						<div className="relative mt-1">
							<div
								onClick={handlePasswordClick}
								className="pointer-events-auto absolute inset-y-0 start-0 flex items-center ps-3.5"
							>
								<img
									src={password}
									alt="email icon"
									height={20}
									width={20}
								/>
							</div>
							<input
								{...register("password")}
								autoComplete="off"
								type={showPassword}
								id="password"
								placeholder="Enter your password address"
								className="form-input mb-5  block w-full rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-2 ps-10 text-base text-gray-900 hover:placeholder:italic focus:border-neutral-400  focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-zinc-300 dark:placeholder-gray-400  dark:focus:border-zinc-600 dark:focus:ring-stone-500"
							/>
						</div>
						<button
							type="submit"
							className="mb-2 me-2 mt-3 w-full rounded-lg bg-gradient-to-r from-blue-500  via-blue-600 to-blue-700 px-5 py-2.5 text-center text-base font-semibold text-white transition-all duration-200 hover:bg-gradient-to-l focus:outline-none"
						>
							Sign In
						</button>
					</form>
					<p>
						Don't have an account? Click here to
						<Link
							to={"/register"}
							className="ml-2 font-medium text-blue-600 hover:underline dark:text-blue-500"
						>
							create one
						</Link>
					</p>
				</div>
			</main>
		</>
	);
};

export default LoginMain;
