import { Outlet } from "react-router-dom";
import StudentSidebar from "../components/Student/StudentSidebar";

const StudentDashboard = () => {
	return (
		<>
			<div className="flex min-h-screen">
				<StudentSidebar />
				<Outlet />
			</div>
		</>
	);
};

export default StudentDashboard;
