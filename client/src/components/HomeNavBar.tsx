import { Link } from "react-router-dom";
import logo from "../assets/tve.png";

interface Props {
	buttonName: string;
	schoolName: string;
	linkTo: string;
}

const HomeNavBar = ({ buttonName, schoolName, linkTo }: Props) => {
	return (
		<>
			<nav className="flex h-full w-screen flex-row items-center justify-between bg-white p-2 pl-0 shadow-md transition-all duration-300 dark:bg-stone-900 dark:text-gray-200 lg:pl-2">
				<div className="flex items-center justify-center md:gap-4">
					<img
						src={logo}
						alt="school's logo"
						aria-label="schoo's logo"
					/>
					<p className="select-none whitespace-nowrap text-justify text-lg font-semibold uppercase">
						<Link to={"/"}>{schoolName}</Link>
					</p>
				</div>
				<button
					type="button"
					className="text-md cursor-pointer touch-manipulation select-none items-center whitespace-nowrap rounded-xl  px-2 py-2 text-center font-semibold text-black shadow-lg transition-colors hover:text-slate-500
					hover:shadow-sm dark:bg-stone-800 dark:text-neutral-300 lg:mr-4 lg:px-3"
				>
					<Link to={linkTo}>{buttonName}</Link>
				</button>
			</nav>
		</>
	);
};

export default HomeNavBar;
