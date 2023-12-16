import Footer from "../components/Footer";
import HomeMain from "../components/HomeMain";
import HomeNavBar from "../components/HomeNavBar";

const Home = () => {
	return (
		<>
			<HomeNavBar
				buttonName="Get Started"
				schoolName="BEDEKU TECHNICAL INSTITUTE"
			/>
			<HomeMain
				headingText="Education is always the key to success."
				bodyText="Making a positive impact on the future of our communities."
			/>
			<Footer
				companyName={"Bedeku Technical Institute"}
				companyNumber={"+233273602210"}
				developerName={"R&Sdevs"}
			/>
		</>
	);
};

export default Home;
