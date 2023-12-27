import { Toaster } from "react-hot-toast";
import AdminLoginMain from "../components/AdminLoginMain";
import HomeNavBar from "../components/HomeNavBar";
import RegisterFooter from "../components/RegisterFooter";

const AdminLogin = () => {
	return (
		<>
			<HomeNavBar
				buttonName={"Go to website"}
				schoolName={"BEDEKU TECHNICAL INSTITUTE"}
				linkTo={"/"}
			/>

			<AdminLoginMain />
			<RegisterFooter />
			<Toaster position={"top-center"} />
		</>
	);
};

export default AdminLogin;
