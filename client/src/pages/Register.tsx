import HomeNavBar from "../components/HomeNavBar";
import RegisterFooter from "../components/RegisterFooter";
import RegisterMain from "../components/RegisterMain";

const Register = () => {
	return (
		<>
			<HomeNavBar
				buttonName={"Login"}
				schoolName={"BEDEKU TECHNICAL INSTITUTE"}
				linkTo={"/login"}
			/>
			<RegisterMain />
			<RegisterFooter />
		</>
	);
};

export default Register;
