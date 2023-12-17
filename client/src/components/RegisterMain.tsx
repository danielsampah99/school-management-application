import person from "../assets/person.svg";
import email from "../assets/email.svg";
import password from "../assets/password.svg";
import { Link } from "react-router-dom";

const RegisterMain = () => {
	return (
		<>
			<main className="flex h-[90vh] w-auto flex-col items-center  justify-center bg-white/75 p-3 transition-all delay-150 duration-500 dark:bg-stone-800">
				<div className="z-50 rounded-2xl border-inherit p-7 shadow-lg dark:bg-zinc-800 dark:text-gray-400 dark:shadow-black/50">
					<h1 className="mb-5 py-2 text-center text-3xl font-bold text-black/90 dark:text-gray-300 ">
						Create an account
					</h1>

					<label htmlFor="name">Name</label>
					<div className="relative">
						<div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
							<img
								className=" "
								src={person}
								alt="person icon"
								height={20}
								width={20}
							/>
						</div>
						<input
							type="text"
							name="name"
							id="name"
							placeholder="Enter your full name"
							className="form-input mb-5 block w-full rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-2 ps-10 text-base text-gray-900 hover:placeholder:italic focus:border-neutral-400  focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-zinc-300 dark:placeholder-gray-400  dark:focus:border-zinc-600 dark:focus:ring-stone-500"
						/>
					</div>

					<label htmlFor="email">Email address</label>
					<div className="relative">
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
							placeholder="Enter your email address"
							className="form-input mb-5  block w-full rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-2 ps-10 text-base text-gray-900 hover:placeholder:italic focus:border-neutral-400  focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-zinc-300 dark:placeholder-gray-400  dark:focus:border-zinc-600 dark:focus:ring-stone-500"
						/>
					</div>

					<label htmlFor="password">Password</label>

					<div className="relative">
						<div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
							<img
								src={password}
								alt="password icon"
								height={20}
								width={20}
							/>
						</div>
						<input
							type="password"
							name="password"
							id="password"
							placeholder="Enter your full password"
							className="form-input mb-5 block w-full rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-2 ps-10 text-base text-gray-900 hover:placeholder:italic focus:border-neutral-400  focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-zinc-300 dark:placeholder-gray-400  dark:focus:border-zinc-600 dark:focus:ring-stone-500"
						/>
					</div>
					<button
						type="submit"
						className="mb-2 me-2 mt-3 w-full rounded-lg bg-gradient-to-r from-blue-500  via-blue-600 to-blue-700 px-5 py-2.5 text-center text-base font-semibold text-white hover:bg-gradient-to-br focus:outline-none"
					>
						Sign Up
					</button>
					<p>
						Already have an account? Click here to{" "}
						<Link
							to={"/login"}
							className="font-medium text-blue-600 hover:underline dark:text-blue-500"
						>
							log in
						</Link>
					</p>
				</div>
			</main>
		</>
	);
};

export default RegisterMain;