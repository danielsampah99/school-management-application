interface Props {
	companyName: string;
	companyNumber: string;
	developerName: string;
}

const Footer = ({ companyName, companyNumber , developerName}: Props) => {
	return (
		<>
			<footer className="absolute bottom-0 w-screen">
				<div className="flex items-center gap-5 justify-end bg-gradient-to-l from-black text-white font-medium text-md py-[1px] pr-5">
					<p>{companyName}</p>
					<p>
						<a href={`tel:${companyNumber}`}>{companyNumber}</a>
					</p>
				</div>
				<p>
					© 2023 {developerName}
				</p>
			</footer>
		</>
	);
};

export default Footer;
