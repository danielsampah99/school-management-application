import { Outlet } from "react-router-dom";
import StudentSidebar from "../components/Student/StudentSidebar";
import Header from "../components/Student/Header";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

const StudentDashboard = () => {
	const [isSideOpen, setIsSideOpen] = useState<boolean>(false);

	const handleHeaderIconClick = () => {
		setIsSideOpen(!isSideOpen);
	};

	return (
		<>
			<div className="flex flex-col">
				<Header
					buttonIcon={isSideOpen ? <Bars3Icon /> : <XMarkIcon />}
					onClick={handleHeaderIconClick}
				/>
				<div className="flex flex-row ">
					<StudentSidebar
						makeSidebarVisible={`${
							isSideOpen ? "hidden" : "block"
						}`}
					/>
					<Outlet />
				</div>
			</div>
		</>
	);
};

export default StudentDashboard;
