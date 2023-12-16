interface Props {
	companyName: string;
	companyNumber: string;
	developerName: string;
}

const Footer = ({ companyName, companyNumber, developerName }: Props) => {
	return (
		<>
			<footer className="absolute bottom-0 w-screen">
				<div className="lg:text-md flex items-center justify-end gap-5 bg-gradient-to-l from-black py-[1px] pr-5 font-medium text-white dark:text-zinc-300">
					<p>{companyName}</p>
					<p>
						<a href={`tel:${companyNumber}`}>{companyNumber}</a>
					</p>
				</div>
				<p className="py-1.5 dark:bg-stone-900 dark:text-zinc-400 lg:py-0 lg:font-semibold">
					© 2023 {developerName}
				</p>
			</footer>
		</>
	);
};

export default Footer;
