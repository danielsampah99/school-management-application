import { Outlet } from "react-router-dom";
import StudentSidebar from "../components/StudentSidebar";

const StudentDashboard = () => {
	return (
		<>
			<div className="flex flex-row">
				<StudentSidebar />
				<Outlet />
			</div>
		</>
	);
};

export default StudentDashboard;
