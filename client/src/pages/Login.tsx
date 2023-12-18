import { Toaster } from "react-hot-toast";
import HomeNavBar from "../components/HomeNavBar";
import RegisterFooter from "../components/RegisterFooter";
import LoginMain from "../components/LoginMain";

const Login = () => {
	return (
		<>
			<Toaster position="top-right" />
			<HomeNavBar
				buttonName={"Register"}
				schoolName={"BEDEKU TECHNICAL INSTITUTE"}
				linkTo="/register"
			/>
			<LoginMain />
			<RegisterFooter />
		</>
	);
};

export default Login;
