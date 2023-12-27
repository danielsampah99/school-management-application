import { useState } from "react";
import email from "../assets/email.svg";
import password from "../assets/password.svg";

const AdminLoginMain = () => {

	const [showPassword, setShowPassword] = useState('password')


	function handleClick() {
		setShowPassword(showPassword === 'password' ? 'text' : 'password')
	}

	return (
		<>
			<main className="flex h-[87vh] w-auto flex-1 flex-col items-center justify-center transition-all delay-150 duration-300 dark:bg-slate-800">
				<div className="z-50 rounded-2xl border-inherit p-7 shadow-lg dark:bg-zinc-800 dark:text-gray-400 dark:shadow-black/50">
					<h1 className="mb-5 py-2 text-center text-3xl font-bold text-black/90 dark:text-gray-300 ">
						Welcome, Admin.
					</h1>

					<form >
						<label htmlFor="email" aria-label="email">
							Email
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
								type="email"
								name="email"
								id="email"
								autoComplete="email"
								placeholder="Enter admin's email address"
								className="form-input mb-5 block w-full rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-2 ps-10 text-base text-gray-900 hover:placeholder:italic focus:border-neutral-400  focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-zinc-300 dark:placeholder-gray-400  dark:focus:border-zinc-600 dark:focus:ring-stone-500"
							/>
						</div>
						<label htmlFor="password" aria-label="password">
							Password
						</label>
						<div className="relative mt-1">
							<div className="cursor-pointer absolute inset-y-0 start-0 flex items-center ps-3.5" onClick={handleClick}>
								<img
									src={password}
									alt="password"
									height={20}
									width={20}
								/>
							</div>
							<input
								type={showPassword}
								name="password"
								id="password"
								placeholder="Enter Admin's password"
								className="form-input mb-5  block w-full rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-2 ps-10 text-base text-gray-900 hover:placeholder:italic focus:border-neutral-400  focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-zinc-300 dark:placeholder-gray-400  dark:focus:border-zinc-600 dark:focus:ring-stone-500"
							/>
						</div>
						<button
							type="submit"
							className="mb-2 me-2 mt-3 w-full rounded-lg bg-gradient-to-r from-slate-500 via-slate-600 to-slate-700  px-5 py-2.5 text-center text-base font-semibold text-white hover:bg-gradient-to-l focus:outline-none"
						>
							Log In
						</button>
					</form>
				</div>
			</main>
		</>
	);
};

export default AdminLoginMain;
