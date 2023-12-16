import logo from "../assets/tve.png";

interface Props {
	buttonName: string;
	schoolName: string;
}

const HomeNavBar = ({ buttonName, schoolName }: Props) => {
	return (
		<>
			<nav className="flex h-full w-screen flex-row items-center justify-between border-b-2 bg-white pl-0 p-2 dark:bg-stone-900 dark:text-gray-200 transition-all duration">
				<div className="flex items-center justify-center md:gap-4">
					<img
						src={logo}
						alt="school's logo"
						aria-label="schoo's logo"
					/>
					<p className="select-none whitespace-nowrap text-justify text-lg font-semibold uppercase">
						{schoolName}
					</p>
				</div>
				<button
					type="button"
					className="text-md cursor-pointer touch-manipulation select-none items-center whitespace-nowrap rounded-xl bg-gradient-to-r from-white/75 to-white/30 px-2 py-2 text-center font-semibold text-black shadow-lg
					transition-colors hover:from-black/10 hover:to-black/50 hover:text-white lg:mr-4 lg:px-3"
				>
					{buttonName}
				</button>
			</nav>
		</>
	);
};

export default HomeNavBar;
