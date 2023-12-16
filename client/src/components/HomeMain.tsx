import mainImage from "../assets/backgroundImageHomeMain.png";

interface Props {
	headingText: string;
	bodyText: string;
}

const HomeMain = ({ headingText, bodyText }: Props): JSX.Element => {
	return (
		<>
			<main
				className="flex h-[84vh] w-auto flex-col items-center justify-center bg-cover bg-center bg-no-repeat bg-origin-border p-3 transition-all delay-150 duration-500"
				style={{ backgroundImage: `url(${mainImage})` }}
			>
				<div className="flex flex-col items-center gap-8 md:items-start md:justify-center">
					<h1 className="text-start  text-5xl font-semibold text-white">
						{headingText}
					</h1>

					<p className="text-start text-lg font-medium leading-loose text-white">
						{bodyText}
					</p>
				</div>
			</main>
		</>
	);
};

export default HomeMain;
