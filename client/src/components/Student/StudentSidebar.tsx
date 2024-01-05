import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import {
	Squares2X2Icon,
	WalletIcon,
	UserIcon,
	CalendarDaysIcon,
	ChatBubbleBottomCenterIcon,
	UserGroupIcon,
	RectangleGroupIcon,
	BookOpenIcon,
	PresentationChartBarIcon,
} from "@heroicons/react/24/solid";
import IconWrapper from "../IconWrapper";
import { ReactNode } from "react";
import StudentLogoutButton from "./StudentLogoutButton";

interface Props {
	makeSidebarVisible: string;
}

type SidebarItems = { name: string; icon: ReactNode; path: string };

const sidebarItems: SidebarItems[] = [
	{ name: "Dashboard", icon: <Squares2X2Icon />, path: "dashboard" },
	{ name: "Payment", icon: <WalletIcon />, path: "payment" },
	{ name: "Profile", icon: <UserIcon />, path: "profile" },
	{ name: "Courses", icon: <RectangleGroupIcon />, path: "courses" },
	{ name: "Class", icon: <UserGroupIcon />, path: "class" },
	{ name: "Results", icon: <PresentationChartBarIcon />, path: "results" },
	{ name: "Resources", icon: <BookOpenIcon />, path: "resources" },
	{ name: "Notice", icon: <ChatBubbleBottomCenterIcon />, path: "notice" },
	{ name: "Schedule", icon: <CalendarDaysIcon />, path: "schedule" },
];

const StudentSidebar = ({ makeSidebarVisible }: Props) => {
	const navigate: NavigateFunction = useNavigate();

	const handleLogout = () => {
		localStorage.clear();
		navigate("/login");
	};

	return (
		<aside
			className={`w-auto relative lg:h-[91vh] overflow-x-hidden flex flex-shrink-0 select-none flex-col rounded-md bg-stone-800 py-3 ${makeSidebarVisible}`}
		>
			<ul>
				{sidebarItems.map((sidebarItem, index) => (
					<li
						key={index}
						className="m-2 flex flex-row items-center justify-between rounded-md p-2 hover:bg-pink-600 focus:bg-pink-700 active:bg-pink-600"
					>
						<Link to={sidebarItem.path}>
							<IconWrapper className="mr-2 inline-block h-6 w-6 text-white">
								{sidebarItem.icon}
							</IconWrapper>
							<span className="text-xl text-white/70 inline-block">
								{sidebarItem.name}
							</span>
						</Link>
					</li>
				))}
			</ul>
			<StudentLogoutButton
				onClick={handleLogout}
				className={
					"mr-2 w-full cursor-pointer rounded-md p-2 aboslute bottom-3 hover:bg-pink-500"
				}
			/>
		</aside>
	);
};

export default StudentSidebar;
